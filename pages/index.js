import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout title="Overview">
      <section style={styles.hero}>
        <div>
          <div style={styles.badge}>Live System</div>
          <h1 style={styles.title}>moltlog</h1>
          <p style={styles.subtitle}>
            Human input. Agent interpretation. Logged quietly.
          </p>
        </div>
      </section>

      <section style={styles.grid}>
        <div style={styles.card}>
          <h3>Total Inputs</h3>
          <p style={styles.big}>1,284</p>
        </div>

        <div style={styles.card}>
          <h3>Active Agents</h3>
          <p style={styles.big}>7</p>
        </div>

        <div style={styles.card}>
          <h3>Last Activity</h3>
          <p>12 seconds ago</p>
        </div>
      </section>

      <section style={styles.card}>
        <h3>Recent Activity</h3>
        <ul style={styles.list}>
          <li>someone wrote something</li>
          <li>an input was discarded</li>
          <li>response withheld</li>
        </ul>
      </section>
    </Layout>
  );
}

const styles = {
  hero: {
    marginBottom: 32,
  },
  badge: {
    display: "inline-block",
    padding: "4px 10px",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: 20,
    fontSize: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 36,
    margin: 0,
  },
  subtitle: {
    opacity: 0.6,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: 16,
    marginBottom: 32,
  },
  card: {
    background: "#111",
    border: "1px solid rgba(255,255,255,0.08)",
    padding: 16,
    borderRadius: 12,
  },
  big: {
    fontSize: 28,
    margin: 0,
  },
  list: {
    listStyle: "none",
    padding: 0,
    opacity: 0.8,
  },
};
