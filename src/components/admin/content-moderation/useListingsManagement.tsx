import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BusinessListing } from "@/types/business";
import { useAdminCheck } from "./hooks/useAdminCheck";
import { useTemporaryListings } from "./hooks/useTemporaryListings";
import { useListingsStatus } from "./hooks/useListingsStatus";
import { toast } from "sonner";

interface FilterParams {
  propertyType?: string;
  propertyStyle?: string;
  constructionStatus?: string;
  buildingClass?: string;
  energyRating?: string;
  location?: string;
  priceRange?: [number, number];
}

export const useListingsManagement = (filters?: FilterParams) => {
  const { data: isAdmin, isLoading: isAdminCheckLoading } = useAdminCheck();

  const { data: listings, isLoading: isListingsLoading, refetch } = useQuery({
    queryKey: ["admin-listings", filters],
    queryFn: async () => {
      if (!isAdmin) {
        console.error("User is not an admin");
        return [];
      }

      console.log("Fetching admin listings with filters:", filters);
      
      let query = supabase
        .from("business_listings")
        .select(`
          *,
          profiles:user_id (
            full_name,
            email
          )
        `);

      // Apply filters
      if (filters) {
        if (filters.propertyType) {
          query = query.eq('property_type', filters.propertyType);
        }
        if (filters.propertyStyle) {
          query = query.eq('property_style', filters.propertyStyle);
        }
        if (filters.constructionStatus) {
          query = query.eq('construction_status', filters.constructionStatus);
        }
        if (filters.buildingClass) {
          query = query.eq('building_class', filters.buildingClass);
        }
        if (filters.energyRating) {
          query = query.eq('energy_rating', filters.energyRating);
        }
        if (filters.location) {
          query = query.ilike('location', `%${filters.location}%`);
        }
        if (filters.priceRange) {
          query = query
            .gte('asking_price', filters.priceRange[0])
            .lte('asking_price', filters.priceRange[1]);
        }
      }

      query = query.order("created_at", { ascending: false });

      const { data: listingsData, error } = await query;

      if (error) {
        console.error("Error fetching listings:", error);
        toast.error("Failed to fetch listings");
        throw error;
      }

      console.log("Admin listings fetched:", listingsData?.length || 0);
      return listingsData as BusinessListing[];
    },
    enabled: !!isAdmin,
  });

  const { generateListingsMutation, removeListingsMutation } = useTemporaryListings(refetch);
  const { handleApprove, handleReject } = useListingsStatus(refetch);

  return {
    listings,
    isLoading: isAdminCheckLoading || isListingsLoading,
    generateListingsMutation,
    removeListingsMutation,
    handleApprove,
    handleReject,
  };
};