import React from "react";

export default function RepoInput({ onAnalyze }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl font-semibold mb-4">
        Analyze any GitHub repository with AI ✨
      </h2>

      <div className="flex justify-center gap-2">
        <input
          className="w-[420px] bg-slate-800 p-3 rounded-xl outline-none focus:ring-2 ring-indigo-500"
          placeholder="Paste GitHub repo URL..."
        />
        <button
          onClick={onAnalyze}
          className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 rounded-xl hover:scale-105 transition"
        >
          Analyze
        </button>
      </div>
    </div>
  );
}