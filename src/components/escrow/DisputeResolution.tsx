import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Shield } from "lucide-react";

interface DisputeResolutionProps {
  transactionId: string;
}

const DisputeResolution = ({ transactionId }: DisputeResolutionProps) => {
  const { toast } = useToast();
  const [description, setDescription] = useState("");
  const [disputeType, setDisputeType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: activeDispute, refetch } = useQuery({
    queryKey: ['escrowDispute', transactionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('escrow_disputes')
        .select('*')
        .eq('transaction_id', transactionId)
        .eq('status', 'pending')
        .maybeSingle();
      
      if (error) throw error;
      return data;
    }
  });

  const submitDispute = async () => {
    if (!description || !disputeType) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('escrow_disputes')
        .insert({
          transaction_id: transactionId,
          description,
          dispute_type: disputeType
        });

      if (error) throw error;

      toast({
        title: "Dispute Submitted",
        description: "Your dispute has been submitted and will be reviewed.",
      });

      setDescription("");
      setDisputeType("");
      refetch();
    } catch (error) {
      console.error('Error submitting dispute:', error);
      toast({
        title: "Error",
        description: "Failed to submit dispute. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Dispute Resolution
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activeDispute ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-amber-600">
              <AlertCircle className="h-5 w-5" />
              <p>Active dispute in progress</p>
            </div>
            <div className="bg-muted p-4 rounded-md">
              <p className="font-medium">Type: {activeDispute.dispute_type}</p>
              <p className="mt-2 text-sm text-muted-foreground">{activeDispute.description}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Select onValueChange={setDisputeType} value={disputeType}>
              <SelectTrigger>
                <SelectValue placeholder="Select dispute type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="payment">Payment Issue</SelectItem>
                <SelectItem value="milestone">Milestone Dispute</SelectItem>
                <SelectItem value="condition">Condition Not Met</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            <Textarea
              placeholder="Describe the issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />

            <Button 
              onClick={submitDispute} 
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Submitting..." : "Submit Dispute"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DisputeResolution;