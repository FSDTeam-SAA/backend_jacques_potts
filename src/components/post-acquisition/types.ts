export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  due_date: string;
  business_id: string;
}

export interface Metric {
  id: string;
  business_id: string;
  metric_name: string;
  metric_value: number;
  target_value?: number;
  measurement_date: string;
}