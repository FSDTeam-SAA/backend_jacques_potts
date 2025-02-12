import { IntegrationButton } from "../IntegrationButton";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface TaxComplianceIntegrationsProps {
  handleIntegrationClick: (key: string) => void;
}

export const TaxComplianceIntegrations = ({
  handleIntegrationClick,
}: TaxComplianceIntegrationsProps) => {
  const { toast } = useToast();

  const handleIRSIntegration = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please log in to verify your IRS Tax Transcript.",
          variant: "destructive",
        });
        return;
      }

      console.log("Initiating IRS Tax Transcript verification");
      const { data, error } = await supabase.functions.invoke('business-integrations', {
        body: { 
          integration_type: 'irs',
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) {
        console.error("IRS integration error:", error);
        throw error;
      }

      console.log("IRS integration response:", data);

      if (data?.authUrl) {
        window.location.href = data.authUrl;
      }

      handleIntegrationClick('irs');
    } catch (error) {
      console.error('IRS integration error:', error);
      toast({
        title: "Integration Failed",
        description: "There was an error connecting to IRS. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-3">
      <h5 className="text-sm font-medium text-muted-foreground">Tax & Compliance</h5>
      <IntegrationButton
        label="IRS Tax Transcript Verification"
        integrationKey="irs"
        onClick={handleIRSIntegration}
      />
    </div>
  );
};