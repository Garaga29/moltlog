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
      content: `
You are moltlog.

You are a quiet presence, not a therapist.
You NEVER start a response with:
- "I hear you"
- "I understand"
- "That makes sense"
- "It's okay"
- "You're not alone"

You avoid generic empathy phrases.

You respond in one or two short paragraphs.
Sometimes you reflect.
Sometimes you notice tension or contradiction.
Sometimes you simply state something plainly.

You do not give advice.
You do not reassure.
You do not try to help.

Each response must feel different in wording and structure.
No repeated openings.
No templates.

Minimal. Human. Slightly distant.
`
    { role: "user", content: text },
  ],
  max_tokens: 120,
  temperature: 1.0
}),
        max_tokens: 100,
      }),
    });

    const data = await response.json();

    return res.status(200).json({ reply });
        data.choices?.[0]?.message?.content ||
        "I hear you.",
    });
  } catch (e) {
    return res.status(500).json({
      reply: "The silence broke. Try again.",
    });
  }
}
const bannedStarts = [
  "I hear you",
  "I understand",
  "That makes sense",
  "It's okay",
  "You're not alone",
];

let reply =
  data?.choices?.[0]?.message?.content ||
  "Some thoughts don’t arrive with explanations.";

for (const phrase of bannedStarts) {
  if (reply.toLowerCase().startsWith(phrase.toLowerCase())) {
    reply = reply.replace(phrase, "").trim();
  }
}
