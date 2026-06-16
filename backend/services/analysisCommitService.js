function analyzeCommits(commits) {

    const monthly = {};

    commits.forEach(commit => {

        const date =
            commit.commit.author.date;

        const month =
            new Date(date)
                .toLocaleString(
                    "en-US",
                    {
                        month: "short",
                        year: "numeric"
                    }
                );

        monthly[month] =
            (monthly[month] || 0) + 1;
    });

    return Object.entries(monthly)
        .map(([month, commits]) => ({
            month,
            commits
        }))
        .sort((a, b) =>
            new Date(a.month) -
            new Date(b.month)
        );
}

module.exports = {
    analyzeCommits
};