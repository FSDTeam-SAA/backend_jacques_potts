import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import StatsGrid from "./StatsGrid";
import StatsChart from "./StatsChart";

const StatsOverview = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["platform-stats"],
    queryFn: async () => {
      const [usersResult, listingsResult, loisResult, messagesResult] =
        await Promise.all([
          supabase.from("profiles").select("created_at"),
          supabase.from("business_listings").select("created_at, status"),
          supabase.from("letters_of_intent").select("created_at, status"),
          supabase.from("messages").select("created_at"),
        ]);

      return {
        totalUsers: usersResult.data?.length || 0,
        totalListings: listingsResult.data?.length || 0,
        activeListings:
          listingsResult.data?.filter((l) => l.status === "published").length || 0,
        totalLOIs: loisResult.data?.length || 0,
        totalMessages: messagesResult.data?.length || 0,
      };
    },
  });

  if (isLoading) {
    return <div>Loading statistics...</div>;
  }

  const chartData = [
    {
      name: "Users",
      total: stats?.totalUsers || 0,
    },
    {
      name: "Listings",
      total: stats?.totalListings || 0,
    },
    {
      name: "Active Listings",
      total: stats?.activeListings || 0,
    },
    {
      name: "LOIs",
      total: stats?.totalLOIs || 0,
    },
    {
      name: "Messages",
      total: stats?.totalMessages || 0,
    },
  ];

  return (
    <div className="space-y-6">
      <StatsGrid stats={stats || { totalUsers: 0, activeListings: 0, totalLOIs: 0, totalMessages: 0 }} />
      <StatsChart data={chartData} />
    </div>
  );
};

export default StatsOverview;