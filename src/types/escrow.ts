export type EscrowStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'disputed';

export interface EscrowMilestone {
  id: string;
  transaction_id: string;
  milestone_type: string;
  description: string;
  amount: number;
  due_date?: string;
  status: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface EscrowCondition {
  id: string;
  transaction_id: string;
  condition_type: string;
  description: string;
  required_proof?: string;
  status: string;
  verified_by?: string;
  verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface EscrowTransaction {
  id: string;
  listing_id: string;
  buyer_id: string;
  seller_id: string;
  provider_id?: string;
  amount: number;
  status: EscrowStatus;
  payment_details?: Record<string, any>;
  commission_amount?: number;
  release_conditions?: string[];
  dispute_details?: Record<string, any>;
  completed_at?: string;
  workflow_stage: string;
  conditions_met: Record<string, any>[];
  required_approvals: Record<string, any>[];
  approval_status: Record<string, any>;
  release_schedule?: Record<string, any>;
  last_action_at: string;
  next_action_deadline?: string;
  created_at: string;
  updated_at: string;
  listing?: {
    business_name: string;
    // Add other listing fields as needed
  };
  buyer?: {
    full_name: string | null;
    email: string | null;
  };
  seller?: {
    full_name: string | null;
    email: string | null;
  };
}

export interface EscrowProvider {
  id: string;
  name: string;
  provider_type: string;
  commission_rate: number | null;
  status: 'active' | 'inactive' | 'suspended';
  created_at: string;
  updated_at: string;
}