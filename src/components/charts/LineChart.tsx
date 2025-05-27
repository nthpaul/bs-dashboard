"use client";

import React from "react";
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";
import { TimeSeriesDataPoint } from "@/types/dashboard";

interface LineChartComponentProps {
  data: TimeSeriesDataPoint[];
  title: string;
  subtitle?: string;
  color?: string;
}

export const LineChartComponent: React.FC<LineChartComponentProps> = React.memo(
  ({ data, title, subtitle, color = "#3B82F6" }) => {
    // Format data for recharts
    const chartData = React.useMemo(
      () =>
        data.map((point, index) => ({
          ...point,
          index,
        })),
      [data]
    );

    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="mb-4">
          <h3 className="text-white text-lg font-semibold">{title}</h3>
          {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
        </div>

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient
                  id={`gradient-${color.replace("#", "")}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="index"
                axisLine={false}
                tickLine={false}
                tick={false}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                domain={["dataMin - 5", "dataMax + 5"]}
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
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                fill={`url(#gradient-${color.replace("#", "")})`}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: color,
                  strokeWidth: 2,
                  stroke: "#fff",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
);

LineChartComponent.displayName = "LineChartComponent";
