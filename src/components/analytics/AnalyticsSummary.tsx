import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Building2, FileText } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const AnalyticsSummary = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["analytics-summary"],
    queryFn: async () => {
      const [usersCount, listingsCount, loisCount] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact" }),
        supabase.from("business_listings").select("id", { count: "exact" }),
        supabase.from("letters_of_intent").select("id", { count: "exact" }),
      ]);

      return {
        users: usersCount.count || 0,
        listings: listingsCount.count || 0,
        lois: loisCount.count || 0,
      };
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-[100px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[60px]" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const metrics = [
    {
      title: "Total Users",
      value: stats?.users || 0,
      icon: <Users className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Active Listings",
      value: stats?.listings || 0,
      icon: <Building2 className="h-6 w-6 text-green-500" />,
    },
    {
      title: "Letters of Intent",
      value: stats?.lois || 0,
      icon: <FileText className="h-6 w-6 text-purple-500" />,
    },
  ];

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Platform Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              {metric.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsSummary;