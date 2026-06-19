import { useState } from "react";

export default function RepoInput({
  onAnalyze,
}) {
  const [url, setUrl] = useState("");
  const [topic, setTopic] = useState("");

  const handleSubmit = () => {
    if (!url.trim()) return;

    onAnalyze(
      url.trim(),
      topic.trim()
    );
  };

  return (
    <div className="max-w-4xl mx-auto mb-10">

      <div className="text-center mb-6">

        <h1 className="text-4xl font-bold mb-3">
          AI Repository Evaluator
        </h1>

        <p className="text-slate-400">
          Compare a GitHub repository against a topic,
          project idea, or technical requirement.
        </p>

      </div>

      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

        {/* Repo URL */}

        <label className="block mb-2 text-sm text-slate-400">
          GitHub Repository
        </label>

        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="
            w-full
            bg-slate-800
            p-3
            rounded-xl
            mb-5
            outline-none
            border
            border-slate-700
            focus:border-blue-500
          "
          placeholder="https://github.com/owner/repository"
        />

        {/* Topic */}

        <label className="block mb-2 text-sm text-slate-400">
          Topic / What are you looking for?
        </label>

        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          rows={4}
          className="
            w-full
            bg-slate-800
            p-3
            rounded-xl
            outline-none
            border
            border-slate-700
            focus:border-blue-500
          "
          placeholder="Example: coding agents using artificial intelligence with javascript and shell"
        />

        {/* Examples */}

        <div className="mt-4 text-sm text-slate-500">

          Examples:

          <div className="mt-2 flex flex-wrap gap-2">

            <button
              type="button"
              onClick={() =>
                setTopic(
                  "coding agents using artificial intelligence with javascript and shell"
                )
              }
              className="
                bg-slate-800
                hover:bg-slate-700
                px-3
                py-1
                rounded-full
              "
            >
              AI Coding Agents
            </button>

            <button
              type="button"
              onClick={() =>
                setTopic(
                  "backend microservices with node.js and docker"
                )
              }
              className="
                bg-slate-800
                hover:bg-slate-700
                px-3
                py-1
                rounded-full
              "
            >
              Node.js Microservices
            </button>

            <button
              type="button"
              onClick={() =>
                setTopic(
                  "machine learning project for recommendation systems"
                )
              }
              className="
                bg-slate-800
                hover:bg-slate-700
                px-3
                py-1
                rounded-full
              "
            >
              Recommendation Systems
            </button>

          </div>

        </div>

        {/* Analyze */}

        <button
          onClick={handleSubmit}
          className="
            mt-6
            w-full
            bg-gradient-to-r
            from-blue-500
            to-purple-600
            py-3
            rounded-xl
            font-semibold
            hover:opacity-90
            transition
          "
        >
          Analyze Repository
        </button>

      </div>

    </div>
  );
}