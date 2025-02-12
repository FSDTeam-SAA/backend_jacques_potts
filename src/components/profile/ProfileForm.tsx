import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck, Building2, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BillingSection from "./BillingSection";
import TwoFactorAuth from "./TwoFactorAuth";
import { VerificationDialog } from "@/components/verification/VerificationDialog";

export const ProfileForm = () => {
  const { user } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const { data: verifiedBusinesses } = useQuery({
    queryKey: ["verified-businesses", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("business_listings")
        .select("*")
        .eq("user_id", user?.id)
        .eq("verification_type", "verified");

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
        {!profile?.is_verified && <VerificationDialog />}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Verification Status
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant={profile?.is_verified ? "default" : "secondary"} className="flex items-center gap-1">
                  <BadgeCheck className="w-4 h-4" />
                  {profile?.is_verified ? "Verified Seller" : "Not Verified"}
                </Badge>
                {profile?.verification_date && (
                  <span className="text-sm text-muted-foreground">
                    Since {new Date(profile.verification_date).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Business Verification
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {verifiedBusinesses && verifiedBusinesses.length > 0 ? (
                verifiedBusinesses.map((business) => (
                  <div key={business.id} className="flex items-center gap-2">
                    <Badge variant="default" className="flex items-center gap-1">
                      <BadgeCheck className="w-4 h-4" />
                      Verified Business
                    </Badge>
                    <span className="text-sm font-medium">{business.business_name}</span>
                  </div>
                ))
              ) : (
                <div className="text-sm text-muted-foreground">
                  No verified businesses yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <TwoFactorAuth />
      <BillingSection />
    </div>
  );
};

export default ProfileForm;