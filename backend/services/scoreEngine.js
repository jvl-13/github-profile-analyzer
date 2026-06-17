function clamp(n) {
    if (typeof n !== "number" || isNaN(n)) return 0;
    return Math.max(0, Math.min(100, n));
}

function calculateFinalScore(scores = {}, weights = {}) {

    const map = {
        domainMatch: "domain",
        technologyMatch: "technology",
        architectureMatch: "architecture",
        useCaseMatch: "useCase",
        complexityMatch: "complexity"
    };

    let totalWeight = 0;
    let weightedSum = 0;

    for (const key in map) {
        const score = clamp(scores[key]);
        const weight = weights[map[key]] || 0;

        weightedSum += score * weight;
        totalWeight += weight;
    }

    if (totalWeight === 0) return 0;

    return Number((weightedSum / totalWeight).toFixed(2));
}

function calculateCoverage(scores = {}) {
    const values = Object.values(scores);
    const valid = values.filter(v => typeof v === "number" && v > 0).length;

    if (!values.length) return 0;

    return Math.round((valid / values.length) * 100);
}

function calculateConfidence(topic, repoData) {
    let score = 50;

    if (topic && topic.length > 20) score += 10;
    if (topic && topic.length > 50) score += 10;
    if (repoData?.languages) score += 10;
    if (repoData?.description) score += 10;
    if (repoData?.stargazers_count > 10) score += 10;

    return Math.min(100, score);
}

module.exports = {
    calculateFinalScore,
    calculateCoverage,
    calculateConfidence
};