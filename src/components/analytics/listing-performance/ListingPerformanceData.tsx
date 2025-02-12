import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ListingData {
  name: string;
  views: number;
  lois: number;
  price: number;
}

export const useListingPerformanceData = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["listing-performance", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("business_listings")
        .select(`
          id,
          business_name,
          asking_price,
          messages (count),
          letters_of_intent (count)
        `)
        .eq("user_id", user?.id)
        .eq("status", "published");

      if (error) throw error;

      return data.map(listing => ({
        name: listing.business_name,
        views: listing.messages.length,
        lois: listing.letters_of_intent.length,
        price: listing.asking_price
      }));
    },
    enabled: !!user,
  });
};