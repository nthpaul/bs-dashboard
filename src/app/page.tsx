"use client";

import { Dashboard } from "@/components/Dashboard";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { useDashboardData } from "@/hooks/useDashboardData";

export default function Home() {
  const { data, navigationItems, loading, error } = useDashboardData();

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Error Loading Dashboard
          </h1>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return <LoadingSkeleton />;
  }

  return <Dashboard data={data} navigationItems={navigationItems} />;
}
