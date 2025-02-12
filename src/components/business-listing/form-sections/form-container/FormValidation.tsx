import React from "react";
import ValidationErrors from "../ValidationErrors";
import { toast } from "sonner";

interface FormValidationProps {
  errors: string[];
}

const FormValidation: React.FC<FormValidationProps> = ({ errors }) => {
  React.useEffect(() => {
    if (errors.length > 0) {
      console.error("Form validation errors:", errors);
      toast.error("Please fix the form errors before continuing");
    }
  }, [errors]);

  if (!Array.isArray(errors)) {
    console.error("FormValidation: errors prop must be an array");
    return null;
  }

  if (errors.length === 0) return null;

  return <ValidationErrors errors={errors} />;
};

export default FormValidation;