import React from "react";

export default function AnalysisCard({ title, value, description }) {
  return (
    <div className="bg-slate-900 p-5 rounded-xl">
      <h4 className="text-sm text-gray-400">{title}</h4>
      <p className="text-lg mt-2">{value}</p>
      {description && (
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      )}
    </div>
  );
}