const router = require("express").Router();

const parseRepoUrl = require("../utils/parseRepoUrl");

const {
    getRepo,
    getLanguages,
    getFileTree,
    getReadme,
    getCommits
} = require("../services/githubService");

const analyzeRepoAI = require("../services/aiService");

const { analyzeRepo } = require("../services/analysisService");
const { analyzeCommits } = require("../services/analysisCommitService");

const {
    calculateFinalScore,
    calculateCoverage,
    calculateConfidence
} = require("../services/scoreEngine");

router.post("/", async (req, res) => {
    try {
        let { url, topic = "" } = req.body;

        if (!url) {
            return res.status(400).json({ error: "Missing repo URL" });
        }

        if (typeof topic !== "string") {
            topic = "";
        }

        const { owner, repo } = parseRepoUrl(url);

        // 🚀 parallel fetch (optimized)
        const [repoInfo, languages, readme, commits] = await Promise.all([
            getRepo(owner, repo),
            getLanguages(owner, repo),
            getReadme(owner, repo),
            getCommits(owner, repo)
        ]);

        const tree = await getFileTree(owner, repo, repoInfo.default_branch);

        const complexity = analyzeRepo(tree);
        const commitTrend = analyzeCommits(commits);

        // AI analysis
        const aiResult = await analyzeRepoAI(
            readme,
            languages,
            repoInfo,
            tree,
            topic
        );

        const finalScore = calculateFinalScore(
            aiResult.scores || {},
            aiResult.weights || {}
        );

        const coverageScore = calculateCoverage(aiResult.scores || {});
        const confidenceScore = calculateConfidence(topic, repoInfo);

        return res.json({
            repo: repoInfo,
            languages,
            complexity,
            commitTrend,

            summary: aiResult.summary,
            difficulty: aiResult.difficulty,
            useCases: aiResult.useCases,

            scores: aiResult.scores,
            weights: aiResult.weights,
            topicAnalysis: aiResult.topicAnalysis,

            final: {
                overallScore: finalScore,
                coverageScore,
                confidenceScore
            }
        });

    } catch (err) {
        console.error("UNEXPECTED ERROR:", err);

        return res.status(500).json({
            error: "Unexpected error analyzing repo"
        });
    }
});

module.exports = router;