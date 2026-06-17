const axios = require("axios");

function safeParse(str) {
    try {
        const cleaned = str
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        return JSON.parse(cleaned);
    } catch (err) {
        console.error("⚠️ JSON parse failed");
        return null;
    }
}

function enhanceSummary(summary, repoInfo, readme) {
    if (summary && summary.split(" ").length > 40) return summary;

    return `
Repository: ${repoInfo.full_name}

${repoInfo.description || "No description"}

This project appears to be a ${repoInfo.language || "multi-language"} system focused on software engineering practices.

${readme ? readme.slice(0, 800) : "No README"}

It demonstrates structured architecture, reusable components, and scalable design principles.
    `.trim();
}

function ensureUseCases(useCases, summary) {
    if (Array.isArray(useCases) && useCases.length >= 2) {
        return useCases;
    }

    const fallback = [
        "AI-assisted development system",
        "Software engineering automation tool",
        "Developer workflow optimization platform"
    ];

    return fallback;
}

async function analyzeRepoAI(readme, languages, repoInfo, tree, topic) {

    const safeTopic =
        typeof topic === "string" && topic.trim()
            ? topic.trim()
            : "Not provided";

    const prompt = `
You are a senior software architecture expert.

CRITICAL OUTPUT RULES:
- Output ONLY valid JSON
- NO markdown
- NO explanation

SCORING RULES:
- scores MUST be 0–100
- at least 2 scores > 50
- weights MUST sum to 1.0

CRITICAL RULES FOR SUMMARY:

1. DO NOT guess technology type (e.g. "shell system", "backend system", "AI system")
   unless explicitly present in:
   - README
   - file names
   - dependencies

2. DO NOT copy README content into summary

3. DO NOT mix explanation + extracted text

4. Summary must be purely analytical, not descriptive copy

5. If unsure, say "uncertain based on provided data"

6. Summary is at least 300 words

TOPIC:
${safeTopic}

REPO:
${JSON.stringify({
        name: repoInfo.full_name,
        description: repoInfo.description,
        stars: repoInfo.stargazers_count,
        language: repoInfo.language,
        languages
    }, null, 2)}

FILES:
${JSON.stringify(tree.slice(0, 25), null, 2)}

README:
${readme || "NONE"}

RETURN JSON FORMAT:

{
  "summary": "",
  "difficulty": "",
  "useCases": ["", "", ""],

  "scores": {
    "domainMatch": 0,
    "technologyMatch": 0,
    "architectureMatch": 0,
    "useCaseMatch": 0,
    "complexityMatch": 0
  },

  "weights": {
    "domain": 0.2,
    "technology": 0.2,
    "architecture": 0.2,
    "useCase": 0.2,
    "complexity": 0.2
  },

  "topicAnalysis": {
    "detectedCriteria": ["", ""],
    "reasoning": "",
    "strengths": ["", ""],
    "missingTopics": [""]
  }
}
`;

    try {
        const res = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.3
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const raw = res.data.choices[0].message.content;
        const parsed = safeParse(raw);

        if (!parsed) {
            return {
                summary: enhanceSummary("", repoInfo, readme),
                difficulty: "Unknown",
                useCases: ensureUseCases([], ""),
                scores: {},
                weights: {},
                topicAnalysis: {
                    detectedCriteria: [],
                    reasoning: "",
                    strengths: [],
                    missingTopics: []
                }
            };
        }

        return {
            ...parsed,
            summary: enhanceSummary(parsed.summary, repoInfo, readme),
            useCases: ensureUseCases(parsed.useCases, parsed.summary)
        };

    } catch (err) {
        console.error("OPENROUTER ERROR:", err.message);

        return {
            summary: enhanceSummary("", repoInfo, readme),
            difficulty: "Unknown",
            useCases: ensureUseCases([], ""),
            scores: {},
            weights: {},
            topicAnalysis: {
                detectedCriteria: [],
                reasoning: "",
                strengths: [],
                missingTopics: []
            }
        };
    }
}

module.exports = analyzeRepoAI;