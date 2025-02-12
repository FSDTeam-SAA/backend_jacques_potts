import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import BusinessListingFormContainer from "@/components/business-listing/form-sections/BusinessListingFormContainer";
import { useForm } from "react-hook-form";
import { businessListingSchema } from "@/components/business-listing/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { BusinessListing } from "@/types/business";
import * as z from "zod";

type FormData = z.infer<typeof businessListingSchema>;

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<string[] | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(businessListingSchema),
    defaultValues: {
      businessName: "",
      listingTitle: "",
      industry: "",
      location: "",
      askingPrice: "",
      annualRevenue: "",
      description: "",
      employeeCount: "",
      yearsInOperation: "",
      includesRealEstate: "no" as const,
      includesIP: "no" as const,
      includesEquipment: "no" as const,
      isFranchise: "no" as const,
      soleOwner: "yes" as const,
      website: "",
      monthlyCashFlow: "",
      totalDebt: "",
      image_url: "",
      image_urls: [],
      hasLiens: "no" as const,
      hasRecurringRevenue: "no" as const,
      numberOfLocations: "",
      profitMargin: "",
      hasSOPs: "no" as const,
      hasLoyaltyProgram: "no" as const,
      collectsCustomerData: "no" as const,
      isCurrentlyProfitable: "yes" as const,
    }
  });

  useEffect(() => {
    const fetchListing = async () => {
      try {
        if (!id) return;

        const { data: listing, error } = await supabase
          .from("business_listings")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        if (!listing) throw new Error("Listing not found");

        // Populate form with existing data
        const formFields = Object.keys(form.getValues()) as Array<keyof FormData>;
        formFields.forEach((key) => {
          if (key in listing) {
            form.setValue(key, listing[key]);
          }
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching listing:", error);
        toast.error("Failed to load listing");
        navigate("/dashboard");
      }
    };

    fetchListing();
  }, [id, form, navigate]);

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      setFormErrors(null);

      const { error } = await supabase
        .from("business_listings")
        .update(data)
        .eq("id", id);

      if (error) throw error;

      toast.success("Listing updated successfully");
      navigate(`/listings/${id}`);
    } catch (error) {
      console.error("Error updating listing:", error);
      toast.error("Failed to update listing");
      setFormErrors(["Failed to update listing. Please try again."]);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <Card className="p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Listing</h1>
        <BusinessListingFormContainer
          form={form}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          formErrors={formErrors}
          businessId={id}
        />
      </Card>
    </div>
  );
};

export default EditListing;