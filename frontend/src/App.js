import RepoInput from "./components/RepoInput";
import SummaryCard from "./components/SummaryCard";
import TechStack from "./components/TechStack";
import PieChart from "./components/Charts/PieChart";
import LineChart from "./components/Charts/LineChart";
import BarChart from "./components/Charts/BarChart";
import AnalysisCard from "./components/AnalysisCart";
import SimilarProjects from "./components/SimilarProjects";

export default function App() {
  return (
    <div className="p-6 bg-slate-950 min-h-screen text-white">
      <RepoInput />

      {/* TOP SECTION */}
      <div className="grid lg:grid-cols-10 gap-6 mt-6">
        <div className="lg:col-span-8">
          <SummaryCard />
        </div>

        <div className="lg:col-span-2">
          <TechStack />
        </div>
      </div>

      {/* CHART SECTION */}
      <div className="grid lg:grid-cols-2 gap-6 mt-6 items-stretch">
        <div className="h-[350px]">
          <PieChart />
        </div>

        <div className="h-[350px]">
          <LineChart />
        </div>
      </div>

      {/* BAR CHART */}
      <div className="mt-6">
        <BarChart />
      </div>

      {/* ANALYSIS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <AnalysisCard title="Complexity" value="7.5 / 10" />
        <AnalysisCard title="Learning" value="Intermediate → Advanced" />
        <AnalysisCard title="Architecture" value="Monorepo" />
        <AnalysisCard title="Risks" value="High dependencies" />
      </div>

      <SimilarProjects />
    </div>
  );
}