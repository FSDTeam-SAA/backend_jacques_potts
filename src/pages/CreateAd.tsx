import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import AdBasicInfo from "@/components/ads/form-sections/AdBasicInfo";
import AdImageUpload from "@/components/ads/form-sections/AdImageUpload";
import AdCategorySelect from "@/components/ads/form-sections/AdCategorySelect";
import { useQuery } from "@tanstack/react-query";

const adSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a valid number greater than 0",
  }),
  location: z.string().min(3, "Location is required"),
  category_id: z.string().uuid("Please select a category"),
  image_url: z.string().optional(),
});

type AdFormValues = z.infer<typeof adSchema>;

const CreateAd = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: listingFee } = useQuery({
    queryKey: ["ad-listing-fee"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("platform_settings")
        .select("setting_value")
        .eq("setting_name", "ad_listing_price")
        .single();
      
      if (error) throw error;
      return data.setting_value;
    },
  });

  const form = useForm<AdFormValues>({
    resolver: zodResolver(adSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      location: "",
      category_id: "",
    },
  });

  const handlePayment = async () => {
    try {
      const response = await supabase.functions.invoke('create-checkout-session', {
        body: { featureType: 'ad_listing' },
      });

      if (response.error) throw response.error;
      if (!response.data?.url) throw new Error('No checkout URL received');

      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Failed to process payment');
      return false;
    }
  };

  const onSubmit = async (data: AdFormValues) => {
    if (!user) {
      toast.error("Please login to create an ad");
      return;
    }

    try {
      // First handle the payment
      const paymentSuccess = await handlePayment();
      if (!paymentSuccess) return;

      const { data: ad, error: adError } = await supabase
        .from("ads")
        .insert({
          user_id: user.id,
          title: data.title,
          description: data.description,
          price: Number(data.price),
          location: data.location,
          category_id: data.category_id,
        })
        .select()
        .single();

      if (adError) throw adError;

      if (data.image_url) {
        const { error: imageError } = await supabase
          .from("ad_images")
          .insert({
            ad_id: ad.id,
            image_url: data.image_url,
            is_primary: true,
          });

        if (imageError) throw imageError;
      }

      toast.success("Ad created successfully! Waiting for admin approval.");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating ad:", error);
      toast.error("Failed to create ad. Please try again.");
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-2">Create New Listing</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Listing fee: ${listingFee?.toFixed(2) || "25.00"}
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <AdBasicInfo form={form} />
          <AdCategorySelect form={form} />
          <AdImageUpload form={form} />
          <Button type="submit" className="w-full">
            Submit and Pay
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateAd;