import { useState } from "react";

import RepoInput from "./components/RepoInput";
import SummaryCard from "./components/SummaryCard";
import TechStack from "./components/TechStack";
import PieChart from "./components/Charts/PieChart";
import LineChart from "./components/Charts/LineChart";
import BarChart from "./components/Charts/BarChart";
import AnalysisCard from "./components/AnalysisCard";
import SimilarProjects from "./components/SimilarProjects";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (repoUrl) => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/api/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: repoUrl,
          }),
        }
      );

      const result = await response.json();
      
      //console.log(result);

      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-slate-950 min-h-screen text-white">

      <RepoInput onAnalyze={handleAnalyze} />

      {loading && (
        <div className="text-center py-20">
          Analyzing repository...
        </div>
      )}

      {!loading && data && (
        <>
          {/* TOP */}
          {/* </><div className="grid lg:grid-cols-10 gap-6 mt-6"> */}
          <div>
            <div className="lg:col-span-8">
              
              <SummaryCard
                repo={data.repo}
                summary={data.summary}
              />
            </div>

            {/* <div className="lg:col-span-2">
              <TechStack
                languages={data.languages}
              />
            </div> */}

          </div>

          {/* CHARTS */}
          <div className="grid lg:grid-cols-2 gap-6 mt-6">

            <PieChart
              languages={data.languages}
            />

            <LineChart
              commitTrend={
                  data?.commitTrend || []
              }
            />

          </div>

          {/* BAR */}
          <div className="mt-6">

            <BarChart
              complexity={data.complexity}
            />

          </div>

          {/* ANALYSIS */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

            <AnalysisCard
              title="Estimated LOC"
              value={data?.complexity?.estimatedLOC ?? "-"}
            />

            <AnalysisCard
              title="Files"
              value={data.complexity.totalFiles}
            />

            <AnalysisCard
              title="Largest File"
              value={`${data.complexity.largestFile} bytes`}
            />

            <AnalysisCard
              title="Difficulty"
              value="Intermediate → Advanced"
            />

          </div>

          <SimilarProjects
            summary={data.summary}
          />
        </>
      )}
    </div>
  );
}