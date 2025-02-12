import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface EscrowServiceProps {
  listingId: string;
  sellerId: string;
  propertyPrice: number;
}

const EscrowService = ({ listingId, sellerId, propertyPrice }: EscrowServiceProps) => {
  const { toast } = useToast();
  const [isInitiating, setIsInitiating] = useState(false);

  const initiateEscrow = async () => {
    setIsInitiating(true);
    try {
      const { data: provider } = await supabase
        .from("escrow_providers")
        .select("*")
        .eq("status", "active")
        .single();

      if (!provider) throw new Error("No active escrow provider found");

      const { error } = await supabase
        .from("escrow_transactions")
        .insert({
          listing_id: listingId,
          seller_id: sellerId,
          provider_id: provider.id,
          amount: propertyPrice,
          status: "pending"
        });

      if (error) throw error;

      toast({
        title: "Escrow Initiated",
        description: "The escrow process has been started successfully.",
      });
    } catch (error) {
      console.error('Error initiating escrow:', error);
      toast({
        title: "Error",
        description: "Failed to initiate escrow. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsInitiating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Escrow Service
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Secure Transaction</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Verified Escrow Provider</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Protected Payment</span>
          </div>
        </div>
        <Button 
          onClick={initiateEscrow} 
          disabled={isInitiating}
          className="w-full"
        >
          {isInitiating ? "Initiating..." : "Start Escrow Process"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default EscrowService;