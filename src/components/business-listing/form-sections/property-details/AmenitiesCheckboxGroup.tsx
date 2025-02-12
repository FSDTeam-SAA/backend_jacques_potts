import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { BusinessListingFormData } from "../../schema";

interface AmenitiesCheckboxGroupProps {
  form: UseFormReturn<BusinessListingFormData>;
}

const amenitiesList = [
  { id: "parking", label: "Parking" },
  { id: "security", label: "24/7 Security" },
  { id: "elevator", label: "Elevator" },
  { id: "loading_dock", label: "Loading Dock" },
  { id: "hvac", label: "HVAC System" },
  { id: "sprinklers", label: "Fire Sprinklers" },
  { id: "backup_power", label: "Backup Power" },
  { id: "fiber_internet", label: "Fiber Internet" },
];

const AmenitiesCheckboxGroup = ({ form }: AmenitiesCheckboxGroupProps) => {
  return (
    <FormField
      control={form.control}
      name="amenities"
      render={() => (
        <FormItem>
          <FormLabel className="text-base">Amenities</FormLabel>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            {amenitiesList.map((amenity) => (
              <FormField
                key={amenity.id}
                control={form.control}
                name="amenities"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={amenity.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <Checkbox
                        checked={field.value?.includes(amenity.id)}
                        onCheckedChange={(checked) => {
                          const current = field.value || [];
                          const updated = checked
                            ? [...current, amenity.id]
                            : current.filter((value) => value !== amenity.id);
                          field.onChange(updated);
                        }}
                      />
                      <FormLabel className="font-normal cursor-pointer">
                        {amenity.label}
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

export default AmenitiesCheckboxGroup;