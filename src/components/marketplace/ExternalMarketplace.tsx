import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ExternalLink } from "lucide-react";

interface MarketplaceListing {
  id: string;
  title: string;
  description: string;
  price: number;
  external_url: string;
  platform: string;
  location: string;
  business_type: string;
}

const ExternalMarketplace = () => {
  const { data: listings, isLoading } = useQuery({
    queryKey: ['externalListings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('business_listings')
        .select('*')
        .eq('is_temporary', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as MarketplaceListing[];
    }
  });

  const handleExternalView = (url: string) => {
    window.open(url, '_blank');
    toast.success("Redirecting to external listing");
  };

  if (isLoading) {
    return <div>Loading marketplace listings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">External Marketplace</h2>
        <Button variant="outline" onClick={() => window.open('https://bizbuysell.com', '_blank')}>
          View More Listings
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {listings?.map((listing) => (
          <Card key={listing.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>{listing.title}</span>
                <span className="text-sm text-muted-foreground">{listing.platform}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="space-y-2 mb-4 flex-1">
                <p className="text-sm text-gray-600">{listing.description}</p>
                <p className="text-sm text-muted-foreground">Location: {listing.location}</p>
                <p className="text-sm text-muted-foreground">Type: {listing.business_type}</p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="font-medium">${listing.price.toLocaleString()}</span>
                <Button 
                  onClick={() => handleExternalView(listing.external_url)}
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Listing
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExternalMarketplace;