import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import ListingContent from "./listing-details/ListingContent";
import ListingActions from "./listing-details/ListingActions";
import ListingHeader from "./listing-details/ListingHeader";
import ListingStates from "./listing-details/ListingStates";
import ErrorBoundary from "../common/ErrorBoundary";
import type { BusinessListing } from "@/types/supabase";

const ListingDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<BusinessListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [hasUnlockedInfo, setHasUnlockedInfo] = useState(false);
  const { user } = useAuth();

  const fetchListing = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching listing details for ID:", id);

      const { data, error: fetchError } = await supabase
        .from("business_listings")
        .select("*, profiles(is_verified, verification_date)")
        .eq("id", id)
        .maybeSingle();

      if (fetchError) throw fetchError;
      if (!data) throw new Error("Listing not found");
      
      setListing(data);
      console.log("Listing data fetched:", data);

      if (user) {
        const { data: purchase, error: purchaseError } = await supabase
          .from("show_more_info_purchases")
          .select("*")
          .eq("listing_id", id)
          .eq("user_id", user.id)
          .eq("payment_status", "completed")
          .maybeSingle();

        if (purchaseError) throw purchaseError;
        setHasUnlockedInfo(!!purchase);
        console.log("Purchase status checked:", !!purchase);
      }
    } catch (err) {
      const error = err as Error;
      console.error("Error fetching listing:", error);
      setError(error);
      toast.error(error.message || "Failed to load listing");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      setError(new Error("Listing ID is required"));
      setLoading(false);
      return;
    }
    fetchListing();
  }, [id, user]);

  const handleShowMoreInfo = async () => {
    if (!user) {
      toast.error("Please log in to view additional information");
      return;
    }

    try {
      console.log("Creating checkout session for listing:", id);
      const response = await supabase.functions.invoke('create-checkout-session', {
        body: { 
          featureType: "show_more_info",
          listingId: id,
        },
      });

      if (response.error) throw response.error;
      if (!response.data?.url) throw new Error('No checkout URL received');

      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Failed to process payment');
    }
  };

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-8">
        <ListingHeader />
        <ListingStates loading={loading} error={error} />
        
        {listing && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ListingContent
              listing={listing}
              user={user}
              hasUnlockedInfo={hasUnlockedInfo}
              onUnlock={() => handleShowMoreInfo()}
            />
            <div>
              <ListingActions listing={listing} userId={user?.id} />
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default ListingDetails;