import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const useLOIData = (activeTab: string) => {
  const { user } = useAuth();

  const { data: receivedLOIs, isLoading: loadingReceived } = useQuery({
    queryKey: ["lois", "received", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("letters_of_intent")
        .select(`
          *,
          business_listings(business_name),
          profiles!letters_of_intent_buyer_id_fkey(full_name, email)
        `)
        .eq("seller_id", user?.id);

      if (error) throw error;
      return data;
    },
    enabled: !!user && activeTab === "received",
  });

  const { data: sentLOIs, isLoading: loadingSent } = useQuery({
    queryKey: ["lois", "sent", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("letters_of_intent")
        .select(`
          *,
          business_listings(business_name),
          profiles!letters_of_intent_seller_id_fkey(full_name, email)
        `)
        .eq("buyer_id", user?.id);

      if (error) throw error;
      return data;
    },
    enabled: !!user && activeTab === "sent",
  });

  return {
    receivedLOIs,
    sentLOIs,
    loadingReceived,
    loadingSent,
  };
};