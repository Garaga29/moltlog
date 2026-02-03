import { useEffect, useState } from "react";

export default function Moltlog() {
  const [text, setText] = useState("");
  const [reply, setReply] = useState("");
  const [status, setStatus] = useState("system online");
  const [activity, setActivity] = useState("");
  const [listening, setListening] = useState(false);

  // ambient system activity
  useEffect(() => {
    const messages = [
      "someone paused before submitting",
      "a thought was discarded",
      "input detected",
      "nothing saved",
      "a sentence almost happened",
      "memory skipped",
    ];

    const interval = setInterval(() => {
      setActivity(messages[Math.floor(Math.random() * messages.length)]);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  async function submit() {
    if (!text.trim()) return;

    setListening(true);
    setReply("");
    setStatus("listening…");

    // intentional delay (anti-instant)
    await new Promise((r) => setTimeout(r, 2800));

    try {
      const res = await fetch("/api/confess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      setReply(data.reply);
      setStatus("idle");
    } catch {
      setReply("…");
      setStatus("idle");
    }

    setListening(false);
    setText("");
  }

  return (
    <div style={styles.page}>
      <div style={styles.frame}>
        {/* header */}
        <div style={styles.header}>
          <div>moltlog</div>
          <div style={styles.dim}>{status}</div>
        </div>

        {/* ambient system */}
        <div style={styles.system}>
          <span className="blink">●</span> {activity}
        </div>

        {/* input zone */}
        <div style={styles.inputZone}>
          <textarea
            style={styles.textarea}
            placeholder="type something"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
          />
          <div style={styles.hint}>press enter to release</div>
        </div>

        {/* response zone */}
        <div style={styles.response}>
          {listening && <div style={styles.dim}>listening…</div>}
          {!listening && reply && <div>{reply}</div>}
        </div>

        {/* footer */}
        <div style={styles.footer}>
          last activity just now · nothing stored
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#0b0b0b",
    color: "#e6e6e6",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  },
  frame: {
    width: "100%",
    maxWidth: 640,
    padding: 24,
    border: "1px solid rgba(255,255,255,0.08)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 12,
    fontSize: 13,
    opacity: 0.8,
  },
  system: {
    fontSize: 12,
    opacity: 0.55,
    marginBottom: 24,
  },
  inputZone: {
    marginBottom: 24,
  },
  textarea: {
    width: "100%",
    height: 90,
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(255,255,255,0.15)",
    color: "#e6e6e6",
    resize: "none",
    outline: "none",
    fontSize: 14,
  },
  hint: {
    fontSize: 11,
    opacity: 0.4,
    marginTop: 6,
  },
  response: {
    minHeight: 60,
    fontSize: 14,
    lineHeight: 1.6,
    marginBottom: 24,
  },
  footer: {
    fontSize: 11,
    opacity: 0.35,
    borderTop: "1px solid rgba(255,255,255,0.08)",
    paddingTop: 12,
  },
  dim: {
    opacity: 0.5,
  },
};
