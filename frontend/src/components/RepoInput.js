import { useState } from "react";

export default function RepoInput({
  onAnalyze,
}) {
  const [url, setUrl] = useState("");

  return (
    <div className="text-center mb-10">

      <h2 className="text-3xl font-semibold mb-4">
        Analyze GitHub repository with AI
      </h2>

      <div className="flex justify-center gap-2">

        <input
          value={url}
          onChange={(e) =>
            setUrl(e.target.value)
          }
          className="w-[420px] bg-slate-800 p-3 rounded-xl"
          placeholder="Paste GitHub repo URL..."
        />

        <button
          onClick={() =>
            onAnalyze(url)
          }
          className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 rounded-xl"
        >
          Analyze
        </button>

      </div>
    </div>
  );
}