import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

interface EscrowMilestone {
  id: string;
  description: string;
  amount: number;
  due_date: string | null;
  status: string;
  completed_at: string | null;
}

interface EscrowMilestoneListProps {
  transactionId: string;
  totalAmount: number;
}

const EscrowMilestoneList = ({ transactionId, totalAmount }: EscrowMilestoneListProps) => {
  const { data: milestones = [], isLoading } = useQuery({
    queryKey: ['escrowMilestones', transactionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('escrow_milestones')
        .select('*')
        .eq('transaction_id', transactionId)
        .order('created_at');
      
      if (error) throw error;
      return data as EscrowMilestone[];
    }
  });

  const completedAmount = milestones
    .filter(m => m.status === 'completed')
    .reduce((sum, m) => sum + m.amount, 0);

  const progress = (completedAmount / totalAmount) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          Escrow Milestones
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">
            ${completedAmount.toLocaleString()} of ${totalAmount.toLocaleString()} released
          </p>
        </div>
        
        <div className="space-y-4">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="flex items-center justify-between border-b pb-4">
              <div>
                <h4 className="font-medium">{milestone.description}</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {milestone.due_date ? (
                    <span>Due: {format(new Date(milestone.due_date), 'PPP')}</span>
                  ) : (
                    <span>No deadline set</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-medium">${milestone.amount.toLocaleString()}</span>
                <Badge variant={milestone.status === 'completed' ? 'default' : 'outline'}>
                  {milestone.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EscrowMilestoneList;