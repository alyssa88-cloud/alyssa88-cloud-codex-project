import { NextResponse } from "next/server";
import { prisma } from "@app/database";
import { sendMicrosoftGraphMail } from "@/lib/email/microsoft-graph";
import { decryptToken } from "@/lib/email/token-crypto";
import { ensureBusinessContact } from "@/lib/outreach/contact";
import { followUpSubject, nextFollowUpDate } from "@/lib/outreach/schedule";

function authorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return request.headers.get("authorization") === `Bearer ${secret}` || request.headers.get("x-cron-secret") === secret;
}

async function run(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const now = new Date();
  const messages = await prisma.outreachMessage.findMany({
    where: { status: "SCHEDULED", scheduledAt: { lte: now }, channel: "email" },
    include: { lead: { include: { contact: true } } },
    orderBy: { scheduledAt: "asc" },
    take: 50,
  });
  let sent = 0;
  let skipped = 0;

  for (const message of messages) {
    const email = message.lead.contact?.email?.trim();
    if (!email || message.lead.status === "REPLIED" || message.lead.status === "DISQUALIFIED" || message.stopReason) {
      skipped++;
      await prisma.outreachMessage.update({ where: { id: message.id }, data: { status: "STOPPED", stopReason: !email ? "missing_email" : "lead_not_contactable" } });
      continue;
    }

    const claimed = await prisma.outreachMessage.updateMany({ where: { id: message.id, status: "SCHEDULED" }, data: { status: "SENDING" } });
    if (claimed.count !== 1) { skipped++; continue; }

    const integration = await prisma.emailIntegration.findUnique({ where: { workspaceId_provider: { workspaceId: message.lead.workspaceId, provider: "microsoft" } } });
    if (!integration) {
      skipped++;
      await prisma.outreachMessage.update({ where: { id: message.id }, data: { status: "SCHEDULED" } });
      continue;
    }

    try {
      const body = ensureBusinessContact(message.body);
      await sendMicrosoftGraphMail({ accessToken: decryptToken(integration.accessTokenEncrypted), to: email, subject: message.subject || "Quick question", htmlBody: body });
      const step = message.sequenceStep ?? 0;
      const nextDate = nextFollowUpDate(now, step);
      await prisma.outreachMessage.update({ where: { id: message.id }, data: { status: "SENT", sentAt: now, body } });
      await prisma.lead.update({ where: { id: message.leadId }, data: { status: step === 0 ? "CONTACTED" : undefined } });
      await prisma.activity.create({ data: { workspaceId: message.lead.workspaceId, leadId: message.leadId, type: "OUTREACH_SENT", metadata: { messageId: message.id, recipient: email, automated: true, sequenceStep: step } } });

      if (nextDate) {
        await prisma.outreachMessage.create({ data: {
          leadId: message.leadId,
          sequenceId: message.sequenceId,
          sequenceStep: step + 1,
          channel: "email",
          subject: followUpSubject(message.subject, step + 1),
          body,
          status: "SCHEDULED",
          scheduledAt: nextDate,
        } });
      }
      sent++;
    } catch (error) {
      skipped++;
      await prisma.outreachMessage.update({ where: { id: message.id }, data: { status: "FAILED", stopReason: error instanceof Error ? error.message.slice(0, 500) : "send_failed" } });
    }
  }
  return NextResponse.json({ ok: true, processed: messages.length, sent, skipped, checkedAt: now.toISOString() });
}

export async function GET(request: Request) { return run(request); }
export async function POST(request: Request) { return run(request); }
