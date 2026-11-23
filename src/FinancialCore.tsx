import { useMemo, useState } from "react";
import "./financial-core.css";

type Entry = { id: string; time: string; reference: string; description: string; debit: number; credit: number; status: "Posted" | "Pending"; };
const initialEntries: Entry[] = [
  { id: "TXN-1004", time: "Today, 09:42", reference: "TRF-1004", description: "Sandbox transfer · Wallet A → Wallet B", debit: 2500, credit: 2500, status: "Posted" },
  { id: "TXN-1003", time: "Today, 09:18", reference: "DEP-1003", description: "Test deposit · Wallet A", debit: 0, credit: 5000, status: "Posted" },
  { id: "TXN-1002", time: "Yesterday", reference: "TRF-1002", description: "Sandbox transfer · Wallet B → Wallet A", debit: 750, credit: 750, status: "Posted" },
];
const money = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "BDT", maximumFractionDigits: 2 }).format(n);

export default function FinancialCore() {
  const [entries, setEntries] = useState(initialEntries);
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("Wallet A");
  const [to, setTo] = useState("Wallet B");
  const [notice, setNotice] = useState("Sandbox ledger preview · no real funds move");
  const [tab, setTab] = useState("Overview");
  const [query, setQuery] = useState("");
  const totalDebits = entries.reduce((s, e) => s + e.debit, 0);
  const totalCredits = entries.reduce((s, e) => s + e.credit, 0);
  const filtered = useMemo(() => entries.filter(e => (e.id + e.reference + e.description).toLowerCase().includes(query.toLowerCase())), [entries, query]);

  function transfer() {
    const value = Math.round(Number(amount) * 100) / 100;
    if (!Number.isFinite(value) || value <= 0) { setNotice("Enter an amount greater than zero."); return; }
    if (from === to) { setNotice("Choose two different wallets."); return; }
    const id = "TXN-" + (1005 + entries.length - initialEntries.length);
    const now = new Date().toLocaleString();
    setEntries(prev => [{ id, time: now, reference: "TRF-" + id.slice(4), description: "Sandbox transfer · " + from + " → " + to, debit: value, credit: value, status: "Posted" }, ...prev]);
    setNotice("Sandbox transfer recorded. Debit and credit entries balance: " + money(value) + ".");
  }

  return <main className="finance-shell">
    <aside className="finance-sidebar">
      <a className="finance-brand" href="#"><span>AK</span><div><b>AKB FINANCIAL</b><small>CENTRAL CORE</small></div></a>
      <div className="finance-nav-label">FINANCE WORKSPACE</div>
      {["Overview", "Transactions", "Double-entry ledger", "Wallets & accounts", "Payment rails", "Reconciliation", "Settings"].map((item, i) =>
        <button key={item} className={"finance-nav " + (tab === item ? "selected" : "")} onClick={() => setTab(item)}><span>{["▦","⇄","⊞","◉","⌁","≋","⚙"][i]}</span>{item}</button>)}
      <div className="finance-side-foot"><i/> SANDBOX ENVIRONMENT<br/><small>Provider rails disabled</small></div>
    </aside>
    <section className="finance-main">
      <header className="finance-top"><div><div className="finance-kicker">AKB CENTRAL FINANCIAL CORE / CONTROL PLANE</div><h1>{tab}</h1></div><div className="finance-top-right"><span className="sandbox-pill">● SANDBOX</span><span className="avatar">AK</span></div></header>
      <section className="finance-banner"><div><div className="finance-kicker">UNIFIED TRANSACTION ORCHESTRATOR</div><h2>Money movement.<br/><em>One accountable ledger.</em></h2><p>Preview multi-wallet transfers, balanced journal entries and payment operations in an isolated test environment.</p></div><div className="banner-art"><div className="banner-ring"><span>AKB</span></div><small>LEDGER ENGINE / 001</small></div></section>
      <div className="finance-stats">
        <article><span>LEDGER DEBITS</span><b>{money(totalDebits)}</b><small>Recorded debit entries</small></article>
        <article><span>LEDGER CREDITS</span><b>{money(totalCredits)}</b><small>Recorded credit entries</small></article>
        <article><span>JOURNAL BALANCE</span><b className={totalDebits===totalCredits?"positive":"negative"}>{totalDebits===totalCredits?"BALANCED":"OUT OF BALANCE"}</b><small>Debit total must equal credit total</small></article>
        <article><span>TRANSACTIONS</span><b>{entries.length.toString().padStart(2,"0")}</b><small>Sandbox records</small></article>
      </div>
      <div className="finance-grid">
        <section className="finance-panel transfer-panel"><div className="panel-heading"><div><div className="finance-kicker">INTERNAL TRANSFER</div><h3>Create a sandbox transfer</h3></div><span className="mini-status">TEST MODE</span></div>
          <label>FROM ACCOUNT<select value={from} onChange={e=>setFrom(e.target.value)}><option>Wallet A</option><option>Wallet B</option></select></label>
          <div className="transfer-arrow">↓</div>
          <label>TO ACCOUNT<select value={to} onChange={e=>setTo(e.target.value)}><option>Wallet B</option><option>Wallet A</option></select></label>
          <label>AMOUNT (BDT)<input value={amount} onChange={e=>setAmount(e.target.value)} type="number" min="0.01" step="0.01" /></label>
          <button className="transfer-submit" onClick={transfer}>Post sandbox transfer <span>→</span></button>
          <p className="finance-notice">{notice}</p>
          <div className="ledger-rule"><b>DOUBLE-ENTRY RULE</b><span>Debit {money(Number(amount)||0)} = Credit {money(Number(amount)||0)}</span></div>
        </section>
        <section className="finance-panel"><div className="panel-heading"><div><div className="finance-kicker">ACCOUNT DIRECTORY</div><h3>Sandbox wallets</h3></div><span className="mini-status">2 ACTIVE</span></div>
          <div className="wallet-card"><div className="wallet-icon">A</div><div><b>Wallet A</b><small>BDT · Internal test account</small></div><strong>Demo</strong></div>
          <div className="wallet-card"><div className="wallet-icon alt">B</div><div><b>Wallet B</b><small>BDT · Internal test account</small></div><strong>Demo</strong></div>
          <div className="wallet-note">Demo wallets are illustrative. Authoritative balances will be read from the protected database ledger after sandbox provisioning.</div>
          <div className="rail-row"><span>Bank API</span><i>Not connected</i></div><div className="rail-row"><span>bKash / Nagad</span><i>Not connected</i></div><div className="rail-row"><span>International rails</span><i>Not connected</i></div>
        </section>
      </div>
      <section className="finance-panel ledger-panel"><div className="panel-heading"><div><div className="finance-kicker">IMMUTABLE JOURNAL VIEW</div><h3>Recent transactions</h3></div><input className="ledger-search" placeholder="Search transaction…" value={query} onChange={e=>setQuery(e.target.value)}/></div>
        <div className="ledger-table-wrap"><table className="ledger-table"><thead><tr><th>TRANSACTION</th><th>DESCRIPTION</th><th>DEBIT</th><th>CREDIT</th><th>STATUS</th></tr></thead><tbody>{filtered.map(e=><tr key={e.id}><td><b>{e.id}</b><small>{e.time}</small></td><td>{e.description}<small>{e.reference}</small></td><td>{e.debit?money(e.debit):"—"}</td><td>{e.credit?money(e.credit):"—"}</td><td><span className="posted-tag">{e.status}</span></td></tr>)}</tbody></table></div>
        <div className="ledger-foot">Every posted journal is represented by equal debit and credit totals. Demo entries are client-side only.</div>
      </section>
      <footer className="finance-footer"><span>AKB CENTRAL FINANCIAL CORE <b>v0.1 · SANDBOX PREVIEW</b></span><span>ZERO-DESTRUCTION POLICY ACTIVE</span></footer>
    </section>
  </main>;
}
