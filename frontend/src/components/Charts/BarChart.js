import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "Complexity", value: 7.5 },
  { name: "Maintainability", value: 6.5 },
  { name: "Dependencies", value: 6 }
];

export default function BarChartComponent() {
  return (
    <div className="bg-slate-900 p-6 rounded-2xl h-[300px] lg:col-span-2">
      <h3 className="mb-2">Complexity Metrics</h3>

      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}