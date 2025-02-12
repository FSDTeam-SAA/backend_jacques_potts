import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import LOIFormContent, { loiSchema, LoiFormValues } from "./loi/LOIFormContent";
import LOISubmissionFee from "./loi/LOISubmissionFee";

interface LetterOfIntentFormProps {
  listingId: string;
  sellerId: string;
  onSuccess?: () => void;
}

const LetterOfIntentForm = ({ listingId, sellerId, onSuccess }: LetterOfIntentFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const form = useForm<LoiFormValues>({
    resolver: zodResolver(loiSchema),
    defaultValues: {
      content: `Dear Business Owner,

I am writing to express my sincere interest in acquiring your business. After carefully reviewing your listing, I believe there could be a mutually beneficial opportunity for us to explore.

I would appreciate the opportunity to discuss this further and learn more about your business operations, financial performance, and your vision for its future.

Looking forward to your response.

Best regards,
[Your name]`,
    },
  });

  const onSubmit = async (data: LoiFormValues) => {
    if (!user) {
      navigate("/login");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data: sellerProfile, error: profileError } = await supabase
        .from("profiles")
        .select("email, full_name")
        .eq("id", sellerId)
        .single();

      if (profileError) throw profileError;
      if (!sellerProfile.email) throw new Error("Seller email not found");

      const { data: listing, error: listingError } = await supabase
        .from("business_listings")
        .select("business_name, industry, description")
        .eq("id", listingId)
        .single();

      if (listingError) throw listingError;

      const { error: loiError } = await supabase
        .from("letters_of_intent")
        .insert({
          listing_id: listingId,
          buyer_id: user.id,
          seller_id: sellerId,
          content: data.content,
        });

      if (loiError) throw loiError;

      const shortDescription = listing.description
        .split('.')[0]
        .substring(0, 100)
        .trim();
      const genericTitle = `${listing.industry} Business - ${shortDescription}`;

      const { error: emailError } = await supabase.functions.invoke("send-notification", {
        body: {
          to: [sellerProfile.email],
          subject: `New Letter of Intent for Your ${listing.industry} Business`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1a365d;">You've Received a New Letter of Intent</h2>
              <p>Dear ${sellerProfile.full_name || 'Business Owner'},</p>
              <p>A potential buyer has submitted a Letter of Intent for your business listing: <strong>${genericTitle}</strong></p>
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1a365d; margin-top: 0;">Letter Content:</h3>
                <div style="white-space: pre-line; color: #4a5568;">
                  ${data.content}
                </div>
              </div>
              <p style="margin-top: 20px;">
                Please log in to your dashboard to review the full details and respond to this inquiry.
              </p>
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #718096;">
                <p>This is an automated message from BuyBizFast. Please do not reply directly to this email.</p>
              </div>
            </div>
          `
        }
      });

      if (emailError) {
        console.error("Error sending email notification:", emailError);
      }

      toast.success("Letter of Intent submitted successfully!");
      onSuccess?.();
    } catch (error) {
      console.error("Error submitting LOI:", error);
      toast.error("Failed to submit Letter of Intent. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Submit Letter of Intent</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <LOIFormContent form={form} />
            <div className="space-y-4">
              <LOISubmissionFee />
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit and Pay $20"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LetterOfIntentForm;