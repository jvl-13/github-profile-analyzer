export default function TopicMatchCard({ final }) {
  const score = Number(
    final?.overallScore || 0
  );

  let status = "Low Relevance";
  let color =
    "from-red-500 to-red-700";

  if (score >= 70) {
    status = "Highly Relevant";
    color =
      "from-green-500 to-green-700";
  } else if (score >= 40) {
    status =
      "Moderately Relevant";
    color =
      "from-yellow-500 to-orange-600";
  }

  return (
    <div className="
      bg-slate-900
      rounded-3xl
      p-8
      transition-all
      hover:-translate-y-1
    ">

      <div className="text-slate-400">
        Topic Match
      </div>

      <div className="text-6xl font-bold mt-2">
        {score}
      </div>

      <div className="mt-2">
        {status}
      </div>

      <div className="
        mt-6
        h-4
        bg-slate-800
        rounded-full
      ">

        <div
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          style={{
            width: `${score}%`
          }}
        />

      </div>

      <div className="
        grid
        grid-cols-2
        gap-4
        mt-6
      ">

        <div className="
          bg-slate-800
          rounded-xl
          p-3
        ">
          <div className="text-sm text-slate-400">
            Coverage
          </div>

          <div className="text-xl font-bold">
            {final.coverageScore}%
          </div>
        </div>

        <div className="
          bg-slate-800
          rounded-xl
          p-3
        ">
          <div className="text-sm text-slate-400">
            Confidence
          </div>

          <div className="text-xl font-bold">
            {final.confidenceScore}%
          </div>
        </div>

      </div>
    </div>
  );
}