import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { assetSchema } from "./schema";
import type { AssetFormData } from "./types";
import AssetBasicInfo from "./form-sections/AssetBasicInfo";
import AssetImageUpload from "./form-sections/AssetImageUpload";

const AssetForm = () => {
  const navigate = useNavigate();
  const form = useForm<AssetFormData>({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      category: "Equipment",
      condition: "New",
      location: "",
      image_url: "",
    },
  });

  const onSubmit = async (data: AssetFormData) => {
    try {
      const { error } = await supabase
        .from("asset_listings")
        .insert({
          ...data,
          user_id: (await supabase.auth.getUser()).data.user?.id,
          status: "pending",
        });

      if (error) throw error;

      toast.success("Asset listing created successfully");
      navigate("/browse");
    } catch (error) {
      console.error("Error creating asset listing:", error);
      toast.error("Failed to create asset listing");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <AssetBasicInfo form={form} />
        <AssetImageUpload form={form} />
        
        <Button type="submit" className="w-full">
          Create Asset Listing
        </Button>
      </form>
    </Form>
  );
};

export default AssetForm;