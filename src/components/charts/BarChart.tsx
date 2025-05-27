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
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

    const CustomTooltip = React.useCallback(
      ({
        active,
        payload,
        label,
      }: {
        active?: boolean;
        payload?: Array<{ value: number }>;
        label?: string;
      }) => {
        if (active && payload && payload.length) {
          return (
            <div className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 shadow-lg">
              <p className="text-gray-400 text-xs mb-1">{label}</p>
              <p className="text-white font-medium">{`${payload[0].value} jobs`}</p>
            </div>
          );
        }
        return null;
      },
      []
    );

    const handleMouseEnter = React.useCallback((_: unknown, index: number) => {
      setActiveIndex(index);
    }, []);

    const handleMouseLeave = React.useCallback(() => {
      setActiveIndex(null);
    }, []);

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
              onMouseLeave={handleMouseLeave}
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
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Bar
                dataKey="count"
                radius={[2, 2, 0, 0]}
                onMouseEnter={handleMouseEnter}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={activeIndex === index ? "#60A5FA" : "#3B82F6"}
                  />
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
