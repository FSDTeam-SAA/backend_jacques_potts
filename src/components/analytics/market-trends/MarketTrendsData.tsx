import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface TrendData {
  industry: string;
  averagePrice: number;
  listingCount: number;
}

export const useMarketTrendsData = () => {
  return useQuery({
    queryKey: ["market-trends"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("business_listings")
        .select("industry, asking_price")
        .eq("status", "published");

      if (error) throw error;

      const industryPrices = data.reduce((acc: any, listing) => {
        if (!acc[listing.industry]) {
          acc[listing.industry] = {
            count: 0,
            total: 0,
          };
        }
        acc[listing.industry].count++;
        acc[listing.industry].total += listing.asking_price;
        return acc;
      }, {});

      return Object.entries(industryPrices).map(([industry, data]: [string, any]) => ({
        industry,
        averagePrice: Math.round(data.total / data.count),
        listingCount: data.count,
      }));
    },
  });
};