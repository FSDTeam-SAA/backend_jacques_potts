import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import BasicPropertyInfo from "./form-sections/BasicPropertyInfo";
import LocationAndAmenities from "./form-sections/LocationAndAmenities";
import PropertyDetails from "./form-sections/PropertyDetails";
import VirtualTourSection from "./form-sections/VirtualTourSection";
import PropertyDocumentsSection from "./form-sections/PropertyDocumentsSection";

interface RealEstateEditFormProps {
  listingId: string;
}

const RealEstateEditForm = ({ listingId }: RealEstateEditFormProps) => {
  const navigate = useNavigate();
  const form = useForm();

  useEffect(() => {
    const fetchListing = async () => {
      const { data, error } = await supabase
        .from("business_listings")
        .select("*")
        .eq("id", listingId)
        .single();

      if (error) {
        toast.error("Error fetching listing");
        return;
      }

      if (data) {
        // Pre-populate form with existing data
        Object.entries(data).forEach(([key, value]) => {
          form.setValue(key, value);
        });
      }
    };

    fetchListing();
  }, [listingId, form]);

  const onSubmit = async (data: any) => {
    try {
      const { error } = await supabase
        .from("business_listings")
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq("id", listingId);

      if (error) throw error;

      toast.success("Property listing updated successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating listing:", error);
      toast.error("Failed to update property listing");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Property Listing</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <BasicPropertyInfo form={form} />
          <LocationAndAmenities form={form} />
          <PropertyDetails form={form} />
          <VirtualTourSection form={form} />
          <PropertyDocumentsSection form={form} />
          
          <div className="flex gap-4">
            <Button type="submit">Update Listing</Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RealEstateEditForm;