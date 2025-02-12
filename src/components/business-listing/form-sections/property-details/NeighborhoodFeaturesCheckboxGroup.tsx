import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { BusinessListingFormData } from "../../schema";

interface NeighborhoodFeaturesCheckboxGroupProps {
  form: UseFormReturn<BusinessListingFormData>;
}

const neighborhoodFeaturesList = [
  { id: "public_transport", label: "Public Transport" },
  { id: "restaurants", label: "Restaurants Nearby" },
  { id: "shopping", label: "Shopping Centers" },
  { id: "schools", label: "Schools" },
  { id: "parks", label: "Parks & Recreation" },
  { id: "medical", label: "Medical Facilities" },
  { id: "business_district", label: "Business District" },
  { id: "highway_access", label: "Highway Access" },
];

const NeighborhoodFeaturesCheckboxGroup = ({ form }: NeighborhoodFeaturesCheckboxGroupProps) => {
  return (
    <FormField
      control={form.control}
      name="neighborhoodFeatures"
      render={() => (
        <FormItem>
          <FormLabel className="text-base">Neighborhood Features</FormLabel>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            {neighborhoodFeaturesList.map((feature) => (
              <FormField
                key={feature.id}
                control={form.control}
                name="neighborhoodFeatures"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={feature.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <Checkbox
                        checked={field.value?.includes(feature.id)}
                        onCheckedChange={(checked) => {
                          const current = field.value || [];
                          const updated = checked
                            ? [...current, feature.id]
                            : current.filter((value) => value !== feature.id);
                          field.onChange(updated);
                        }}
                      />
                      <FormLabel className="font-normal cursor-pointer">
                        {feature.label}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
        </FormItem>
      )}
    />
  );
};

export default NeighborhoodFeaturesCheckboxGroup;