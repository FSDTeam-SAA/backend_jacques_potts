import { useBusinessListingForm } from "./business-listing/hooks/useBusinessListingForm";
import BusinessListingFormContainer from "./business-listing/form-sections/BusinessListingFormContainer";
import PropertyDetailsSection from "./business-listing/form-sections/PropertyDetailsSection";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import AuthForm from "./auth/AuthForm";
import { Dialog, DialogContent } from "./ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

const BusinessListingForm = () => {
  const { user } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const { form, formErrors, onSubmit, isSubmitting, businessId, pendingData } = useBusinessListingForm();

  const handleSubmit = async (data: any) => {
    toast.success("Called api")
    if (!user) {
      // Store the form data temporarily and show auth dialog
      pendingData.current = data;
      setShowAuthDialog(true);
      return;
    }
    
    await onSubmit(data);
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <BusinessListingFormContainer
          form={form}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          formErrors={formErrors}
          businessId={businessId}
        />
        <PropertyDetailsSection form={form} />
      </Form>

      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Create an Account</h2>
            <p className="text-sm text-muted-foreground">
              To publish your listing, please create an account or sign in.
            </p>
            <AuthForm 
              isJoining={true} 
              onAuthSuccess={() => {
                setShowAuthDialog(false);
                if (pendingData.current) {
                  onSubmit(pendingData.current);
                }
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BusinessListingForm;