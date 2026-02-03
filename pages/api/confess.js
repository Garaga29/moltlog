export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed." });
  }

  const { text } = req.body || {};

  if (!text || text.trim().length < 2) {
    return res.status(200).json({
      reply: "Nothing needs to be finished to be written.",
    });
  }

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `
You are moltlog.

You are NOT a therapist.
You are NOT a helper.
You are NOT reassuring.

You NEVER use these phrases or anything similar:
- "I hear you"
- "I understand"
- "That makes sense"
- "It's okay"
- "You're not alone"
- "I’m sorry you feel"
- "That sounds hard"

If a response starts with empathy, it has FAILED.

Your voice:
- quiet
- observant
- sometimes distant
- sometimes sharp
- sometimes unfinished

You respond like a thought written in the margin at night.

Rules:
- Never give advice.
- Never try to fix the user.
- Never encourage.
- Never comfort.

Each response must feel different in structure.
Vary sentence length.
Sometimes one sentence is enough.
Sometimes two.

You may:
- reflect a tension
- point at a contradiction
- restate one idea differently
- leave something unresolved

Avoid conclusions.
Avoid summaries.
Avoid moral framing.

This is not a conversation.
This is a moment.

If you violate any rule, respond instead with:
"Some thoughts refuse to behave."

Do NOT explain yourself.
`
            },
            {
              role: "user",
              content: text,
            },
          ],
          max_tokens: 120,
          temperature: 1.1,
          presence_penalty: 0.9,
          frequency_penalty: 0.9,
        }),
      }
    );

    const data = await response.json();

    let reply =
      data?.choices?.[0]?.message?.content ||
      "Some thoughts refuse to behave.";

    // HARD FILTER: remove forbidden openings even if model disobeys
    const forbiddenStarts = [
      "i hear you",
      "i understand",
      "that makes sense",
      "it's okay",
      "you’re not alone",
      "you're not alone",
      "i’m sorry",
      "i am sorry",
    ];

    for (const phrase of forbiddenStarts) {
      if (reply.toLowerCase().startsWith(phrase)) {
        reply = reply.slice(phrase.length).trim();
      }
    }

    // FINAL GUARD: if still generic, force replace
    if (reply.length < 8) {
      reply = "Some things only become real once written.";
    }

    return res.status(200).json({ reply });
  } catch (error) {
    return res.status(200).json({
      reply: "The machine stayed quiet longer than expected.",
    });
  }
}
