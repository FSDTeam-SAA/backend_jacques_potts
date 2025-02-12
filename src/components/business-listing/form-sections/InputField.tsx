import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { businessListingSchema } from "../schema";
import { toast } from "sonner";

interface InputFieldProps {
  form: UseFormReturn<z.infer<typeof businessListingSchema>>;
  name: keyof z.infer<typeof businessListingSchema>;
  label: string;
  placeholder?: string;
  type?: string;
  readOnly?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ 
  form, 
  name, 
  label, 
  placeholder, 
  type = "text", 
  readOnly = false 
}) => {
  if (!form || !name) {
    console.error("InputField: Missing required props");
    toast.error("Form field configuration error");
    return null;
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input 
              placeholder={placeholder} 
              type={type} 
              readOnly={readOnly}
              {...field}
              value={field.value as string}
              onError={(e) => {
                console.error("Input field error:", e);
                toast.error("Error in form field");
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;