import { UseFormReturn } from "react-hook-form";
import { BusinessListingFormData } from "../schema";
import PropertyStyleSelect from "./property-details/PropertyStyleSelect";
import ConstructionStatusSelect from "./property-details/ConstructionStatusSelect";
import BuildingClassSelect from "./property-details/BuildingClassSelect";
import EnergyRatingSelect from "./property-details/EnergyRatingSelect";
import AmenitiesCheckboxGroup from "./property-details/AmenitiesCheckboxGroup";
import NeighborhoodFeaturesCheckboxGroup from "./property-details/NeighborhoodFeaturesCheckboxGroup";


interface PropertyDetailsSectionProps {
  form: UseFormReturn<BusinessListingFormData>;
}

const PropertyDetailsSection = ({ form }: PropertyDetailsSectionProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Property Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PropertyStyleSelect form={form} />
        <ConstructionStatusSelect form={form} />
        <BuildingClassSelect form={form} />
        <EnergyRatingSelect form={form} />
      </div>
      <div className="space-y-6">
        <AmenitiesCheckboxGroup form={form} />
        <NeighborhoodFeaturesCheckboxGroup form={form} />
      </div>
    </div>
  );
};

export default PropertyDetailsSection;