import { useState } from "react";
import { BusinessListingFormData } from "@/components/business-listing/schema";
import { supabase } from "@/integrations/supabase/client";

export const useBusinessListingSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = async (data: BusinessListingFormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const { error: supabaseError } = await supabase
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
          }
        ]);

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmit, isSubmitting, error };
};