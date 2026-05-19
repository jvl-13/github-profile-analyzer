import React from "react";
import { motion } from "framer-motion";

export default function SimilarProjects() {
  return (
    <div className="mt-10">
      <h3 className="mb-4 font-semibold">Similar Projects</h3>

      <div className="flex gap-4 overflow-x-auto">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            key={i}
            className="min-w-[220px] bg-slate-900 p-4 rounded-xl"
          >
            <h4 className="font-medium">project-{i}</h4>
            <p className="text-sm text-gray-400">Short description</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}