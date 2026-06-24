import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function BarChartComponent({ complexity }) {
  const data = [
    {
      name: "Files",
      value: complexity.totalFiles,
    },
    {
      name: "LOC",
      value: complexity.estimatedLOC,
    },
    {
      name: "Largest",
      value: complexity.largestFile,
    },
  ];

  return (
    <div className="bg-slate-900 rounded-3xl p-6">
      <h2 className="text-xl font-bold mb-4">Complexity</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#60a5fa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}