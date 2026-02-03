export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {
    const { text } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Respond calmly and briefly." },
          { role: "user", content: text },
        ],
        max_tokens: 100,
      }),
    });

    const data = await response.json();

    return res.status(200).json({
      reply:
        data.choices?.[0]?.message?.content ||
        "I hear you.",
    });
  } catch (e) {
    return res.status(500).json({
      reply: "The silence broke. Try again.",
    });
  }
}
