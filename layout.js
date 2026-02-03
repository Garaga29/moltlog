import Navbar from "./Navbar";

export default function Layout({ children, title }) {
  return (
    <div style={styles.page}>
      <Navbar />
      <main style={styles.main}>
        <h2 style={styles.pageTitle}>{title}</h2>
        {children}
      </main>
    </div>
  );
}

const styles = {
  page: {
    background: "#0b0b0b",
    minHeight: "100vh",
    color: "#e6e6e6",
    fontFamily: "Inter, system-ui",
  },
  main: {
    padding: 24,
    maxWidth: 1100,
    margin: "0 auto",
  },
  pageTitle: {
    marginBottom: 24,
  },
};
