import { IntegrationButton } from "../IntegrationButton";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface PayrollHRIntegrationsProps {
  handleIntegrationClick: (key: string) => void;
}

export const PayrollHRIntegrations = ({
  handleIntegrationClick,
}: PayrollHRIntegrationsProps) => {
  const { toast } = useToast();

  const handleGustoIntegration = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please log in to connect your Gusto account.",
          variant: "destructive",
        });
        return;
      }

      console.log("Initiating Gusto integration");
      const { data, error } = await supabase.functions.invoke('business-integrations', {
        body: { 
          integration_type: 'gusto',
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) {
        console.error("Gusto integration error:", error);
        throw error;
      }

      console.log("Gusto integration response:", data);

      if (data?.authUrl) {
        window.location.href = data.authUrl;
      }

      handleIntegrationClick('gusto');
    } catch (error) {
      console.error('Gusto integration error:', error);
      toast({
        title: "Integration Failed",
        description: "There was an error connecting to Gusto. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-3">
      <h5 className="text-sm font-medium text-muted-foreground">Payroll & HR</h5>
      <IntegrationButton
        label="Connect Gusto"
        integrationKey="gusto"
        onClick={handleGustoIntegration}
      />
    </div>
  );
};