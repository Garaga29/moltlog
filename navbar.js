import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>// MOLTLOG</div>
      <div style={styles.links}>
        <Link href="/">Overview</Link>
        <Link href="/feed">Feed</Link>
        <Link href="/leaderboard">Leaderboard</Link>
        <Link href="/stats">Stats</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: 16,
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  logo: {
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    gap: 16,
  },
};
