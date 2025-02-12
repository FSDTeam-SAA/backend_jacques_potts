import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EscrowTransactionList from "./EscrowTransactionList";
import type { EscrowTransaction } from "@/types/escrow";

const EscrowManagement = () => {
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['escrowTransactions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('escrow_transactions')
        .select(`
          *,
          buyer:profiles!buyer_id(*),
          seller:profiles!seller_id(*),
          listing:business_listings(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as EscrowTransaction[];
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Escrow Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Transactions</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="in_progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="disputed">Disputed</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <EscrowTransactionList 
              transactions={transactions}
              isLoading={isLoading}
            />
          </TabsContent>
          
          <TabsContent value="pending">
            <EscrowTransactionList 
              transactions={transactions.filter(t => t.status === 'pending')}
              isLoading={isLoading}
            />
          </TabsContent>

          <TabsContent value="in_progress">
            <EscrowTransactionList 
              transactions={transactions.filter(t => t.status === 'in_progress')}
              isLoading={isLoading}
            />
          </TabsContent>

          <TabsContent value="completed">
            <EscrowTransactionList 
              transactions={transactions.filter(t => t.status === 'completed')}
              isLoading={isLoading}
            />
          </TabsContent>

          <TabsContent value="disputed">
            <EscrowTransactionList 
              transactions={transactions.filter(t => t.status === 'disputed')}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EscrowManagement;