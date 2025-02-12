import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import type { BrokerProfile } from "@/components/broker/types";
import BrokerHeader from "@/components/broker/profile/BrokerHeader";
import BrokerSpecialtiesCard from "@/components/broker/profile/BrokerSpecialtiesCard";
import ContactBrokerCard from "@/components/broker/profile/ContactBrokerCard";

const BrokerProfilePage = () => {
  const { id } = useParams();

  const { data: broker, isLoading } = useQuery({
    queryKey: ["broker", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("broker_profiles")
        .select(`
          *,
          profiles (
            full_name,
            email,
            city,
            state,
            avatar_url,
            ratings:transaction_ratings!rated_user_id(rating)
          )
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as BrokerProfile;
    },
  });

  if (isLoading) {
    return <Skeleton className="w-full h-[600px]" />;
  }

  if (!broker) {
    return <div>Broker not found</div>;
  }

  const averageRating = broker.profiles.ratings.length > 0
    ? broker.profiles.ratings.reduce((sum, r) => sum + r.rating, 0) / broker.profiles.ratings.length
    : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <BrokerHeader broker={broker} averageRating={averageRating} />
          <BrokerSpecialtiesCard specialties={broker.specialties} />
        </div>

        <div>
          <ContactBrokerCard 
            brokerId={broker.user_id} 
            brokerName={broker.profiles.full_name} 
          />
        </div>
      </div>
    </div>
  );
};

export default BrokerProfilePage;