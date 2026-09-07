"use client";

import { useSearchParams } from "next/navigation";

export default function EmailSettingsPage() {
  const params = useSearchParams();
  const connected = params.get("connected") === "1";
  return (
    <main className="page-shell">
      <section className="card">
        <h1>邮箱自动化</h1>
        <p>连接 Microsoft Outlook 后，系统才能自动发送开发信和执行后续跟进。</p>
        {connected && <p className="success">Outlook 已连接成功。</p>}
        <a className="button" href="/api/microsoft-oauth-start">连接 Microsoft Outlook</a>
        <p className="muted">当前目标邮箱：alyssa88988@outlook.com</p>
      </section>
    </main>
  );
}
