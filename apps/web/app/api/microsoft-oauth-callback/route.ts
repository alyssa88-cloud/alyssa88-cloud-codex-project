import { NextResponse } from "next/server";
import { prisma } from "@app/database";
import { encryptToken } from "@/lib/email/token-crypto";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");
  if (error) return NextResponse.json({ error }, { status: 400 });
  if (!code || !state) return NextResponse.json({ error: "Missing OAuth code or state" }, { status: 400 });

  const expectedState = request.headers.get("cookie")?.match(/(?:^|;\s*)microsoft_oauth_state=([^;]+)/)?.[1];
  if (!expectedState || expectedState !== state) return NextResponse.json({ error: "Invalid OAuth state" }, { status: 400 });

  const clientId = process.env.MICROSOFT_CLIENT_ID;
  const clientSecret = process.env.MICROSOFT_CLIENT_SECRET;
  const tenant = process.env.MICROSOFT_TENANT_ID || "common";
  const redirectUri = process.env.MICROSOFT_REDIRECT_URI;
  const workspaceId = process.env.DEFAULT_WORKSPACE_ID;
  if (!clientId || !clientSecret || !redirectUri || !workspaceId) return NextResponse.json({ error: "Microsoft OAuth storage is not configured" }, { status: 500 });

  const tokenResponse = await fetch(`https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: clientId, client_secret: clientSecret, code, redirect_uri: redirectUri, grant_type: "authorization_code" }),
  });
  if (!tokenResponse.ok) return NextResponse.json({ error: "Microsoft token exchange failed", detail: await tokenResponse.text() }, { status: 400 });

  const tokens = await tokenResponse.json() as { access_token: string; refresh_token?: string; expires_in?: number };
  const meResponse = await fetch("https://graph.microsoft.com/v1.0/me?$select=mail,userPrincipalName", { headers: { Authorization: `Bearer ${tokens.access_token}` } });
  if (!meResponse.ok) return NextResponse.json({ error: "Could not read Microsoft account" }, { status: 400 });
  const me = await meResponse.json() as { mail?: string; userPrincipalName?: string };
  const email = me.mail || me.userPrincipalName;
  if (!email) return NextResponse.json({ error: "Microsoft account has no usable email" }, { status: 400 });

  await prisma.emailIntegration.upsert({
    where: { workspaceId_provider: { workspaceId, provider: "microsoft" } },
    create: { workspaceId, provider: "microsoft", email, accessTokenEncrypted: encryptToken(tokens.access_token), refreshTokenEncrypted: tokens.refresh_token ? encryptToken(tokens.refresh_token) : null, expiresAt: tokens.expires_in ? new Date(Date.now() + tokens.expires_in * 1000) : null },
    update: { email, accessTokenEncrypted: encryptToken(tokens.access_token), refreshTokenEncrypted: tokens.refresh_token ? encryptToken(tokens.refresh_token) : undefined, expiresAt: tokens.expires_in ? new Date(Date.now() + tokens.expires_in * 1000) : null },
  });

  const response = NextResponse.redirect(new URL("/settings/email?connected=1", request.url));
  response.cookies.delete("microsoft_oauth_state");
  return response;
}
