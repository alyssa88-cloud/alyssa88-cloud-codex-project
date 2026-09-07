import { NextResponse } from "next/server";
import { prisma } from "@app/database";

export async function GET() {
  const checkedAt = new Date().toISOString();

  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({
      ok: true,
      service: "web",
      database: "ok",
      timestamp: checkedAt,
    });
  } catch (error) {
    console.error("health database check failed", error);
    return NextResponse.json(
      { ok: false, service: "web", database: "error", timestamp: checkedAt },
      { status: 503 },
    );
  }
}
