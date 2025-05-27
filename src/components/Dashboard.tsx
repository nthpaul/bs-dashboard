"use client";

import React from "react";
import { Header } from "./layout/Header";
import { Sidebar } from "./layout/Sidebar";
import { MetricCard } from "./ui/MetricCard";
import { BarChartComponent } from "./charts/BarChart";
import { LineChartComponent } from "./charts/LineChart";
import { PerformanceTable } from "./ui/PerformanceTable";
import { DashboardData, NavItem } from "@/types/dashboard";

interface DashboardProps {
  data: DashboardData;
  navigationItems: NavItem[];
}

export const Dashboard: React.FC<DashboardProps> = React.memo(
  ({ data, navigationItems }) => {
    const { metrics, jobDurationDistribution, charts, performanceMetrics } =
      data;
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    const handleMenuClick = React.useCallback(() => {
      setSidebarOpen(true);
    }, []);

    const handleSidebarClose = React.useCallback(() => {
      setSidebarOpen(false);
    }, []);

    return (
      <div className="min-h-screen bg-gray-900">
        <Header onMenuClick={handleMenuClick} />

        <div className="flex">
          <Sidebar
            navigationItems={navigationItems}
            isOpen={sidebarOpen}
            onClose={handleSidebarClose}
          />

          <main className="flex-1 p-4 lg:p-6 lg:ml-0">
            {/* Top Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <MetricCard
                title="Total Jobs"
                value={metrics.totalJobs}
                subtitle="TOTAL JOBS"
                trend="up"
                trendValue="+12.5%"
              />
              <MetricCard
                title="Avg Job Duration"
                value={`${metrics.avgJobDuration}s`}
                subtitle="AVG JOB DURATION"
                trend="down"
                trendValue="-8.3%"
              />
              <MetricCard
                title="Failure Rate"
                value={`${metrics.failureRate}%`}
                subtitle="FAILURE RATE"
                trend="up"
                trendValue="+2.1%"
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-6">
              {/* Job Duration Distribution */}
              <div className="xl:col-span-2">
                <BarChartComponent
                  data={jobDurationDistribution}
                  title="Job Duration Distribution"
                  subtitle="No repositories selected"
                />
              </div>

              {/* Performance Table */}
              <div className="xl:col-span-2">
                <PerformanceTable
                  metrics={performanceMetrics}
                  title="Performance Metrics"
                />
              </div>
            </div>

            {/* Time Series Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <LineChartComponent
                data={charts.jobsRuns}
                title="Jobs Runs"
                subtitle="Total minutes (anomalies)"
                color="#3B82F6"
              />
              <LineChartComponent
                data={charts.failureWave}
                title="Failure Wave"
                subtitle="Total minutes (anomalies)"
                color="#DC2626"
              />
              <LineChartComponent
                data={charts.p95Duration}
                title="P95 Duration"
                subtitle="Total minutes (anomalies)"
                color="#F59E0B"
              />
              <LineChartComponent
                data={charts.p99Duration}
                title="P99 Duration"
                subtitle="Total minutes (anomalies)"
                color="#8B5CF6"
              />
              <LineChartComponent
                data={charts.storagePerformance}
                title="Storage Performance"
                subtitle="Total minutes (anomalies)"
                color="#10B981"
              />
              <LineChartComponent
                data={charts.outputPerformance}
                title="Output Performance"
                subtitle="Total minutes (anomalies)"
                color="#06B6D4"
              />
            </div>
          </main>
        </div>
      </div>
    );
  }
);

Dashboard.displayName = "Dashboard";
