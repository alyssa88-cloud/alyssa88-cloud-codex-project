const products = ["内衣", "内衣套装", "塑身衣", "睡裙"];
const customerTypes = ["服装品牌", "批发商", "电商卖家"];

export default function Dashboard() {
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">AI 客户开发助手</div>
        <nav className="nav">
          <a className="active" href="/">仪表盘</a>
          <a href="/icp">客户画像</a>
          <a href="/leads">潜在客户</a>
          <a href="/follow-ups">跟进任务</a>
        </nav>
      </aside>
      <main className="main">
        <header className="header">
          <div>
            <p className="eyebrow">美国市场 · B2B 获客 MVP</p>
            <h1>今天先找到真正值得联系的客户</h1>
          </div>
          <a className="button" href="/leads">开始找客户</a>
        </header>

        <section className="grid">
          <div className="card"><div className="muted">已发现客户</div><div className="metric">0</div><div className="muted">等待第一次搜索</div></div>
          <div className="card"><div className="muted">高潜客户</div><div className="metric">0</div><div className="muted">评分 ≥ 70</div></div>
          <div className="card"><div className="muted">待审核邮件</div><div className="metric">0</div><div className="muted">发送前人工确认</div></div>
          <div className="card"><div className="muted">待跟进</div><div className="metric">0</div><div className="muted">后续动作</div></div>
        </section>

        <section className="section card">
          <h2 className="section-title">当前客户画像</h2>
          <p><strong>目标市场：</strong>美国（US）</p>
          <p><strong>客户类型：</strong>{customerTypes.map((x) => <span className="pill" key={x}>{x}</span>)}</p>
          <p><strong>产品：</strong>{products.map((x) => <span className="pill" key={x}>{x}</span>)}</p>
          <p><strong>最低目标订单：</strong>100 件</p>
          <div className="actions">
            <a className="button secondary" href="/icp">调整客户画像</a>
            <a className="button" href="/leads">发现美国客户</a>
          </div>
        </section>

        <section className="section card">
          <h2 className="section-title">MVP 工作流</h2>
          <p className="muted">客户画像 → 搜索潜客 → 证据分析 → AI 评分 → 生成个性化开发信 → 人工审核 → 跟进</p>
        </section>
      </main>
    </div>
  );
}
