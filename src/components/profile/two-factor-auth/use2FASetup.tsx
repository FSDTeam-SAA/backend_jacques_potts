import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import QRCode from "qrcode";

export const use2FASetup = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchTwoFactorStatus();
  }, []);

  const fetchTwoFactorStatus = async () => {
    if (!user) return;

    try {
      console.log("Fetching 2FA status for user:", user.id);
      const { data, error } = await supabase
        .from("two_factor_auth")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;

      if (data && data.length > 0) {
        console.log("2FA data found:", data[0]);
        setIsEnabled(data[0].is_enabled);
        setBackupCodes(data[0].backup_codes || []);
      } else {
        console.log("No 2FA record found for user");
        setIsEnabled(false);
        setBackupCodes([]);
      }
    } catch (error) {
      console.error("Error fetching 2FA status:", error);
      toast.error("Failed to fetch 2FA status");
    } finally {
      setIsLoading(false);
    }
  };

  const generateSecretAndQR = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-2fa-secret');
      
      if (error) throw error;
      
      const { secret, qrCode, backupCodes } = data;
      const qrCodeDataUrl = await QRCode.toDataURL(qrCode);
      setQrCodeUrl(qrCodeDataUrl);
      setBackupCodes(backupCodes);

      return secret;
    } catch (error) {
      console.error("Error generating 2FA secret:", error);
      toast.error("Failed to generate 2FA secret");
      return null;
    }
  };

  const handleToggle2FA = async () => {
    if (!user) return;

    try {
      if (!isEnabled) {
        const secret = await generateSecretAndQR();
        if (!secret) return;

        const { error } = await supabase.from("two_factor_auth").upsert({
          user_id: user.id,
          is_enabled: true,
          secret_key: secret,
          backup_codes: backupCodes,
        });

        if (error) throw error;

        setIsEnabled(true);
        toast.success("2FA has been enabled");
      } else {
        const { error } = await supabase
          .from("two_factor_auth")
          .update({ is_enabled: false })
          .eq("user_id", user.id);

        if (error) throw error;

        setIsEnabled(false);
        setQrCodeUrl(null);
        setBackupCodes([]);
        toast.success("2FA has been disabled");
      }
    } catch (error) {
      console.error("Error toggling 2FA:", error);
      toast.error("Failed to update 2FA settings");
    }
  };

  return {
    isEnabled,
    qrCodeUrl,
    backupCodes,
    isLoading,
    handleToggle2FA,
  };
};