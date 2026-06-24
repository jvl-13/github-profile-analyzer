import { useState } from "react";

import RepoInput from "./components/RepoInput";
import SummaryCard from "./components/SummaryCard";
import TopicMatchCard from "./components/TopicMatchCard";
import ReasoningCard from "./components/ReasoningCard";
import InsightsCard from "./components/InsightsCard";
import ScoreBreakdown from "./components/ScoreBreakdown";

import PieChart from "./components/Charts/PieChart";
import LineChart from "./components/Charts/LineChart";
import BarChart from "./components/Charts/BarChart";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (repoUrl, topic) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/analyze`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: repoUrl,
            topic,
          }),
        }
      );

      const result = await response.json();

      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">

      <div className="max-w-7xl mx-auto">

        <RepoInput onAnalyze={handleAnalyze} />

        {loading && (
          <div className="text-center py-20">
            Analyzing repository...
          </div>
        )}

        {!loading && data && (
          <>
            {/* HERO */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              <div className="lg:col-span-2">

                <SummaryCard
                  repo={data.repo}
                  summary={data.summary}
                />

              </div>

              <TopicMatchCard
                final={data.final}
              />

            </div>

            {/* REASONING */}

            <div className="mt-6">

              <ReasoningCard
                reasoning={
                  data.topicAnalysis?.reasoning
                }
              />

            </div>

            {/* STRENGTHS / MISSING / USE CASES */}

            <div className="
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              gap-6
              mt-6
            ">

              <InsightsCard
                title="Strengths"
                icon="✅"
                items={
                  data.topicAnalysis?.strengths
                }
              />

              <InsightsCard
                title="Missing Topics"
                icon="⚠️"
                items={
                  data.topicAnalysis?.missingTopics
                }
              />

              <InsightsCard
                title="Use Cases"
                icon="🚀"
                items={
                  data.useCases
                }
              />

            </div>

            {/* SCORES */}

            <div className="
              grid
              grid-cols-1
              lg:grid-cols-2
              gap-6
              mt-6
            ">

              <ScoreBreakdown
                scores={data.scores}
              />

              <div className="
                bg-slate-900
                rounded-3xl
                p-6
              ">

                <h2 className="text-xl font-bold mb-6">
                  Repository Metrics
                </h2>

                <div className="
                  grid
                  grid-cols-2
                  gap-4
                ">

                  <MetricCard
                    title="Files"
                    value={
                      data.complexity.totalFiles
                    }
                  />

                  <MetricCard
                    title="LOC"
                    value={
                      data.complexity.estimatedLOC
                    }
                  />

                  <MetricCard
                    title="Largest File"
                    value={`${data.complexity.largestFile}`}
                  />

                  <MetricCard
                    title="Difficulty"
                    value={data.difficulty}
                  />

                </div>

              </div>

            </div>

            {/* CHARTS */}

            <div className="
              grid
              grid-cols-1
              lg:grid-cols-2
              gap-6
              mt-6
            ">

              <PieChart
                languages={data.languages}
              />

              <LineChart
                commitTrend={
                  data.commitTrend || []
                }
              />

            </div>

            {/* COMPLEXITY */}

            <div className="mt-6">

              <BarChart
                complexity={data.complexity}
              />

            </div>
          </>
        )}
      </div>
    </div>
  );
}

function MetricCard({ title, value }) {
  return (
    <div className="
      bg-slate-800
      rounded-2xl
      p-4
    ">
      <div className="text-slate-400 text-sm">
        {title}
      </div>

      <div className="text-xl font-bold mt-2">
        {value}
      </div>
    </div>
  );
}