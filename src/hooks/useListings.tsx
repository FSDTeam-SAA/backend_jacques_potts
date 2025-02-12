import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getIndustryImage } from "@/components/browse/IndustryImages";
import { toast } from "sonner";
import type { BusinessListing } from "@/types/supabase";

interface ListingsFilters {
  revenueRange?: [number, number];
  profitMargin?: [number, number];
  employeeCount?: string;
  yearsInOperation?: string;
  businessType?: string;
  locationType?: string;
  hasWebsite?: boolean;
  hasSocialMedia?: boolean;
  scalabilityRating?: number;
  isFranchiseAvailable?: boolean;
  verificationType?: string;
  location?: string;
  industry?: string;
}

export const useListings = (filters?: ListingsFilters) => {
  return useQuery({
    queryKey: ["listings", filters],
    queryFn: async () => {
      try {
        console.log("Fetching listings with filters:", filters);
        
        let query = supabase
          .from("business_listings")
          .select(`
            *,
            profiles:user_id (
              id,
              full_name,
              avatar_url,
              is_verified
            )
          `)
          .eq("status", "published")
          .is("deleted_at", null);

        // Apply filters if they exist
        if (filters) {
          if (filters.location) {
            query = query.ilike("location", `%${filters.location}%`);
          }

          if (filters.industry) {
            query = query.ilike("industry", `%${filters.industry}%`);
          }

          if (filters.revenueRange) {
            const [minRevenue, maxRevenue] = filters.revenueRange;
            query = query
              .gte("yearly_revenue", minRevenue)
              .lte("yearly_revenue", maxRevenue);
          }

          if (filters.businessType) {
            query = query.eq("business_type", filters.businessType);
          }

          if (filters.locationType) {
            query = query.eq("location_type", filters.locationType);
          }

          if (filters.hasWebsite) {
            query = query.eq("has_website", true);
          }

          if (filters.hasSocialMedia) {
            query = query.eq("has_social_media", true);
          }

          if (filters.isFranchiseAvailable) {
            query = query.eq("is_franchise_available", true);
          }

          if (filters.scalabilityRating > 0) {
            query = query.gte("scalability_rating", filters.scalabilityRating);
          }
        }

        const { data: fetchedListings, error: fetchError } = await query;

        if (fetchError) {
          console.error("Error fetching listings:", fetchError);
          throw fetchError;
        }

        console.log("Fetched listings:", fetchedListings);

        const listingsWithImages = fetchedListings?.map((listing) => ({
          ...listing,
          image_url: listing.image_url || getIndustryImage(listing.industry)
        })) || [];

        return listingsWithImages;
      } catch (error) {
        console.error("Error in listings fetch:", error);
        toast.error("Failed to load listings");
        throw error;
      }
    },
    retry: 1,
    staleTime: 30000, // Consider data fresh for 30 seconds
  });
};