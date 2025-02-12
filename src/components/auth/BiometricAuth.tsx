import { startAuthentication, startRegistration } from '@simplewebauthn/browser';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "sonner";

export const BiometricAuth = () => {
  const { user } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const registerBiometric = async () => {
    if (!user) return;
    
    try {
      setIsRegistering(true);
      
      // Get registration options from your server
      const { data: { options }, error: optionsError } = await supabase.functions.invoke('get-registration-options', {
        body: { userId: user.id }
      });
      
      if (optionsError) throw optionsError;

      // Pass these options to the authenticator
      const attResp = await startRegistration(options);

      // Verify the registration
      const { error: verificationError } = await supabase.functions.invoke('verify-registration', {
        body: { 
          userId: user.id,
          attResp 
        }
      });

      if (verificationError) throw verificationError;

      toast.success("Biometric authentication registered successfully!");
    } catch (err) {
      console.error('Failed to register biometric:', err);
      toast.error("Failed to register biometric authentication");
    } finally {
      setIsRegistering(false);
    }
  };

  const authenticateWithBiometric = async () => {
    if (!user) return;
    
    try {
      setIsAuthenticating(true);

      // Get authentication options
      const { data: { options }, error: optionsError } = await supabase.functions.invoke('get-authentication-options', {
        body: { userId: user.id }
      });
      
      if (optionsError) throw optionsError;

      // Pass these options to the authenticator
      const asseResp = await startAuthentication(options);

      // Verify the authentication
      const { error: verificationError } = await supabase.functions.invoke('verify-authentication', {
        body: {
          userId: user.id,
          asseResp
        }
      });

      if (verificationError) throw verificationError;

      toast.success("Biometric authentication successful!");
    } catch (err) {
      console.error('Failed to authenticate with biometric:', err);
      toast.error("Biometric authentication failed");
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-4">
      <Button
        onClick={registerBiometric}
        disabled={isRegistering}
        className="w-full"
      >
        {isRegistering ? "Registering..." : "Register Biometric Authentication"}
      </Button>

      <Button
        onClick={authenticateWithBiometric}
        disabled={isAuthenticating}
        variant="outline"
        className="w-full"
      >
        {isAuthenticating ? "Authenticating..." : "Use Biometric Authentication"}
      </Button>
    </div>
  );
};