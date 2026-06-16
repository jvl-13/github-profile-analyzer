const axios = require("axios");

async function analyzeRepoAI(readme, languages) {
  const prompt = `
Analyze this GitHub repository:

README:
${readme}

Languages:
${JSON.stringify(languages)}

Return:
- Project summary
- Difficulty
- Use cases
`;

  try {
    const res = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo", // FREE tier
        messages: [{ role: "user", content: prompt }]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return res.data.choices[0].message.content;
  } catch (err) {
    console.error("OPENROUTER ERROR:", err.response?.data || err.message);
    return "AI summary unavailable";
  }
}

module.exports = analyzeRepoAI;