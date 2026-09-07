const demoLeads = [
  { name: "待接入搜索结果", type: "美国服装品牌 / 电商卖家", score: "—", reason: "下一步接入公开网页搜索与 AI 分析" },
];

export default function LeadsPage() {
  return (
    <div className="shell">
      <aside className="sidebar"><div className="brand">AI 客户开发助手</div><nav className="nav"><a href="/">仪表盘</a><a href="/icp">客户画像</a><a className="active" href="/leads">潜在客户</a><a href="/follow-ups">跟进任务</a></nav></aside>
      <main className="main">
        <header className="header"><div><p className="eyebrow">Lead Discovery</p><h1>潜在客户</h1></div><button className="button" type="button">开始搜索</button></header>
        <section className="card">
          <h2 className="section-title">搜索条件</h2>
          <div className="form-grid">
            <div className="field"><label>市场</label><input defaultValue="United States" /></div>
            <div className="field"><label>目标订单量</label><input defaultValue="100+ units" /></div>
            <div className="field"><label>产品关键词</label><input defaultValue="lingerie, underwear, shapewear, sleep dress" /></div>
            <div className="field"><label>客户关键词</label><input defaultValue="fashion brand, wholesale, ecommerce" /></div>
          </div>
        </section>
        <section className="section card">
          <h2 className="section-title">客户列表</h2>
          {demoLeads.map((lead) => <div className="lead" key={lead.name}><div><strong>{lead.name}</strong><div className="muted">{lead.type} · {lead.reason}</div></div><div className="score">{lead.score}</div></div>)}
        </section>
      </main>
    </div>
  );
}
