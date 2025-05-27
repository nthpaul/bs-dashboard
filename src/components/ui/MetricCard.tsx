import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  trend?: "up" | "down";
  trendValue?: string;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = React.memo(
  ({ title, value, subtitle, trend, trendValue, className = "" }) => {
    const formattedValue = React.useMemo(
      () => (typeof value === "number" ? value.toLocaleString() : value),
      [value]
    );

    return (
      <div
        className={`bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-200 hover:shadow-lg cursor-pointer ${className}`}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wide">
            {title}
          </h3>
          {trend && trendValue && (
            <div
              className={`flex items-center text-sm transition-colors ${
                trend === "up"
                  ? "text-red-400 hover:text-red-300"
                  : "text-green-400 hover:text-green-300"
              }`}
            >
              {trend === "up" ? (
                <TrendingUp className="w-4 h-4 mr-1 animate-pulse" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1 animate-pulse" />
              )}
              {trendValue}
            </div>
          )}
        </div>

        <div className="mb-1">
          <span className="text-3xl font-bold text-white transition-colors hover:text-blue-400">
            {formattedValue}
          </span>
        </div>

        <p className="text-gray-400 text-sm">{subtitle}</p>
      </div>
    );
  }
);

MetricCard.displayName = "MetricCard";
