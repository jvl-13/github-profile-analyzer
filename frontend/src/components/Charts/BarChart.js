export default function BarChartComponent({ complexity }) {
  const chartData = [
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
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#60a5fa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}