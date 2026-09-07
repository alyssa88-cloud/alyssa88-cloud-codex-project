const tasks = [
  { company: "暂无任务", contact: "等待首轮客户搜索", due: "—", action: "完成客户发现后自动创建" },
];

export default function FollowUpsPage() {
  return (
    <div className="shell">
      <aside className="sidebar"><div className="brand">AI 客户开发助手</div><nav className="nav"><a href="/">仪表盘</a><a href="/icp">客户画像</a><a href="/leads">潜在客户</a><a className="active" href="/follow-ups">跟进任务</a></nav></aside>
      <main className="main">
        <header className="header"><div><p className="eyebrow">Follow-up Queue</p><h1>跟进任务</h1></div></header>
        <section className="card">
          <p className="muted">跟进提醒将发送到已连接的 Outlook 邮箱。默认首次跟进为 5 个工作日后，第二次为再过 7 个工作日。</p>
          {tasks.map((task) => <div className="lead" key={task.company}><div><strong>{task.company}</strong><div className="muted">{task.contact} · {task.action}</div></div><div><strong>{task.due}</strong></div></div>)}
        </section>
      </main>
    </div>
  );
}
