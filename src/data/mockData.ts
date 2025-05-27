import {
  DashboardData,
  NavItem,
  TimePeriod,
  TimePeriodOption,
} from "@/types/dashboard";

// Time period configurations
const TIME_PERIOD_CONFIGS = {
  "1H": { points: 60, intervalMinutes: 1, label: "1H" },
  "24H": { points: 48, intervalMinutes: 30, label: "24H" },
  "7D": { points: 168, intervalMinutes: 60, label: "7D" },
  "30D": { points: 120, intervalMinutes: 360, label: "30D" },
  "90D": { points: 90, intervalMinutes: 1440, label: "90D" },
};

// Generate realistic time series data based on time period
const generateTimeSeriesData = (
  baseValue: number,
  variance: number,
  timePeriod: TimePeriod = "24H"
) => {
  const config = TIME_PERIOD_CONFIGS[timePeriod];
  const data = [];
  const now = new Date();

  for (let i = config.points - 1; i >= 0; i--) {
    const timestamp = new Date(
      now.getTime() - i * config.intervalMinutes * 60 * 1000
    );

    // Add some realistic patterns based on time period
    let timeBasedMultiplier = 1;
    if (timePeriod === "1H") {
      // Simulate hourly patterns - slight variations
      const minute = timestamp.getMinutes();
      timeBasedMultiplier = 0.8 + Math.sin((minute / 60) * Math.PI * 2) * 0.3;
    } else if (timePeriod === "24H") {
      // Simulate daily patterns - lower activity during night hours
      const hour = timestamp.getHours();
      timeBasedMultiplier = hour >= 9 && hour <= 17 ? 1.3 : 0.6;
    } else if (timePeriod === "7D") {
      // Simulate weekly patterns - lower activity on weekends
      const dayOfWeek = timestamp.getDay();
      timeBasedMultiplier = dayOfWeek >= 1 && dayOfWeek <= 5 ? 1.2 : 0.7;
    } else if (timePeriod === "30D" || timePeriod === "90D") {
      // Simulate monthly patterns - some days have more activity
      const dayOfMonth = timestamp.getDate();
      timeBasedMultiplier =
        0.8 + Math.sin((dayOfMonth / 30) * Math.PI * 4) * 0.4;
    }

    const randomVariation = (Math.random() - 0.5) * variance;
    const value = Math.max(
      0,
      baseValue * timeBasedMultiplier + randomVariation
    );

    data.push({
      timestamp: timestamp.toISOString(),
      value: Math.round(value * 100) / 100,
    });
  }

  return data;
};

// Generate metrics based on time period
const generateMetricsForPeriod = (timePeriod: TimePeriod) => {
  const baseMetrics = {
    "1H": { totalJobs: 45, avgJobDuration: 185, failureRate: 12.5 },
    "24H": { totalJobs: 869, avgJobDuration: 190, failureRate: 18.07 },
    "7D": { totalJobs: 5420, avgJobDuration: 195, failureRate: 15.3 },
    "30D": { totalJobs: 23180, avgJobDuration: 188, failureRate: 16.8 },
    "90D": { totalJobs: 68540, avgJobDuration: 192, failureRate: 17.2 },
  };

  const metrics = baseMetrics[timePeriod];
  return {
    totalJobs: metrics.totalJobs,
    avgJobDuration: metrics.avgJobDuration,
    failureRate: metrics.failureRate,
    successRate: 100 - metrics.failureRate,
  };
};

// Generate job duration distribution based on time period
const generateJobDurationDistribution = (timePeriod: TimePeriod) => {
  const baseDistributions = {
    "1H": [12, 18, 8, 4, 2, 1, 0, 0, 0],
    "24H": [45, 120, 180, 220, 160, 90, 35, 15, 4],
    "7D": [280, 750, 1120, 1370, 1000, 560, 220, 95, 25],
    "30D": [1200, 3200, 4800, 5900, 4300, 2400, 940, 410, 110],
    "90D": [3600, 9600, 14400, 17700, 12900, 7200, 2820, 1230, 330],
  };

  const counts = baseDistributions[timePeriod];
  const durations = [
    "0-30s",
    "30-60s",
    "60-90s",
    "90-120s",
    "120-150s",
    "150-180s",
    "180-210s",
    "210-240s",
    "240s+",
  ];

  return durations.map((duration, index) => ({
    duration,
    count: counts[index],
    color: "#3b82f6",
  }));
};

// Generate performance metrics based on time period
const generatePerformanceMetrics = (timePeriod: TimePeriod) => {
  const baseMetrics = {
    "1H": [
      { name: "Memory", value: "45s", percentage: "72%" },
      { name: "CPU", value: "32s", percentage: "58%" },
      { name: "Disk", value: "12s", percentage: "28%" },
      { name: "Network", value: "28s", percentage: "45%" },
      { name: "I/O", value: "38s", percentage: "65%" },
    ],
    "24H": [
      { name: "Memory", value: "2m 45s", percentage: "78%" },
      { name: "CPU", value: "1m 23s", percentage: "65%" },
      { name: "Disk", value: "45s", percentage: "34%" },
      { name: "Network", value: "1m 12s", percentage: "58%" },
      { name: "I/O", value: "2m 1s", percentage: "82%" },
    ],
    "7D": [
      { name: "Memory", value: "18m 32s", percentage: "81%" },
      { name: "CPU", value: "9m 45s", percentage: "69%" },
      { name: "Disk", value: "5m 23s", percentage: "42%" },
      { name: "Network", value: "8m 17s", percentage: "63%" },
      { name: "I/O", value: "14m 8s", percentage: "85%" },
    ],
    "30D": [
      { name: "Memory", value: "1h 15m", percentage: "84%" },
      { name: "CPU", value: "42m 18s", percentage: "72%" },
      { name: "Disk", value: "23m 45s", percentage: "48%" },
      { name: "Network", value: "35m 22s", percentage: "67%" },
      { name: "I/O", value: "58m 33s", percentage: "88%" },
    ],
    "90D": [
      { name: "Memory", value: "3h 42m", percentage: "86%" },
      { name: "CPU", value: "2h 8m", percentage: "75%" },
      { name: "Disk", value: "1h 12m", percentage: "52%" },
      { name: "Network", value: "1h 45m", percentage: "70%" },
      { name: "I/O", value: "2h 55m", percentage: "90%" },
    ],
  };

  return baseMetrics[timePeriod];
};

// Generate dashboard data for a specific time period
export const generateDashboardData = (
  timePeriod: TimePeriod
): DashboardData => {
  return {
    metrics: generateMetricsForPeriod(timePeriod),
    jobDurationDistribution: generateJobDurationDistribution(timePeriod),
    charts: {
      jobsRuns: generateTimeSeriesData(45, 20, timePeriod),
      failureWave: generateTimeSeriesData(8, 6, timePeriod),
      p95Duration: generateTimeSeriesData(180, 40, timePeriod),
      p99Duration: generateTimeSeriesData(240, 60, timePeriod),
      storagePerformance: generateTimeSeriesData(85, 15, timePeriod),
      outputPerformance: generateTimeSeriesData(92, 12, timePeriod),
    },
    performanceMetrics: generatePerformanceMetrics(timePeriod),
  };
};

// Default dashboard data (24H period)
export const mockDashboardData: DashboardData = generateDashboardData("24H");

// Time period options
export const timePeriodOptions: TimePeriodOption[] = [
  { id: "1H", label: "1H", active: false },
  { id: "24H", label: "24H", active: true },
  { id: "7D", label: "7D", active: false },
  { id: "30D", label: "30D", active: false },
  { id: "90D", label: "90D", active: false },
];

export const navigationItems: NavItem[] = [
  {
    id: "feedback",
    label: "FEEDBACK",
    active: false,
  },
  {
    id: "actions-analytics",
    label: "Actions Analytics",
    active: true,
  },
  {
    id: "workflow-runs",
    label: "Workflow Runs",
    active: false,
  },
  {
    id: "docker-builds",
    label: "Docker Builds",
    active: false,
  },
  {
    id: "cache",
    label: "Cache",
    active: false,
  },
  {
    id: "study-risks",
    label: "Study Risks",
    active: false,
  },
  {
    id: "usage-billing",
    label: "Usage & Billing",
    active: false,
  },
  {
    id: "settings",
    label: "Settings",
    active: false,
  },
];
