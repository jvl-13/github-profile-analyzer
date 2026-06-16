export default function SimilarProjects({
  summary,
}) {

  const section =
    summary.split(
      "**Similar projects:**"
    )[1] || "";

  const projects = section
    .split("\n")
    .filter((x) =>
      x.trim().startsWith("-")
    )
    .map((x) =>
      x.replace("-", "").trim()
    );

  return (
    <div className="mt-10">

      <h3 className="mb-4">
        Similar Projects
      </h3>

      <div className="flex gap-4 overflow-x-auto">

        {projects.map((project) => (

          <div
            key={project}
            className="min-w-[250px] bg-slate-900 p-5 rounded-xl"
          >
            {project}
          </div>

        ))}

      </div>

    </div>
  );
}