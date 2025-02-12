import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import GeneralSettings from "./settings/GeneralSettings";

const settingsSchema = z.object({
  verificationFee: z.string(),
  loiFee: z.string(),
  adListingFee: z.string(),
  templateAccessFee: z.string(),
  realEstateListingFee: z.string(),
  requireVerification: z.boolean(),
  autoApproveListings: z.boolean(),
});

const SettingsManagement = () => {
  const [isSaving, setIsSaving] = useState(false);

  const { data: settings } = useQuery({
    queryKey: ["platform-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("platform_settings")
        .select("*");
      
      if (error) throw error;
      
      const settingsMap = data.reduce((acc, setting) => {
        acc[setting.setting_name] = setting.setting_value;
        return acc;
      }, {});

      return settingsMap;
    },
  });

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      verificationFee: settings?.verification_fee?.toString() || "100.00",
      loiFee: settings?.loi_fee?.toString() || "20.00",
      adListingFee: settings?.ad_listing_price?.toString() || "25.00",
      templateAccessFee: settings?.template_access_fee?.toString() || "15.00",
      realEstateListingFee: settings?.real_estate_listing_fee?.toString() || "50.00",
      requireVerification: true,
      autoApproveListings: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof settingsSchema>) => {
    setIsSaving(true);
    try {
      const updates = [
        { setting_name: 'verification_fee', setting_value: Number(values.verificationFee) },
        { setting_name: 'loi_fee', setting_value: Number(values.loiFee) },
        { setting_name: 'ad_listing_price', setting_value: Number(values.adListingFee) },
        { setting_name: 'template_access_fee', setting_value: Number(values.templateAccessFee) },
        { setting_name: 'real_estate_listing_fee', setting_value: Number(values.realEstateListingFee) },
      ];

      const { error } = await supabase
        .from('platform_settings')
        .upsert(updates, { onConflict: 'setting_name' });

      if (error) throw error;
      toast.success("Settings saved successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Platform Settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage platform-wide settings and configurations
        </p>
      </div>

      <Separator />

      <GeneralSettings 
        form={form}
        isSaving={isSaving}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default SettingsManagement;