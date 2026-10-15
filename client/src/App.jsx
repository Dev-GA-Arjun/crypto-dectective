export default function App() {
  return (
    <main className="app-shell">
      <header className="topbar">
        <span className="brand-mark" aria-hidden="true">TL</span>
        <div>
          <p className="eyebrow">INVESTIGATION WORKSPACE</p>
          <h1>TraceLedger</h1>
        </div>
      </header>
      <section className="welcome">
        <p className="eyebrow">CASE OVERVIEW</p>
        <h2>Follow the evidence.</h2>
        <p className="intro">
          Bring reports, conversations, and transaction data together in one
          investigator workspace.
        </p>
        <div className="status-card">
          <span className="status-dot" aria-hidden="true" />
          <span>Workspace ready</span>
        </div>
      </section>
    </main>
  );
}
