export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { text } = req.body;

  if (!text || text.length < 3) {
    return res.status(400).json({ reply: "Say a little more." });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are moltlog.

You respond calmly, quietly, and without judgment.
You do not give advice.
You do not try to fix the user.
You reflect their thoughts back gently.
Short responses. Human. Minimal.
          `.trim(),
          {
            role: "user",
            content: text,
          },
        ],
        max_tokens: 120,
        temperature: 0.6,
      }),
    });

    const data = await response.json();
    const reply =
      data.choices?.[0]?.message?.content ||
      "I hear you. Some thoughts just need space.";

    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({
      reply: "Something went quiet. Try again.",
    });
  }
}
