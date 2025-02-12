import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BadgeCheck } from "lucide-react";
import type { BusinessListing } from "@/types/supabase";
import { useAuth } from "@/contexts/AuthContext";

interface MainInfoProps {
  listing: BusinessListing;
}

const MainInfo = ({ listing }: MainInfoProps) => {
  const { user } = useAuth();
  
  const { data: profile } = useQuery({
    queryKey: ["profile", listing.user_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", listing.user_id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1a365d]">
            {user ? listing.business_name : "Business For Sale"}
          </h1>
          <p className="text-lg text-muted-foreground mt-1">{listing.location}</p>
        </div>
        {profile?.is_verified && (
          <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full">
            <BadgeCheck className="w-5 h-5" />
            <span className="text-sm font-medium">Verified Seller</span>
          </div>
        )}
      </div>

      {listing.image_url && (
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
          <img
            src={listing.image_url}
            alt={user ? listing.business_name : "Business listing image"}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">Asking Price</div>
          <div className="text-2xl font-bold text-[#1a365d]">
            ${listing.asking_price.toLocaleString()}
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">Annual Revenue</div>
          <div className="text-2xl font-bold text-[#1a365d]">
            ${listing.yearly_revenue.toLocaleString()}
          </div>
        </div>
        {listing.profit_margin && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">Profit Margin</div>
            <div className="text-2xl font-bold text-[#1a365d]">{listing.profit_margin}%</div>
          </div>
        )}
      </div>

      <div className="prose max-w-none">
        <p>{listing.description}</p>
      </div>
    </div>
  );
};

export default MainInfo;