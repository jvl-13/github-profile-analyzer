export default function TechStack({
  languages,
}) {
  return (
    <div className="bg-slate-900 p-6 rounded-2xl">

      <h3 className="mb-4 font-semibold">
        Languages
      </h3>

      <div className="flex flex-wrap gap-2">

        {Object.keys(languages).map(
          (lang) => (
            <span
              key={lang}
              className="px-3 py-1 bg-slate-800 rounded-full"
            >
              {lang}
            </span>
          )
        )}

      </div>

    </div>
  );
}