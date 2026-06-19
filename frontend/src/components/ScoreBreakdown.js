const labels = {
  domainMatch: "Domain",
  technologyMatch: "Technology",
  architectureMatch: "Architecture",
  useCaseMatch: "Use Case",
  complexityMatch: "Complexity",
};

export default function ScoreBreakdown({
  scores,
}) {
  return (
    <div className="
      bg-slate-900
      rounded-3xl
      p-6
    ">

      <h2 className="
        text-xl
        font-bold
        mb-6
      ">
        Score Breakdown
      </h2>

      {Object.entries(
        scores || {}
      ).map(([key, value]) => (
        <div
          key={key}
          className="mb-5"
        >

          <div className="
            flex
            justify-between
            mb-2
          ">

            <span>
              {labels[key]}
            </span>

            <span>
              {value}
            </span>

          </div>

          <div className="
            h-3
            bg-slate-800
            rounded-full
          ">

            <div
              className="
                h-3
                rounded-full
                bg-gradient-to-r
                from-cyan-500
                to-blue-500
              "
              style={{
                width: `${value}%`
              }}
            />

          </div>

        </div>
      ))}

    </div>
  );
}