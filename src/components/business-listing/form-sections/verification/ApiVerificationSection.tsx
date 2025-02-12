import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FinancialIntegrations } from "./integration-sections/FinancialIntegrations";
import { BusinessManagementIntegrations } from "./integration-sections/BusinessManagementIntegrations";
import { CreditRiskIntegrations } from "./integration-sections/CreditRiskIntegrations";
import { PayrollHRIntegrations } from "./integration-sections/PayrollHRIntegrations";
import { TaxComplianceIntegrations } from "./integration-sections/TaxComplianceIntegrations";
import { OnlinePresenceIntegrations } from "./integration-sections/OnlinePresenceIntegrations";
import { UseFormReturn } from "react-hook-form";
import { BusinessListingFormData } from "../../schema";
import { useQuery } from "@tanstack/react-query";
import { IntegrationSection } from "./IntegrationSection";
import { ConnectionsList } from "./sync/ConnectionsList";

interface ApiVerificationSectionProps {
  connectedApis: string[];
  setConnectedApis: (apis: string[]) => void;
  onVerificationComplete: () => void;
  form: UseFormReturn<BusinessListingFormData>;
}

export const ApiVerificationSection = ({
  connectedApis,
  setConnectedApis,
  onVerificationComplete,
  form,
}: ApiVerificationSectionProps) => {
  const { toast } = useToast();

  const { data: integrations, refetch: refetchIntegrations } = useQuery({
    queryKey: ["business-integrations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("business_integrations")
        .select("*")
        .eq("status", "completed");
      
      if (error) throw error;
      return data || [];
    },
  });

  const connectedIntegrations = integrations?.map(i => i.integration_type) || [];

  const handleIntegrationClick = async (integrationKey: string) => {
    try {
      console.log(`Initiating ${integrationKey} integration`);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please log in to connect your business accounts.",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('business-integrations', {
        body: { 
          integration_type: integrationKey.toLowerCase(),
          form_data: form.getValues()
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) throw error;

      if (data?.authUrl) {
        if (data.metadata?.state) {
          localStorage.setItem('integration_state', data.metadata.state);
          localStorage.setItem('form_data', JSON.stringify(form.getValues()));
        }
        
        window.location.href = data.authUrl;
      }

    } catch (error) {
      console.error('Integration error:', error);
      toast({
        title: "Integration Failed",
        description: error.message || "There was an error initiating the integration. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePlaidSuccess = async () => {
    try {
      await refetchIntegrations();
      setConnectedApis([...connectedApis, 'plaid']);
      
      if ([...connectedApis, 'plaid'].length >= 2) {
        onVerificationComplete();
      }

      toast({
        title: "Success",
        description: "Plaid integration completed successfully.",
      });
    } catch (error) {
      console.error('Error handling Plaid success:', error);
      toast({
        title: "Error",
        description: "Failed to complete Plaid integration. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h4 className="font-medium mb-2">Option 1: API Verification</h4>
      <p className="text-sm text-muted-foreground mb-4">
        Connect your business accounts to verify your business instantly.
        Connect any 2 services:
      </p>
      
      <div className="space-y-6">
        <IntegrationSection 
          connectedTypes={connectedIntegrations}
          types={['plaid', 'quickbooks', 'xero']}
        >
          <FinancialIntegrations 
            handleIntegrationClick={handleIntegrationClick}
            handlePlaidSuccess={handlePlaidSuccess}
          />
        </IntegrationSection>
        
        <IntegrationSection 
          connectedTypes={connectedIntegrations}
          types={['shopify', 'square']}
        >
          <BusinessManagementIntegrations handleIntegrationClick={handleIntegrationClick} />
        </IntegrationSection>
        
        {/* <IntegrationSection 
          connectedTypes={connectedIntegrations}
          types={['creditsafe']}
        > 
          <CreditRiskIntegrations 
            handleIntegrationClick={handleIntegrationClick}
            form={form}
          />
        </IntegrationSection>*/}
        
        <IntegrationSection 
          connectedTypes={connectedIntegrations}
          types={['gusto']}
        >
          <PayrollHRIntegrations handleIntegrationClick={handleIntegrationClick} />
        </IntegrationSection>
        
        {/* <IntegrationSection 
          connectedTypes={connectedIntegrations}
          types={['irs', 'avalara']}
        > 
          <TaxComplianceIntegrations handleIntegrationClick={handleIntegrationClick} />
        </IntegrationSection>
        */}

        <IntegrationSection 
          connectedTypes={connectedIntegrations}
          types={['google_business', 'yelp']}
          isLast
        >
          <OnlinePresenceIntegrations handleIntegrationClick={handleIntegrationClick} />
        </IntegrationSection>

        <div className="mt-8">
          <h5 className="font-medium mb-4">Connected Platforms</h5>
          <ConnectionsList />
        </div>
      </div>

      {connectedApis.length > 0 && (
        <div className="mt-4 text-sm text-muted-foreground">
          Connected: {connectedApis.join(', ')}
          {connectedApis.length < 2 && (
            <p>Connect {2 - connectedApis.length} more service(s) to complete verification</p>
          )}
        </div>
      )}
    </div>
  );
};