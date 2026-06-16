const router = require("express").Router();

const parseRepoUrl = require("../utils/parseRepoUrl");

const {
    getRepo,
    getLanguages,
    getFileTree,
    getReadme,
    getCommits
} = require("../services/githubService");

const analyzeRepoAI =
    require("../services/aiService");

const {
    analyzeRepo
} = require("../services/analysisService");

const {
    analyzeCommits
} = require("../services/analysisCommitService");


router.post("/", async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ error: "Missing repo URL" });

        const { owner, repo } = parseRepoUrl(url);
        console.log("Analyzing repo:", owner, repo);

        // 1️⃣ Repo info
        let repoInfo = {};

        try { 
            repoInfo = await getRepo(owner, repo); 
        }
        catch (err) { 
            console.log("REPO ERROR:", err.response?.data || err.message); return res.status(500).json({ error: "Failed to fetch repo info" }); 
        }

        // 2️⃣ File tree
        let tree = [];

        try { 
            tree = await getFileTree(owner, repo, repoInfo.default_branch); 
        }
        catch (err) { 
            console.log("TREE ERROR:", err.response?.data || err.message); 
        }

        // 3️⃣ Languages
        let languages = {};

        try { 
            languages = await getLanguages(owner, repo); 
        }
        catch (err) { 
            console.log("LANGUAGES ERROR:", err.response?.data || err.message); 
        }

        // 4️⃣ Complexity
        const complexity = analyzeRepo(tree);

        // 5️⃣ Readme
        let readme = "";

        try {
            readme = await getReadme(owner, repo);
        }
        catch (err) { 
            console.log("README ERROR:", err.response?.data || err.message); 
        }

        // 6️⃣ Commit trend
        let commitTrend = [];

        try {

            const commits =
                await getCommits(
                    owner,
                    repo
                );

            commitTrend =
                analyzeCommits(
                    commits
                );

        }
        catch (err) {

            console.log(
                "COMMITS ERROR:",
                err.response?.data ||
                err.message
            );

        }
        
        /// 7️⃣ AI Summary
        let summary = "";

        try {

            summary =
                await analyzeRepoAI(
                    readme,
                    languages
                );

        }
        catch(err) {

            console.log(
                "AI ERROR:",
                err.message
            );

        }

        // 7️⃣ Return JSON
        res.json({
            repo: repoInfo,
            languages,
            complexity,
            summary,
            commitTrend
        });
    } catch (err) {

        console.log("==== UNEXPECTED ERROR ====");
        
        console.log(err);

        res.status(500).json({ error: "Unexpected error analyzing repo" });
    
    }
});

module.exports = router;