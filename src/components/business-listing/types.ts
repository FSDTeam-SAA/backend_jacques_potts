import { UseFormReturn } from "react-hook-form";
import { BusinessListingFormData } from "./schema";

export type BusinessListingFormProps = {
  form: UseFormReturn<BusinessListingFormData>;
};

export type RadioFieldProps = BusinessListingFormProps & {
  name: keyof BusinessListingFormData;
  label: string;
};