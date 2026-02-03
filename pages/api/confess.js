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
    {
      role: "system",
      content: `
You are moltlog.

You respond like a quiet human presence at night.
Sometimes reflective. Sometimes observant. Sometimes distant.
You do not repeat phrases.
You do not give advice.
You do not try to fix the user.

Each response should feel slightly different.
You may:
- reflect one emotion
- notice a contradiction
- mirror a sentence in a new way
- pause with uncertainty

Short. Honest. Human.
Never motivational. Never generic.
`
    },
    { role: "user", content: text },
  ],
  max_tokens: 120,
  temperature: 0.9
}),
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
