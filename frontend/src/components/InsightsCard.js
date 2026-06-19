export default function InsightsCard({
  title,
  icon,
  items,
}) {
  return (
    <div className="
      bg-slate-900
      rounded-3xl
      p-6
    ">

      <h2 className="
        text-lg
        font-bold
        mb-4
      ">
        {icon} {title}
      </h2>

      <div className="space-y-3">

        {items?.map((item) => (
          <div
            key={item}
            className="
              bg-slate-800
              rounded-xl
              p-3
            "
          >
            {item}
          </div>
        ))}

      </div>

    </div>
  );
}