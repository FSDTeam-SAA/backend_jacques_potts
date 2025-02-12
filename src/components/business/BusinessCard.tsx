import { Card } from "@/components/ui/card";
import type { BusinessListing } from "@/types/business";
import BusinessCardHeader from "./listing-details/BusinessCardHeader";
import BusinessCardContent from "./listing-details/BusinessCardContent";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface BusinessCardProps {
  business: BusinessListing;
  showPropertyDetails?: boolean;
}

const BusinessCard = ({ business, showPropertyDetails }: BusinessCardProps) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const documentCount = business.verified_documents 
    ? (Array.isArray(business.verified_documents) 
        ? business.verified_documents.length 
        : 0)
    : 0;

  useEffect(() => {
    if (user) {
      checkIfFavorite();
    }
  }, [user, business.id]);

  const checkIfFavorite = async () => {
    try {
      const { data } = await supabase
        .from('user_favorites')
        .select('id')
        .eq('user_id', user?.id)
        .eq('listing_id', business.id)
        .single();
      
      setIsFavorite(!!data);
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  const toggleFavorite = async () => {
    if (!user) {
      toast.error("Please sign in to save favorites");
      return;
    }

    setIsLoading(true);
    try {
      if (isFavorite) {
        await supabase
          .from('user_favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('listing_id', business.id);
        
        toast.success("Removed from favorites");
      } else {
        await supabase
          .from('user_favorites')
          .insert([
            { user_id: user.id, listing_id: business.id }
          ]);
        
        toast.success("Added to favorites");
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error("Error updating favorites");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={`hover:shadow-lg transition-shadow h-full relative ${business.is_featured ? 'border-2 border-yellow-400' : ''}`}>
      <div className="absolute top-2 right-2 z-10">
        <Button
          variant="ghost"
          size="icon"
          className={`rounded-full ${isFavorite ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-gray-600'}`}
          onClick={toggleFavorite}
          disabled={isLoading}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
        </Button>
      </div>
      <BusinessCardHeader business={business} documentCount={documentCount} />
      <BusinessCardContent business={business} showPropertyDetails={showPropertyDetails} />
    </Card>
  );
};

export default BusinessCard;