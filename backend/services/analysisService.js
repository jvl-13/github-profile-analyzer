function analyzeRepo(tree) {
    const files = tree.filter(f => f.type === "file" || f.type === "blob");
    const totalFiles = files.length;
    const sizes = files.map(f => f.size || 0);
    const totalSize = sizes.reduce((a,b)=>a+b,0);
    const largestFile = sizes.length ? Math.max(...sizes) : 0;
    const estimatedLOC = Math.floor(totalSize / 40);

    return { totalFiles, totalSize, largestFile, estimatedLOC };
}

module.exports = { analyzeRepo };