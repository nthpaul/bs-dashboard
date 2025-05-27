"use client";

import { useState, useEffect, useCallback } from "react";
import {
  DashboardData,
  NavItem,
  TimePeriod,
  TimePeriodOption,
} from "@/types/dashboard";
import {
  generateDashboardData,
  navigationItems,
  timePeriodOptions,
} from "@/data/mockData";

interface UseDashboardDataReturn {
  data: DashboardData | null;
  navigationItems: NavItem[];
  timePeriods: TimePeriodOption[];
  selectedPeriod: TimePeriod;
  loading: boolean;
  error: string | null;
  onPeriodChange: (period: TimePeriod) => void;
}

export const useDashboardData = (): UseDashboardDataReturn => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("24H");
  const [timePeriods, setTimePeriods] =
    useState<TimePeriodOption[]>(timePeriodOptions);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async (period: TimePeriod) => {
    try {
      setLoading(true);
      setError(null);

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Generate data for the selected time period
      const newData = generateDashboardData(period);
      setData(newData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load dashboard data"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const onPeriodChange = useCallback(
    (period: TimePeriod) => {
      setSelectedPeriod(period);

      // Update the active state of time periods
      setTimePeriods((prev) =>
        prev.map((tp) => ({
          ...tp,
          active: tp.id === period,
        }))
      );

      // Load new data for the selected period
      loadData(period);
    },
    [loadData]
  );

  useEffect(() => {
    // Load initial data
    loadData(selectedPeriod);
  }, [loadData, selectedPeriod]);

  return {
    data,
    navigationItems,
    timePeriods,
    selectedPeriod,
    loading,
    error,
    onPeriodChange,
  };
};
