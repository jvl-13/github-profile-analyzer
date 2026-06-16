export default function BarChartComponent({
  complexity,
}) {

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
      value:
        complexity.largestFile,
    },
  ];}