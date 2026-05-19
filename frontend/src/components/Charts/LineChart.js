import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "Jan", commits: 200 },
  { name: "Feb", commits: 400 },
  { name: "Mar", commits: 300 },
  { name: "Apr", commits: 600 },
  { name: "May", commits: 500 }
];

export default function LineChartComponent() {
  return (
    <div className="bg-slate-900 p-6 rounded-2xl h-[300px]">
      <h3 className="mb-2">Commit Activity</h3>

      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="commits" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}