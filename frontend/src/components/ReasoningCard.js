export default function ReasoningCard({
  reasoning
}) {
  if (!reasoning) return null;

  return (
    <div className="
      bg-slate-900
      rounded-3xl
      p-6
    ">

      <h2 className="text-xl font-bold mb-4">
        AI Reasoning
      </h2>

      <p className="
        text-slate-300
        leading-7
      ">
        {reasoning}
      </p>

    </div>
  );
}