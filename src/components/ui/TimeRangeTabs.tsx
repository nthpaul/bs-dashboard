"use client";

import React from "react";
import { TimePeriod, TimePeriodOption } from "@/types/dashboard";

interface TimeRangeTabsProps {
  timePeriods: TimePeriodOption[];
  selectedPeriod: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
  loading?: boolean;
}

export const TimeRangeTabs: React.FC<TimeRangeTabsProps> = React.memo(
  ({ timePeriods, selectedPeriod, onPeriodChange, loading = false }) => {
    return (
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-1 bg-gray-800 rounded-lg p-1">
          {timePeriods.map((period) => (
            <button
              key={period.id}
              onClick={() => !loading && onPeriodChange(period.id)}
              disabled={loading}
              className={`
                px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 min-w-[60px] relative
                ${
                  selectedPeriod === period.id
                    ? "bg-blue-600 text-white shadow-lg transform scale-105"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                }
                ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              {loading && selectedPeriod === period.id && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <span
                className={
                  loading && selectedPeriod === period.id ? "opacity-0" : ""
                }
              >
                {period.label}
              </span>
            </button>
          ))}
        </div>

        <div className="text-gray-400 text-sm">
          Showing data for the last {selectedPeriod.toLowerCase()}
        </div>
      </div>
    );
  }
);

TimeRangeTabs.displayName = "TimeRangeTabs";
