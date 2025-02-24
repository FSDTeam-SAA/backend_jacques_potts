import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  status: "completed" | "pending" | "failed";
}

const BillingSection = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // const { data: transactions = [] } = useQuery({
  //   queryKey: ["transactions", user?.id],
  //   queryFn: async () => {
  //     const { data, error } = await supabase
  //       .from("premium_feature_usage")
  //       .select("*")
  //       .eq("user_id", user?.id)
  //       .order("created_at", { ascending: false });

  //     if (error) throw error;

  //     return data.map((t): Transaction => ({
  //       id: t.id,
  //       date: t.created_at,
  //       amount: t.payment_amount,
  //       description: `${t.feature_type.replace(/_/g, ' ')} ${t.expires_at ? '(1 hour)' : ''}`,
  //       status: t.payment_status,
  //     }));
  //   },
  //   enabled: !!user,
  // });

  const { data: transactions = [] } = useQuery({
    queryKey: ["transactions", user?.id],
    queryFn: async () => {
      console.log("Fetching transactions for user_________:", user?.id);
      
      const { data, error } = await supabase
        .from("premium_feature_usage")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });
  
      if (error) {
        console.error("Supabase Error:", error);
        throw error;
      }
  
      console.log("Fetched transactions__________________________:", data);
  
      return data.map((t) => ({
        id: t.id,
        date: t.created_at,
        amount: t.payment_amount,
        description: `${t.feature_type?.replace(/_/g, ' ') ?? "Unknown Feature"} ${t.expires_at ? '(1 hour)' : ''}`,
        status: t.payment_status,
      }));
    },
    enabled: !!user,
  });

  
  const handleAddPaymentMethod = async () => {
    setIsLoading(true);
    try {
      const response = await supabase.functions.invoke('create-checkout-session', {
        body: { featureType: 'setup_intent' },
      });

      if (response.error) throw response.error;
      if (!response.data?.url) throw new Error('No checkout URL received');

      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Failed to set up payment method');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Payment Methods</CardTitle>
          <CardDescription>
            Manage your payment methods and billing preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button 
              className="w-full"
              onClick={handleAddPaymentMethod}
              disabled={isLoading}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              {isLoading ? "Setting up..." : "Add Payment Method"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Transaction History</CardTitle>
          <CardDescription>
            View your recent transactions and payment history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No transactions yet
              </p>
            ) : (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${transaction.amount}</p>
                      <p className="text-sm capitalize text-muted-foreground">
                        {transaction.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingSection;