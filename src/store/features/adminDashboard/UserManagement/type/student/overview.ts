interface DashboardMetric {
  title: string;
  total: number;
  change: number;
  period: string;
  trend: "increase" | "decrease";
}

export interface DashboardResponse {
  students: DashboardMetric;
  mentors: DashboardMetric;
}
