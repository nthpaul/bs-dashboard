"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import { JobDurationDistribution } from "@/types/dashboard";

interface BarChartComponentProps {
  data: JobDurationDistribution[];
  title: string;
  subtitle?: string;
}

export const BarChartComponent: React.FC<BarChartComponentProps> = React.memo(
  ({ data, title, subtitle }) => {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="mb-4">
          <h3 className="text-white text-lg font-semibold">{title}</h3>
          {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis
                dataKey="duration"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#374151",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                labelStyle={{ color: "#9CA3AF" }}
              />
              <Bar dataKey="count" radius={[2, 2, 0, 0]}>
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill="#3B82F6" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
);

BarChartComponent.displayName = "BarChartComponent";
