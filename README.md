# RepoMatch AI (github-profile-analyzer)

**Live demo:** [repo-match-ai.vercel.app](https://repo-match-ai.vercel.app)

RepoMatch AI analyzes any public GitHub repository against a topic, role, or set of requirements you provide (e.g. a job description, a skill you're hiring for, or a project brief), and returns an AI-generated relevance score, a written summary, strengths/gaps, and repo-health metrics — all visualized on a single dashboard.

It's not just "show me GitHub stats" — it answers the question: **"Does this repo actually match what I'm looking for?"**

---

## How it works

1. The user submits a **GitHub repo URL** and a **topic** (free text describing what they're evaluating the repo against).
2. The backend fetches, in parallel, from the GitHub REST API:
   - Repo metadata (stars, description, default branch, language, etc.)
   - Language breakdown
   - README contents
   - Commit history for the last 6 months (fetched month-by-month)
   - The repo's file tree (top-level contents)
3. Two local (non-AI) analyses run on this data:
   - **Complexity analysis** — derived from the file tree (file count, estimated LOC, largest file, etc.)
   - **Commit trend analysis** — aggregates commit activity over time for the trend chart
4. An **AI analysis** step sends the README, languages, repo metadata, and a sample of the file tree to an LLM (via OpenRouter, `gpt-3.5-turbo`) with a strict prompt that asks for:
   - A purely analytical summary (≥300 words, must not just copy the README)
   - A difficulty rating
   - Use cases
   - Five 0–100 match scores: domain, technology, architecture, use case, complexity
   - Matching weights (summing to 1.0)
   - A breakdown of detected criteria, reasoning, strengths, and missing topics relative to the submitted topic
5. The backend computes derived scores on top of the AI output:
   - **Overall score** — weighted average of the 5 match scores
   - **Coverage score** — % of scores the AI actually returned non-zero values for
   - **Confidence score** — a heuristic based on topic length and repo metadata richness
6. The frontend renders everything: a summary card, topic-match card, reasoning, strengths/missing topics/use cases, a score breakdown, repo metrics, and Pie/Line/Bar charts for languages, commit trend, and complexity.

---

## Architecture

```
github-profile-analyzer/
├── backend/
│   ├── routes/
│   │   └── analyze.js          # POST /api/analyze — orchestrates the whole pipeline
│   ├── services/
│   │   ├── githubService.js    # GitHub REST API client (repo, languages, tree, readme, commits)
│   │   ├── aiService.js        # Builds the AI prompt, calls OpenRouter, parses/repairs the response
│   │   ├── analysisService.js  # Local complexity analysis from file tree
│   │   ├── analysisCommitService.js # Local commit-trend aggregation
│   │   └── scoreEngine.js      # Final/coverage/confidence score calculations
│   └── utils/
│       └── parseRepoUrl.js     # Extracts {owner, repo} from a GitHub URL
└── frontend/
    └── src/
        ├── App.jsx              # Main dashboard layout and state
        └── components/
            ├── RepoInput.jsx
            ├── SummaryCard.jsx
            ├── TopicMatchCard.jsx
            ├── ReasoningCard.jsx
            ├── InsightsCard.jsx
            ├── ScoreBreakdown.jsx
            └── Charts/
                ├── PieChart.jsx
                ├── LineChart.jsx
                └── BarChart.jsx
```

**Backend:** Node.js + Express, `axios` for HTTP calls to the GitHub API and OpenRouter.
**Frontend:** React (hooks-based, single `App` component holding state), Tailwind CSS utility classes, charting components (Pie/Line/Bar).
**AI provider:** [OpenRouter](https://openrouter.ai) using `openai/gpt-3.5-turbo`.

---

## API

### `POST /api/analyze`

**Request body:**
```json
{
  "url": "https://github.com/owner/repo",
  "topic": "Looking for a backend candidate strong in distributed systems and Node.js"
}
```

**Response body (shape):**
```json
{
  "repo": { "...": "raw GitHub repo metadata" },
  "languages": { "JavaScript": 12345, "CSS": 678 },
  "complexity": {
    "totalFiles": 0,
    "estimatedLOC": 0,
    "largestFile": "..."
  },
  "commitTrend": [],
  "summary": "string (AI-generated, ≥300 words)",
  "difficulty": "string",
  "useCases": ["...", "...", "..."],
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
    "detectedCriteria": ["..."],
    "reasoning": "string",
    "strengths": ["..."],
    "missingTopics": ["..."]
  },
  "final": {
    "overallScore": 0,
    "coverageScore": 0,
    "confidenceScore": 0
  }
}
```

If the AI response fails to parse or the OpenRouter call fails, the API still returns a valid response: it falls back to a templated summary built from the repo's own metadata and README, generic use cases, and empty score/topic objects — so the frontend never breaks even when the AI step fails.

---

## Setup

### Prerequisites
- Node.js
- A [GitHub personal access token](https://github.com/settings/tokens) (for higher API rate limits and to access the GitHub REST API)
- An [OpenRouter API key](https://openrouter.ai)

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
GITHUB_TOKEN=your_github_personal_access_token
OPENROUTER_API_KEY=your_openrouter_api_key
```

Start the server:

```bash
npm start
```

### Frontend

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:

```env
REACT_APP_API_URL=http://localhost:<backend_port>
```

Start the app:

```bash
npm start
```

---

## Notes / Known Limitations

- **File tree depth:** the GitHub `contents` endpoint is used instead of the recursive `git/trees` API to avoid `403` errors on large repos — this means only the **top-level** directory contents are analyzed, not the full nested tree.
- **Commit history window:** limited to the last 6 months, fetched in monthly chunks (7 GitHub API calls per request just for commits).
- **AI output is not 100% deterministic** — the prompt enforces strict JSON-only output and scoring rules, but a `safeParse` fallback strips markdown fences and gracefully degrades to a templated response if parsing fails or the request errors out.
- **Rate limits:** all GitHub API calls use a single token (`GITHUB_TOKEN`); heavy usage may hit GitHub's standard rate limits (5,000 requests/hour authenticated).
 