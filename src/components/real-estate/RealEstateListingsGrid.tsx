import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import RealEstateListingCard from "./RealEstateListingCard";
import PropertySearchForm from "./search/PropertySearchForm";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { SearchFilters } from "./search/types";
import { toast } from "sonner";

const RealEstateListingsGrid = () => {
  const navigate = useNavigate();

  const { data: listings, isLoading, refetch } = useQuery({
    queryKey: ["real-estate-listings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("business_listings")
        .select("*")
        .eq("business_type", "real_estate")
        .eq("status", "published")
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching listings:", error);
        toast.error("Failed to fetch listings");
        throw error;
      }

      return data;
    },
  });

  const handleSearch = async (filters: SearchFilters) => {
    try {
      let query = supabase
        .from("business_listings")
        .select("*")
        .eq("business_type", "real_estate")
        .eq("status", "published");

      if (filters.propertyType) {
        query = query.eq("property_type", filters.propertyType);
      }

      if (filters.location) {
        query = query.ilike("location", `%${filters.location}%`);
      }

      if (filters.minBedrooms) {
        query = query.gte("bedrooms", parseInt(filters.minBedrooms));
      }

      if (filters.minBathrooms) {
        query = query.gte("bathrooms", parseFloat(filters.minBathrooms));
      }

      if (filters.minSquareFeet) {
        query = query.gte("square_footage", parseInt(filters.minSquareFeet));
      }

      query = query
        .gte("asking_price", filters.priceRange[0])
        .lte("asking_price", filters.priceRange[1])
        .order("created_at", { ascending: false });

      const { data, error } = await query;

      if (error) throw error;

      refetch();
      toast.success("Search filters applied");
    } catch (error) {
      console.error("Error applying search filters:", error);
      toast.error("Failed to apply search filters");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Real Estate Listings</h2>
        <Button onClick={() => navigate("/real-estate/create")}>
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </div>

      <PropertySearchForm onSearch={handleSearch} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings?.map((listing) => (
          <RealEstateListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      {(!listings || listings.length === 0) && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold">No properties listed yet</h3>
          <p className="text-muted-foreground mt-2">
            Be the first to list a property
          </p>
          <Button
            className="mt-4"
            onClick={() => navigate("/real-estate/create")}
          >
            Add Property
          </Button>
        </div>
      )}
    </div>
  );
};

export default RealEstateListingsGrid;