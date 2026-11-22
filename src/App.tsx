const modules = [
  { icon: "◈", name: "Unified Inbox", detail: "All customer conversations", status: "Planned" },
  { icon: "⌘", name: "AI Brain", detail: "Model routing and reasoning", status: "Foundation" },
  { icon: "⌁", name: "Customer Memory", detail: "Consent-aware context", status: "Foundation" },
  { icon: "◇", name: "Knowledge Hub", detail: "Verified business knowledge", status: "Planned" },
  { icon: "⚡", name: "Automation", detail: "Policy-controlled workflows", status: "Planned" },
  { icon: "⛓", name: "MCP Integrations", detail: "Tools and connected channels", status: "Planned" },
];

function App() {
  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand-mark">N</div>
        <div className="brand-copy"><strong>NEURON</strong><span>AI COMMAND CENTER</span></div>
        <div className="nav-label">WORKSPACE</div>
        <a className="nav-item active" href="#overview">▦ <span>Overview</span></a>
        <a className="nav-item" href="#modules">◈ <span>Brain modules</span></a>
        <a className="nav-item" href="#infrastructure">⌘ <span>Infrastructure</span></a>
        <div className="sidebar-bottom"><span className="pulse" /> Foundation initialized</div>
      </aside>

      <section className="content" id="overview">
        <header className="topbar">
          <div><span className="eyebrow">AI OPERATIONS PLATFORM</span><h1>Command Center</h1></div>
          <div className="top-status"><span className="pulse" /> SYSTEM FOUNDATION</div>
        </header>

        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">AUTONOMOUS INTELLIGENCE · HUMAN CONTROL</span>
            <h2>One brain.<br /><em>Every conversation.</em></h2>
            <p>A unified intelligence layer for customer support, business knowledge and controlled automation.</p>
            <a className="primary-link" href="#modules">Explore modules <span>↗</span></a>
          </div>
          <div className="orb-wrap" aria-hidden="true"><div className="orb"><div className="orb-core" /></div><span className="orb-caption">NEURAL CORE / 01</span></div>
        </section>

        <section className="metrics" id="infrastructure">
          <article><span>DATABASE</span><strong>Connected</strong><small>Supabase · PostgreSQL 17</small></article>
          <article><span>DATA SECURITY</span><strong>RLS enabled</strong><small>15 protected tables</small></article>
          <article><span>VECTOR ENGINE</span><strong>Installed</strong><small>Embedding model selection pending</small></article>
          <article><span>AI PROVIDERS</span><strong>Not configured</strong><small>Awaiting secure credentials</small></article>
        </section>

        <section className="module-section" id="modules">
          <div className="section-heading"><div><span className="eyebrow">SYSTEM COMPONENTS</span><h3>Brain modules</h3></div><span className="count">06 MODULES</span></div>
          <div className="module-grid">
            {modules.map((module) => <article className="module-card" key={module.name}>
              <div className="module-top"><span className="module-icon">{module.icon}</span><span className={module.status === "Foundation" ? "tag ready" : "tag"}>{module.status}</span></div>
              <h4>{module.name}</h4><p>{module.detail}</p>
            </article>)}
          </div>
        </section>
        <footer><span>AI NEURON BRAIN <b>v0.1.0</b></span><span>CONTROLLED AUTONOMY BY DESIGN</span></footer>
      </section>
    </main>
  );
}

export default App;
