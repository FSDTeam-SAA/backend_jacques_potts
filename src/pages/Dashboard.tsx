import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import ListingPerformance from "@/components/analytics/ListingPerformance";
import StatsOverview from "@/components/admin/platform-stats/StatsOverview";
import ProfileSection from "@/components/dashboard/ProfileSection";
import AccountSection from "@/components/dashboard/AccountSection";
import ListingsSection from "@/components/dashboard/listings/ListingsSection";
import ActionButtons from "@/components/dashboard/actions/ActionButtons";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: profile, isLoading: profileLoading } = useQuery({
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
    enabled: !!user,
  });

  const { data: businessListings, isLoading: businessLoading } = useQuery({
    queryKey: ["business-listings", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("business_listings")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: assetListings, isLoading: assetsLoading } = useQuery({
    queryKey: ["asset-listings", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("asset_listings")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const handleEdit = (type: string, id: string) => {
    switch (type) {
      case 'business':
        navigate(`/sell/edit/${id}`);
        break;
      case 'asset':
        navigate(`/create-asset/edit/${id}`);
        break;
      default:
        toast.error("Invalid listing type");
    }
  };

  if (profileLoading || businessLoading || assetsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <ActionButtons />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileSection profile={profile} />
        <AccountSection user={user} />
      </div>

      <ListingsSection
        businessListings={businessListings}
        assetListings={assetListings}
        onEdit={handleEdit}
      />

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Performance Overview</h2>
        <ListingPerformance />
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Platform Overview</h2>
        <StatsOverview />
      </div>
    </div>
  );
};

export default Dashboard;