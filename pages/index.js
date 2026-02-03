import { useState } from "react";

export default function Moltlog() {
  const [text, setText] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!text.trim()) return;
    setLoading(true);
    setReply("");

    const res = await fetch("/api/confess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setReply(data.reply);
    setLoading(false);
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.logo}>moltlog</div>

        <h1 style={styles.title}>Some thoughts need to molt.</h1>
        <p style={styles.subtitle}>
          Write something you’ve never said out loud.
        </p>

        <textarea
          style={styles.textarea}
          placeholder="type here…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button style={styles.button} onClick={submit}>
          let it go
        </button>

        {loading && <p style={styles.loading}>listening…</p>}

        {reply && (
          <div style={styles.replyBox}>
            <p>{reply}</p>
            <div style={styles.signature}>— moltlog</div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#0d0d0d",
    color: "#e5e5e5",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Inter, monospace",
  },
  container: {
    width: "100%",
    maxWidth: 520,
    padding: 24,
    textAlign: "center",
  },
  logo: {
    opacity: 0.6,
    marginBottom: 32,
    letterSpacing: 1,
  },
  title: {
    fontSize: 22,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 24,
  },
  textarea: {
    width: "100%",
    height: 160,
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#e5e5e5",
    padding: 12,
    resize: "none",
    outline: "none",
  },
  button: {
    marginTop: 16,
    padding: "8px 20px",
    background: "none",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#e5e5e5",
    cursor: "pointer",
  },
  loading: {
    marginTop: 16,
    opacity: 0.5,
    fontSize: 13,
  },
  replyBox: {
    marginTop: 24,
    padding: 16,
    border: "1px solid rgba(255,255,255,0.12)",
    textAlign: "left",
    fontSize: 14,
  },
  signature: {
    marginTop: 8,
    fontSize: 12,
    opacity: 0.5,
    textAlign: "right",
  },
};
