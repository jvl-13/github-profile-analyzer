import React from "react";

const tech = ["React", "TypeScript", "Node.js", "Tailwind", "Docker"];

export default function TechStack() {
  return (
    <div className="bg-slate-900 p-6 rounded-2xl">
      <h3 className="mb-3 font-semibold">Tech Stack</h3>

      <div className="flex flex-wrap gap-2">
        {tech.map((t) => (
          <span
            key={t}
            className="px-3 py-1 bg-slate-800 rounded-full text-sm hover:scale-105 transition"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}