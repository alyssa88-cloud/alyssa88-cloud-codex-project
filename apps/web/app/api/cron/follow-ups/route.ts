import { NextResponse } from "next/server";
import { prisma } from "@app/database";
import { sendMicrosoftGraphMail } from "@/lib/email/microsoft-graph";
import { decryptToken } from "@/lib/email/token-crypto";

function authorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  return Boolean(secret && request.headers.get("authorization") === `Bearer ${secret}`);
}

export async function POST(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const now = new Date();
  const messages = await prisma.outreachMessage.findMany({
    where: { status: "SCHEDULED", scheduledAt: { lte: now }, channel: "email" },
    include: { lead: { include: { contact: true } } },
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

    const integration = await prisma.emailIntegration.findUnique({ where: { workspaceId_provider: { workspaceId: message.lead.workspaceId, provider: "microsoft" } } });
    if (!integration) { skipped++; continue; }

    try {
      await sendMicrosoftGraphMail({ accessToken: decryptToken(integration.accessTokenEncrypted), to: email, subject: message.subject || "Quick question", htmlBody: message.body });
      await prisma.outreachMessage.update({ where: { id: message.id }, data: { status: "SENT", sentAt: now } });
      await prisma.activity.create({ data: { workspaceId: message.lead.workspaceId, leadId: message.leadId, type: "OUTREACH_SENT", metadata: { messageId: message.id, recipient: email, automated: true } } });
      sent++;
    } catch (error) {
      skipped++;
      await prisma.outreachMessage.update({ where: { id: message.id }, data: { status: "FAILED", stopReason: error instanceof Error ? error.message.slice(0, 500) : "send_failed" } });
    }
  }

  return NextResponse.json({ ok: true, processed: messages.length, sent, skipped, checkedAt: now.toISOString() });
}
