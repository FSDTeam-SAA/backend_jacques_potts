import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PremiumFeature, PremiumFeatureType } from "@/integrations/supabase/types/premium";

interface PremiumFeaturesContextType {
  features: PremiumFeature[];
  isVerified: boolean;
  checkFeatureStatus: (type: PremiumFeatureType) => Promise<boolean>;
  activateFeature: (type: PremiumFeatureType, duration?: number) => Promise<boolean>;
  refreshFeatures: () => Promise<void>;
}

const PremiumFeaturesContext = createContext<PremiumFeaturesContextType | undefined>(undefined);

export const PremiumFeaturesProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [features, setFeatures] = useState<PremiumFeature[]>([]);
  const [isVerified, setIsVerified] = useState(false);

  const refreshFeatures = async () => {
    if (!user) return;
    console.log("User ID===================================:", user.id);  // Log the user ID to ensure it's correct

    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_verified")
        .eq("id", user.id)
        .single();

      setIsVerified(profile?.is_verified || false);
      console.log("Is_verified=========================================",profile?.is_verified);  // Log the verification status

      const { data: activeFeatures, error } = await supabase
  .from("premium_feature_usage")
  .select("*")
  .eq("user_id", user.id)
  .eq("payment_status", "completed")
  .gte("expires_at", new Date().toISOString());

if (error) {
  console.error("Error retrieving active features:======================", error);
} else {
  console.log("Active Features Data:==================================", activeFeatures);
}

      const formattedFeatures: PremiumFeature[] = [
        "dynamic_filters",
        "priority_message",
        "loi_submission",
        "verification",
        "featured_listing",
        "priority_listing"
      ].map((type) => ({
        type: type as PremiumFeatureType,
        isActive: activeFeatures?.some((f) => f.feature_type === type) || false,
        expiresAt: activeFeatures?.find((f) => f.feature_type === type)?.expires_at,
      }));

      setFeatures(formattedFeatures);
    } catch (error) {
      console.error("Error refreshing premium features:", error);
      toast.error("Failed to refresh premium features");
    }
  };

  const checkFeatureStatus = async (type: PremiumFeature["type"]) => {
    if (!user) return false;

    try {
      const { data } = await supabase.rpc("is_feature_active", {
        p_user_id: user.id,
        p_feature_type: type,
      });

      return data || false;
    } catch (error) {
      console.error("Error checking feature status:", error);
      return false;
    }
  };

  const activateFeature = async (type: PremiumFeature["type"], duration?: number) => {
    if (!user) {
      toast.error("Please log in to access premium features");
      return false;
    }

    try {
      const expiresAt = duration
        ? new Date(Date.now() + duration * 60 * 60 * 1000).toISOString()
        : null;

      const { error } = await supabase.from("premium_feature_usage").insert({
        user_id: user.id,
        feature_type: type,
        payment_status: "completed",
        payment_amount: type === "verification" ? 25 : type === "loi_submission" ? 20 : 1,
        expires_at: expiresAt,
      });

      if (error) throw error;

      await refreshFeatures();
      toast.success(`${type.replace("_", " ")} activated successfully!`);
      return true;
    } catch (error) {
      console.error("Error activating feature:", error);
      toast.error("Failed to activate feature");
      return false;
    }
  };

  useEffect(() => {
    if (user) {
      refreshFeatures();
    }
  }, [user]);

  return (
    <PremiumFeaturesContext.Provider
      value={{
        features,
        isVerified,
        checkFeatureStatus,
        activateFeature,
        refreshFeatures,
      }}
    >
      {children}
    </PremiumFeaturesContext.Provider>
  );
};

export const usePremiumFeatures = () => {
  const context = useContext(PremiumFeaturesContext);
  if (context === undefined) {
    throw new Error("usePremiumFeatures must be used within a PremiumFeaturesProvider");
  }
  return context;
};
