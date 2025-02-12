import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import type { BusinessListing } from "@/types/business";
import ListingsContainer from "@/components/browse/ListingsContainer";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SavedListings = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState<BusinessListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchFavorites();
  }, [user]);

  const fetchFavorites = async () => {
    try {
      const { data: favorites, error: favoritesError } = await supabase
        .from('user_favorites')
        .select('listing_id')
        .eq('user_id', user?.id);

      if (favoritesError) throw favoritesError;

      if (favorites?.length) {
        const listingIds = favorites.map(f => f.listing_id);
        const { data: listings, error: listingsError } = await supabase
          .from('business_listings')
          .select('*')
          .in('id', listingIds);

        if (listingsError) throw listingsError;
        setListings(listings || []);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">Saved Listings</h1>
        {listings.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            You haven't saved any listings yet.
          </p>
        ) : (
          <ListingsContainer listings={listings} />
        )}
      </Card>
    </div>
  );
};

export default SavedListings;