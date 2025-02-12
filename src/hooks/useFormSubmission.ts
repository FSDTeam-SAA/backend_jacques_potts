import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { BusinessListingFormData } from "@/components/business-listing/schema";
import { useAuth } from "@/contexts/AuthContext";

export const useFormSubmission = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [businessId, setBusinessId] = useState<string>();

  const handleSubmit = async (data: BusinessListingFormData) => {
    if (!user) {
      return false;
    }

    setIsSubmitting(true);

    try {
      const { data: insertedListing, error: insertError } = await supabase
        .from('business_listings')
        .insert([
          {
            business_name: data.businessName,
            industry: data.industry,
            location: data.location,
            asking_price: parseFloat(data.askingPrice),
            yearly_revenue: parseFloat(data.annualRevenue),
            description: data.description,
            employee_count: data.employeeCount,
            profit_margin: data.profitMargin,
            user_id: user.id,
            status: 'published',
            image_url: data.image_url || null,
          }
        ])
        .select()
        .single();

      if (insertError) throw insertError;

      setBusinessId(insertedListing.id);

      toast({
        title: "Success",
        description: "Your business listing has been published successfully.",
      });

      return true;
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description: "There was a problem submitting your listing. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isSubmitting,
    businessId,
  };
};