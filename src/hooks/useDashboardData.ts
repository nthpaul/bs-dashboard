"use client";

import { useState, useEffect } from "react";
import { DashboardData, NavItem } from "@/types/dashboard";
import { mockDashboardData, navigationItems } from "@/data/mockData";

interface UseDashboardDataReturn {
  data: DashboardData | null;
  navigationItems: NavItem[];
  loading: boolean;
  error: string | null;
}

export const useDashboardData = (): UseDashboardDataReturn => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call with loading delay
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 300));

        // In a real app, this would be an API call
        setData(mockDashboardData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load dashboard data"
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    data,
    navigationItems,
    loading,
    error,
  };
};
