import React from "react";
import { BusinessListingFormProps } from "./types";
import RadioField from "./form-fields/RadioField";

const AssetsSection = ({ form }: BusinessListingFormProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Assets Included in Sale</h3>
      <div className="space-y-4">
        <RadioField
          form={form}
          name="includesRealEstate"
          label="Includes Real Estate?"
        />
        <RadioField
          form={form}
          name="includesIP"
          label="Includes IP/Trademarks?"
        />
        <RadioField
          form={form}
          name="includesEquipment"
          label="Includes Equipment/Inventory?"
        />
      </div>
    </div>
  );
};

export default AssetsSection;