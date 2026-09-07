import { NextResponse } from "next/server";

const scopes = ["openid", "profile", "email", "offline_access", "Mail.Send", "Mail.Read"].join(" ");

export async function GET() {
  const clientId = process.env.MICROSOFT_CLIENT_ID;
  const tenant = process.env.MICROSOFT_TENANT_ID || "common";
  const redirectUri = process.env.MICROSOFT_REDIRECT_URI;
  if (!clientId || !redirectUri) return NextResponse.json({ error: "Microsoft OAuth is not configured" }, { status: 500 });
  const state = crypto.randomUUID();
  const url = new URL(`https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize`);
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_mode", "query");
  url.searchParams.set("scope", scopes);
  url.searchParams.set("state", state);
  const response = NextResponse.redirect(url);
  response.cookies.set("microsoft_oauth_state", state, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 600, path: "/" });
  return response;
}
