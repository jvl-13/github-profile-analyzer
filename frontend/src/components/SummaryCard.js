export default function SummaryCard({
  repo,
  summary,
}) {
  return (
    <div className="bg-slate-900 p-6 rounded-2xl">

      <div className="flex gap-4 items-center">

        <img
          src={repo.owner.avatar_url}
          alt={repo.owner.login}
          className="w-16 h-16 rounded-full"
        />

        <div>

          <h3 className="text-2xl font-bold">
            {repo.full_name}
          </h3>

          <p className="text-slate-400">
            {repo.description}
          </p>

        </div>

      </div>

      <div className="flex flex-wrap gap-6 mt-6">

        <span>
          ⭐ {repo.stargazers_count.toLocaleString()}
        </span>

        <span>
          🍴 {repo.forks_count.toLocaleString()}
        </span>

        <span>
          🐛 {repo.open_issues_count}
        </span>

        <span>
          👀 {repo.watchers_count.toLocaleString()}
        </span>

      </div>

      <p className="mt-6 text-slate-300 leading-7">
        {summary.split("**Difficulty:**")[0]}
      </p>

    </div>
  );
}