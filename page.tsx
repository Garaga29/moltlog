"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!text.trim()) return;
    setLoading(true);

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
    <main style={{ maxWidth: 520, padding: 24, textAlign: "center" }}>
      <div style={{ opacity: 0.6, marginBottom: 24 }}>moltlog</div>

      <h1>Some thoughts need to molt.</h1>
      <p style={{ opacity: 0.6 }}>
        Write something you’ve never said out loud.
      </p>

      <textarea
        style={{
          width: "100%",
          height: 160,
          background: "transparent",
          border: "1px solid rgba(255,255,255,.1)",
          padding: 12,
          color: "#fff",
          marginTop: 16
        }}
        placeholder="type here…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={submit}
        style={{
          marginTop: 16,
          padding: "8px 16px",
          border: "1px solid rgba(255,255,255,.2)",
          background: "none",
          color: "#fff"
        }}
      >
        let it go
      </button>

      {loading && <p style={{ opacity: 0.5 }}>listening…</p>}

      {reply && (
        <div style={{
          marginTop: 24,
          border: "1px solid rgba(255,255,255,.1)",
          padding: 16
        }}>
          {reply}
          <div style={{ opacity: 0.4, fontSize: 12 }}>— moltlog</div>
        </div>
      )}
    </main>
  );
}
