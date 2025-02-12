import { usePayment } from "@/contexts/PaymentContext";
import { usePremiumFeatures } from "@/contexts/PremiumFeaturesContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Star, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { PaymentMethodCheck } from "@/components/PaymentMethodCheck";

interface PremiumListingFeaturesProps {
  listingId: string;
}

const PremiumListingFeatures = ({ listingId }: PremiumListingFeaturesProps) => {
  const { processPayment } = usePayment();
  const { activateFeature } = usePremiumFeatures();

  const handleFeatureActivation = async (type: "featured_listing" | "priority_listing") => {
    try {
      const amount = type === "featured_listing" ? 49.99 : 29.99;
      const success = await processPayment(amount, `${type.replace("_", " ")} activation`);
      
      if (success) {
        await activateFeature(type as any, type === "featured_listing" ? 30 : 7); // 30 days for featured, 7 for priority
        toast.success(`${type.replace("_", " ")} activated successfully!`);
      }
    } catch (error) {
      console.error("Error activating feature:", error);
      toast.error("Failed to activate premium feature");
    }
  };

  return (
    <PaymentMethodCheck>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <Card className="bg-white hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#1a365d]">
              <Star className="w-6 h-6" />
              Featured Listing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Highlight your property at the top of search results for 30 days. 
              Get up to 5x more views and inquiries.
            </p>
            <Button 
              onClick={() => handleFeatureActivation("featured_listing")}
              className="w-full bg-[#1a365d] hover:bg-[#2a4a7d]"
            >
              Feature Property ($49.99/month)
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#1a365d]">
              <TrendingUp className="w-6 h-6" />
              Priority Listing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Get priority placement in search results for 7 days. 
              Increase visibility and attract more potential buyers.
            </p>
            <Button 
              onClick={() => handleFeatureActivation("priority_listing")}
              className="w-full bg-[#1a365d] hover:bg-[#2a4a7d]"
            >
              Prioritize Listing ($29.99/week)
            </Button>
          </CardContent>
        </Card>
      </div>
    </PaymentMethodCheck>
  );
};

export default PremiumListingFeatures;