import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import LOIHeader from "@/components/loi/LOIHeader";
import LOITabs from "@/components/loi/LOITabs";

const LOIManagement = () => {
  const { user } = useAuth();

  const { data: sentLOIs, isLoading: loadingSent } = useQuery({
    queryKey: ["sent-lois", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("letters_of_intent")
        .select(`
          *,
          business_listings (
            business_name,
            asking_price
          )
        `)
        .eq("buyer_id", user?.id);

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const { data: receivedLOIs, isLoading: loadingReceived } = useQuery({
    queryKey: ["received-lois", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("letters_of_intent")
        .select(`
          *,
          business_listings (
            business_name,
            asking_price
          )
        `)
        .eq("seller_id", user?.id);

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  return (
    <div className="max-w-4xl mx-auto">
      <LOIHeader title="Letters of Intent Management" />
      <LOITabs 
        sentLOIs={sentLOIs}
        receivedLOIs={receivedLOIs}
        loadingSent={loadingSent}
        loadingReceived={loadingReceived}
      />
    </div>
  );
};

export default LOIManagement;