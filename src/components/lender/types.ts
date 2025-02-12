export interface LenderProvider {
  id: string;
  name: string;
  provider_type: string;
  interest_rate_range: {
    lower: number;
    upper: number;
  };
  minimum_credit_score: number;
  processing_time_days: number;
  status: string;
}