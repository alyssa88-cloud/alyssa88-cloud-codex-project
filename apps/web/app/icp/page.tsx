const products = ["内衣", "内衣套装", "塑身衣", "睡裙"];
const customerTypes = ["服装品牌", "批发商", "电商卖家"];

export default function ICPPage() {
  return (
    <div className="shell">
      <aside className="sidebar"><div className="brand">AI 客户开发助手</div><nav className="nav"><a href="/">仪表盘</a><a className="active" href="/icp">客户画像</a><a href="/leads">潜在客户</a><a href="/follow-ups">跟进任务</a></nav></aside>
      <main className="main">
        <header className="header"><div><p className="eyebrow">ICP / Ideal Customer Profile</p><h1>客户画像</h1></div><a className="button" href="/leads">下一步：找客户</a></header>
        <section className="card">
          <div className="form-grid">
            <div className="field"><label htmlFor="market">目标市场</label><input id="market" defaultValue="United States" /></div>
            <div className="field"><label htmlFor="moq">最低目标订单量</label><input id="moq" type="number" defaultValue="100" min="1" /></div>
            <div className="field"><label htmlFor="products">产品范围</label><input id="products" defaultValue={products.join(", ")} /></div>
            <div className="field"><label htmlFor="customers">客户类型</label><input id="customers" defaultValue={customerTypes.join(", ")} /></div>
          </div>
          <div className="section"><h2 className="section-title">评分逻辑</h2><p className="muted">产品匹配 30% · 客户类型 20% · 活跃销售证据 15% · 小批量采购适配 15% · 美国市场 10% · 证据质量与新鲜度 10%</p></div>
          <div className="section"><button className="button" type="button">保存客户画像</button></div>
        </section>
      </main>
    </div>
  );
}
