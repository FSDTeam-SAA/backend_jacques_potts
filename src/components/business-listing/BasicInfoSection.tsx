import React from "react";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { businessListingSchema } from "./schema";
import BusinessNameField from "./form-sections/BusinessNameField";
import IndustryField from "./form-sections/IndustryField";
import LocationField from "./form-sections/LocationField";
import InputField from "./form-sections/InputField";
import RadioGroupField from "./form-sections/RadioGroupField";
import ImageUploadField from "./form-sections/ImageUploadField";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface BasicInfoSectionProps {
  form: UseFormReturn<z.infer<typeof businessListingSchema>>;
}

const BasicInfoSection = ({ form }: BasicInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Basic Business Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BusinessNameField form={form} />
        
        <InputField
          form={form}
          name="listingTitle"
          label="Listing Title"
          placeholder="Enter a public title for your listing"
        />

        <IndustryField form={form} />
        <LocationField form={form} />
        
        <InputField
          form={form}
          name="askingPrice"
          label="Asking Price"
          placeholder="$"
          type="number"
        />

        <InputField
          form={form}
          name="yearsInOperation"
          label="Years in Operation"
          type="number"
        />

        <InputField
          form={form}
          name="numberOfLocations"
          label="Number of Locations"
          type="number"
        />

        <InputField
          form={form}
          name="website"
          label="Website (Optional)"
          placeholder="https://"
        />
      </div>

      <ImageUploadField form={form} />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="col-span-full">
            <FormLabel>Business Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Please provide a detailed description of your business..."
                className="min-h-[150px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4">
        <RadioGroupField
          form={form}
          name="isFranchise"
          label="Is this a franchise?"
        />

        <RadioGroupField
          form={form}
          name="soleOwner"
          label="Are you the sole owner?"
        />
      </div>
    </div>
  );
};

export default BasicInfoSection;