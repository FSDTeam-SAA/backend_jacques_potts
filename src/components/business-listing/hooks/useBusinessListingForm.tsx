import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { businessListingSchema, BusinessListingFormData } from "../schema";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { useFormValidation } from "@/hooks/useFormValidation";
import { useConnectionStatus } from "@/hooks/useConnectionStatus";
import { useRef } from "react";

export const useBusinessListingForm = () => {
  const form = useForm<BusinessListingFormData>({
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
      profitMargin: "",
      hasLiens: "no",
      hasRecurringRevenue: "no",
      includesRealEstate: "no",
      includesIP: "no",
      includesEquipment: "no",
      isFranchise: "no",
      soleOwner: "yes",
      hasSOPs: "no",
      hasLoyaltyProgram: "no",
      collectsCustomerData: "no",
      isCurrentlyProfitable: "yes",
      yearsInOperation: "",
      numberOfLocations: "",
      monthlyCashFlow: "",
      totalDebt: "",
      image_url: "",
      image_urls: [],
      taxId: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      amenities: [],
      neighborhoodFeatures: [],
      investmentMetrics: {}
    },
  });

  const { handleSubmit, isSubmitting, businessId } = useFormSubmission();
  const { formErrors, validateForm } = useFormValidation(form);
  const { isOnline } = useConnectionStatus();
  const pendingData = useRef<BusinessListingFormData | null>(null);

  const onSubmit = async (data: BusinessListingFormData) => {
    if (!isOnline) {
      console.error("No internet connection");
      return;
    }

    const isValid = await validateForm(data);
    if (!isValid) {
      return;
    }

    await handleSubmit(data);
  };

  return {
    form,
    formErrors,
    onSubmit,
    isSubmitting,
    businessId,
    pendingData,
  };
};