import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import type { AssetFormData } from "../types";

interface EscrowSectionProps {
  form: UseFormReturn<AssetFormData>;
}

const EscrowSection = ({ form }: EscrowSectionProps) => {
  const { data: escrowProviders = [] } = useQuery({
    queryKey: ['escrowProviders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('escrow_providers')
        .select('*')
        .eq('status', 'active');
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Escrow Service</CardTitle>
        <CardDescription>
          Select an escrow service to secure the transaction
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="escrowProvider">Escrow Provider</Label>
            <Select
              onValueChange={(value) => form.setValue('escrowProviderId', value)}
              value={form.watch('escrowProviderId')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an escrow provider" />
              </SelectTrigger>
              <SelectContent>
                {escrowProviders.map((provider) => (
                  <SelectItem key={provider.id} value={provider.id}>
                    {provider.name} ({provider.commission_rate}% commission)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EscrowSection;