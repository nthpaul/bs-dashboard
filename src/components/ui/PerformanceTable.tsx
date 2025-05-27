import React from "react";
import { PerformanceMetric } from "@/types/dashboard";

interface PerformanceTableProps {
  metrics: PerformanceMetric[];
  title: string;
}

export const PerformanceTable: React.FC<PerformanceTableProps> = ({
  metrics,
  title,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 h-full">
      <h3 className="text-white text-lg font-semibold mb-6">{title}</h3>

      <div className="space-y-4">
        <div className="grid grid-cols-5 gap-3 text-gray-400 text-xs font-medium uppercase tracking-wide border-b border-gray-700 pb-3">
          <span>RESOURCE/METRIC</span>
          <span>LOG</span>
          <span>POPULAR</span>
          <span>SLOW</span>
          <span>VERY SLOW</span>
        </div>

        {metrics.map((metric, index) => (
          <div
            key={index}
            className="grid grid-cols-5 gap-3 text-sm py-2 hover:bg-gray-700 rounded transition-colors"
          >
            <span className="text-white font-medium">{metric.name}</span>
            <span className="text-gray-300">{metric.value}</span>
            <span className="text-gray-300">{metric.percentage}</span>
            <span className="text-gray-300">{metric.percentage}</span>
            <span className="text-gray-300">{metric.percentage}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
