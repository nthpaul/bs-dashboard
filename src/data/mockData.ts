import { DashboardData, NavItem } from '@/types/dashboard';

// Generate realistic time series data
const generateTimeSeriesData = (baseValue: number, variance: number, points: number = 50) => {
  const data = [];
  const now = new Date();
  
  for (let i = points - 1; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 30 * 60 * 1000); // 30 min intervals
    const randomVariation = (Math.random() - 0.5) * variance;
    const value = Math.max(0, baseValue + randomVariation);
    
    data.push({
      timestamp: timestamp.toISOString(),
      value: Math.round(value * 100) / 100
    });
  }
  
  return data;
};

export const mockDashboardData: DashboardData = {
  metrics: {
    totalJobs: 869,
    avgJobDuration: 190,
    failureRate: 18.07,
    successRate: 81.93
  },
  
  jobDurationDistribution: [
    { duration: '0-30s', count: 45, color: '#3b82f6' },
    { duration: '30-60s', count: 120, color: '#3b82f6' },
    { duration: '60-90s', count: 180, color: '#3b82f6' },
    { duration: '90-120s', count: 220, color: '#3b82f6' },
    { duration: '120-150s', count: 160, color: '#3b82f6' },
    { duration: '150-180s', count: 90, color: '#3b82f6' },
    { duration: '180-210s', count: 35, color: '#3b82f6' },
    { duration: '210-240s', count: 15, color: '#3b82f6' },
    { duration: '240s+', count: 4, color: '#3b82f6' }
  ],
  
  charts: {
    jobsRuns: generateTimeSeriesData(45, 20),
    failureWave: generateTimeSeriesData(8, 6),
    p95Duration: generateTimeSeriesData(180, 40),
    p99Duration: generateTimeSeriesData(240, 60),
    storagePerformance: generateTimeSeriesData(85, 15),
    outputPerformance: generateTimeSeriesData(92, 12)
  },
  
  performanceMetrics: [
    { name: 'Memory', value: '2m 45s', percentage: '78%' },
    { name: 'CPU', value: '1m 23s', percentage: '65%' },
    { name: 'Disk', value: '45s', percentage: '34%' },
    { name: 'Network', value: '1m 12s', percentage: '58%' },
    { name: 'I/O', value: '2m 1s', percentage: '82%' }
  ]
};

export const navigationItems: NavItem[] = [
  {
    id: 'feedback',
    label: 'FEEDBACK',
    active: false
  },
  {
    id: 'actions-analytics',
    label: 'Actions Analytics',
    active: true
  },
  {
    id: 'workflow-runs',
    label: 'Workflow Runs',
    active: false
  },
  {
    id: 'docker-builds',
    label: 'Docker Builds',
    active: false
  },
  {
    id: 'cache',
    label: 'Cache',
    active: false
  },
  {
    id: 'study-risks',
    label: 'Study Risks',
    active: false
  },
  {
    id: 'usage-billing',
    label: 'Usage & Billing',
    active: false
  },
  {
    id: 'settings',
    label: 'Settings',
    active: false
  }
];
