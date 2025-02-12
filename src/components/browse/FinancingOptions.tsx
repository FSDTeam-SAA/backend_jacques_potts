import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface FinancingOptionsProps {
  propertyPrice: number;
}

const FinancingOptions = ({ propertyPrice }: FinancingOptionsProps) => {
  const { data: providers } = useQuery({
    queryKey: ["financing-providers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("financing_providers")
        .select("*")
        .eq("status", "active");
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Financing Options
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {providers?.map((provider) => (
            <div key={provider.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{provider.name}</h3>
                <Badge>{provider.provider_type}</Badge>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Interest Rate: {provider.interest_rate_range?.toString()}</p>
                <p>Minimum Credit Score: {provider.minimum_credit_score}</p>
              </div>
              <Button className="mt-4 w-full">Contact Lender</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancingOptions;