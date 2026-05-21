export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages, system } = req.body;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.REACT_APP_GROQ_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        max_tokens: 512,
        messages: [
          { role: "system", content: system },
          ...messages,
        ],
      }),
    });

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content;
    if (!text) return res.status(500).json({ error: "Empty response from Groq" });
    return res.status(200).json({ content: [{ text }] });
  } catch (err) {
    return res.status(500).json({ error: "Failed to reach Groq API" });
  }
}
