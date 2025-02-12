import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import StatsCards from "./dashboard/StatsCards";
import AnalyticsHeader from "./dashboard/AnalyticsHeader";
import ChartsSection from "./dashboard/ChartsSection";

const AnalyticsDashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["analytics-overview"],
    queryFn: async () => {
      const [usersResult, listingsResult, loisResult] = await Promise.all([
        supabase.from("profiles").select("created_at"),
        supabase.from("business_listings").select("created_at, status, asking_price"),
        supabase.from("letters_of_intent").select("created_at"),
      ]);

      // Calculate average listing price
      const avgPrice = listingsResult.data?.reduce((sum, listing) => sum + (listing.asking_price || 0), 0) || 0;
      const totalListings = listingsResult.data?.length || 1;

      return {
        totalUsers: usersResult.data?.length || 0,
        activeListings: listingsResult.data?.filter(l => l.status === "published").length || 0,
        totalLOIs: loisResult.data?.length || 0,
        averageListingPrice: avgPrice / totalListings,
      };
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <AnalyticsHeader 
        title="Analytics Overview" 
        description="Track your platform's performance and engagement metrics" 
      />
      <StatsCards stats={stats || { totalUsers: 0, activeListings: 0, totalLOIs: 0, averageListingPrice: 0 }} />
      <ChartsSection />
    </div>
  );
};

export default AnalyticsDashboard;