import { useState } from 'react';
import { IntegrationButton } from "../IntegrationButton";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface OnlinePresenceIntegrationsProps {
  handleIntegrationClick: (key: string) => void;
}

export const OnlinePresenceIntegrations = ({
  handleIntegrationClick,
}: OnlinePresenceIntegrationsProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const handleGoogleBusinessClick = async () => {
    try {
      setIsConnecting(true);
      console.log("Initiating Google Business integration");
      await handleIntegrationClick('google_business');
    } catch (error) {
      console.error('Google Business integration error:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect to Google Business. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="space-y-3">
      <h5 className="text-sm font-medium text-muted-foreground">Online Presence</h5>
      <IntegrationButton
        label="Google Business Integration"
        integrationKey="google_business"
        onClick={handleGoogleBusinessClick}
        loading={isConnecting}
      />
      <IntegrationButton
        label="Yelp Integration"
        integrationKey="yelp"
        onClick={() => handleIntegrationClick('yelp')}
      />
    </div>
  );
};