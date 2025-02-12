import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { BusinessListingFormData } from "../schema";

export const useFormValidation = (form: UseFormReturn<BusinessListingFormData>) => {
  const [formErrors, setFormErrors] = useState<string[]>([]);

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      const errors = form.formState.errors;
      if (Object.keys(errors).length > 0) {
        const errorMessages = Object.entries(errors).map(([field, error]) => {
          return `${field}: ${error?.message}`;
        });
        setFormErrors(errorMessages);
      } else {
        setFormErrors([]);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return {
    formErrors,
  };
};