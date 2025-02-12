import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Check, X } from "lucide-react";
import type { EscrowTransaction, EscrowMilestone, EscrowCondition } from "@/types/escrow";
import EscrowStatusBadge from "./EscrowStatusBadge";
import EscrowMilestoneList from "./EscrowMilestoneList";
import DisputeResolution from "./DisputeResolution";

interface EscrowTransactionDetailsProps {
  transaction: EscrowTransaction;
}

const EscrowTransactionDetails = ({ transaction }: EscrowTransactionDetailsProps) => {
  const { data: milestones = [] } = useQuery({
    queryKey: ['escrowMilestones', transaction.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('escrow_milestones')
        .select('*')
        .eq('transaction_id', transaction.id)
        .order('created_at');
      
      if (error) throw error;
      return data as EscrowMilestone[];
    }
  });

  const { data: conditions = [] } = useQuery({
    queryKey: ['escrowConditions', transaction.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('escrow_conditions')
        .select('*')
        .eq('transaction_id', transaction.id)
        .order('created_at');
      
      if (error) throw error;
      return data as EscrowCondition[];
    }
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium">Amount</h3>
              <p>${transaction.amount.toLocaleString()}</p>
            </div>
            <div>
              <h3 className="font-medium">Status</h3>
              <EscrowStatusBadge status={transaction.status} />
            </div>
            <div>
              <h3 className="font-medium">Created</h3>
              <p>{format(new Date(transaction.created_at), 'PPP')}</p>
            </div>
            <div>
              <h3 className="font-medium">Last Action</h3>
              <p>{transaction.last_action_at ? format(new Date(transaction.last_action_at), 'PPP') : 'N/A'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <EscrowMilestoneList 
        transactionId={transaction.id} 
        totalAmount={transaction.amount}
      />

      <Card>
        <CardHeader>
          <CardTitle>Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conditions.map((condition) => (
              <div key={condition.id} className="flex items-center justify-between border-b pb-4">
                <div>
                  <h4 className="font-medium">{condition.description}</h4>
                  <p className="text-sm text-muted-foreground">
                    Type: {condition.condition_type}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={condition.status === 'verified' ? 'default' : 'outline'}>
                    {condition.status}
                  </Badge>
                  {condition.status === 'verified' && (
                    <Check className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <DisputeResolution transactionId={transaction.id} />

      {transaction.status === 'in_progress' && (
        <div className="flex justify-end gap-4">
          <Button variant="outline">Dispute Transaction</Button>
          <Button>Release Funds</Button>
        </div>
      )}
    </div>
  );
};

export default EscrowTransactionDetails;