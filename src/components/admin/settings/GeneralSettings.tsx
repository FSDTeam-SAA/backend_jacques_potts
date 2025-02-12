import { UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FeePricingSection from "./FeePricingSection";
import FeatureToggleSection from "./FeatureToggleSection";

interface GeneralSettingsProps {
  form: UseFormReturn<any>;
  isSaving: boolean;
  onSubmit: (values: any) => void;
}

const GeneralSettings = ({ form, isSaving, onSubmit }: GeneralSettingsProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FeePricingSection form={form} />
        <FeatureToggleSection form={form} />
        
        <Button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </form>
    </Form>
  );
};

export default GeneralSettings;