import { Filter, MessageCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFeaturePayment } from "@/hooks/useFeaturePayment";
import { PaymentMethodCheck } from "@/components/PaymentMethodCheck";
import { toast } from "sonner";

const PremiumFeatures = () => {
  const navigate = useNavigate();
  const { purchaseFeature, isProcessing } = useFeaturePayment();

  const handleFeatureActivation = async (
    type: "dynamic_filters" | "priority_message" | "loi_submission",
    duration?: number
  ) => {
    try {
      const success = await purchaseFeature(type, duration);
      if (success) {
        toast.success(`${type.replace(/_/g, ' ')} activated successfully!`);
        navigate("/browse");
      }
    } catch (error) {
      console.error('Error activating feature:', error);
      toast.error("Failed to activate feature. Please try again.");
    }
  };

  return (
    <PaymentMethodCheck>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#1a365d]">
              <Filter className="w-6 h-6" />
              Dynamic Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Access advanced search tools to refine your business search. Use filters for revenue range, 
              profit margins, employee count, and more.
            </p>
            <Button 
              onClick={() => handleFeatureActivation("dynamic_filters", 1)}
              disabled={isProcessing}
              className="w-full bg-[#1a365d] hover:bg-[#2a4a7d]"
            >
              {isProcessing ? "Processing..." : "Try Filters ($1/hour)"}
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-white hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#1a365d]">
              <MessageCircle className="w-6 h-6" />
              Priority Messaging
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Get your messages noticed faster by sellers. Send priority messages directly from any 
              business listing page.
            </p>
            <Button 
              onClick={() => handleFeatureActivation("priority_message")}
              disabled={isProcessing}
              className="w-full bg-[#1a365d] hover:bg-[#2a4a7d]"
            >
              {isProcessing ? "Processing..." : "Enable Priority ($2/message)"}
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-white hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#1a365d]">
              <FileText className="w-6 h-6" />
              LOI Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Submit Letters of Intent directly through our platform. Access professional LOI templates 
              and streamline your offer process.
            </p>
            <Button 
              onClick={() => handleFeatureActivation("loi_submission")}
              disabled={isProcessing}
              className="w-full bg-[#1a365d] hover:bg-[#2a4a7d]"
            >
              {isProcessing ? "Processing..." : "Submit LOI ($20)"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </PaymentMethodCheck>
  );
};

export default PremiumFeatures;