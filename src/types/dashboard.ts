export interface JobMetrics {
  totalJobs: number;
  avgJobDuration: number;
  failureRate: number;
  successRate: number;
}

export interface TimeSeriesDataPoint {
  timestamp: string;
  value: number;
}

export interface JobDurationDistribution {
  duration: string;
  count: number;
  color: string;
}

export interface PerformanceMetric {
  name: string;
  value: string;
  percentage: string;
}

export interface ChartData {
  jobsRuns: TimeSeriesDataPoint[];
  failureWave: TimeSeriesDataPoint[];
  p95Duration: TimeSeriesDataPoint[];
  p99Duration: TimeSeriesDataPoint[];
  storagePerformance: TimeSeriesDataPoint[];
  outputPerformance: TimeSeriesDataPoint[];
}

export interface DashboardData {
  metrics: JobMetrics;
  jobDurationDistribution: JobDurationDistribution[];
  charts: ChartData;
  performanceMetrics: PerformanceMetric[];
}

export interface NavItem {
  id: string;
  label: string;
  icon?: string;
  active?: boolean;
  children?: NavItem[];
}

export type TimePeriod = "1H" | "24H" | "7D" | "30D" | "90D";

export interface TimePeriodOption {
  id: TimePeriod;
  label: string;
  active: boolean;
}
