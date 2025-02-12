import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const NativeLenderDashboard = () => {
  const { data: lenders, isLoading } = useQuery({
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

  const { data: applications } = useQuery({
    queryKey: ["loan-applications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("loan_applications")
        .select(`
          *,
          financing_providers (name),
          business_listings (business_name)
        `);
      
      if (error) throw error;
      return data;
    }
  });

  const handleApply = async (providerId: string) => {
    try {
      const { error } = await supabase
        .from("loan_applications")
        .insert({
          provider_id: providerId,
          status: "pending",
          loan_amount: 0, // Will be set in the form
          loan_term: 0 // Will be set in the form
        });

      if (error) throw error;
      toast.success("Loan application started successfully");
    } catch (error) {
      console.error("Error starting loan application:", error);
      toast.error("Failed to start loan application");
    }
  };

  if (isLoading) {
    return <div>Loading lenders...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Financing Options</h2>
        <Button variant="outline">
          <DollarSign className="mr-2 h-4 w-4" />
          View My Applications
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lenders?.map((lender) => (
          <Card key={lender.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  {lender.name}
                </CardTitle>
                <Badge>{lender.provider_type}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm space-y-2">
                  <p>Interest Rate: {lender.interest_rate_range?.lower}% - {lender.interest_rate_range?.upper}%</p>
                  <p>Minimum Credit Score: {lender.minimum_credit_score}</p>
                  <p>Processing Time: {lender.processing_time_days} days</p>
                  <p>Success Rate: {lender.success_rate}%</p>
                </div>
                <Button 
                  onClick={() => handleApply(lender.id)}
                  className="w-full"
                >
                  Apply Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {applications && applications.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">My Applications</h3>
          <div className="space-y-4">
            {applications.map((app) => (
              <Card key={app.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">{app.business_listings?.business_name}</p>
                    <p className="text-sm text-muted-foreground">
                      Lender: {app.financing_providers?.name}
                    </p>
                  </div>
                  <Badge>{app.status}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NativeLenderDashboard;