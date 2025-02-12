import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { personalInfoSchema, type PersonalInfoFormValues } from "./types";
import AvatarUpload from "./form-sections/AvatarUpload";
import ContactInfo from "./form-sections/ContactInfo";
import RoleSelect from "./form-sections/RoleSelect";
import LocationFields from "./form-sections/LocationFields";
import { PlaidLink } from "@/components/plaid/PlaidLink";
import { Separator } from "@/components/ui/separator";

interface PersonalInfoFormProps {
  onComplete: () => void;
}

const PersonalInfoForm = ({ onComplete }: PersonalInfoFormProps) => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  
  const form = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      terms: false,
    },
  });

  const onSubmit = async (data: PersonalInfoFormValues) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: data.fullName,
          phone: data.phone,
          role: data.role,
          city: data.city,
          state: data.state,
          country: data.country,
          avatar_url: avatarUrl,
        })
        .eq('id', user.id);

      if (error) throw error;
      
      toast.success("Profile updated successfully!");
      onComplete();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex justify-center mb-6">
          <AvatarUpload onImageChange={setAvatarUrl} />
        </div>

        <ContactInfo form={form} />
        <RoleSelect form={form} />
        <LocationFields form={form} />

        <Separator className="my-6" />
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Bank Account Verification</h3>
          <p className="text-sm text-muted-foreground">
            Connect your bank account to verify your identity and enable secure transactions.
          </p>
          <PlaidLink />
        </div>

        <div className="flex flex-row items-start space-x-3 mt-6">
          <Checkbox
            checked={form.watch("terms")}
            onCheckedChange={(checked) => 
              form.setValue("terms", checked as boolean)
            }
          />
          <div className="space-y-1 leading-none">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              I agree to the Terms & Conditions and Privacy Policy
            </label>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Continue"}
        </Button>
      </form>
    </Form>
  );
};

export default PersonalInfoForm;