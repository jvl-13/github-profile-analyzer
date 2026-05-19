import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "TypeScript", value: 57 },
  { name: "JavaScript", value: 25 },
  { name: "CSS", value: 8 },
  { name: "Other", value: 10 },
];

const COLORS = ["#3B82F6", "#FACC15", "#22C55E", "#EF4444"];

export default function PieChartComponent() {
  return (
    <div className="bg-slate-900 p-6 rounded-2xl h-[350px] text-white">
      <h3 className="mb-4 text-xl font-semibold">
        Language Distribution
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "10px",
              color: "white",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}