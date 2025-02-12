import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import AssetBasicInfo from "@/components/assets/form-sections/AssetBasicInfo";
import AssetImageUpload from "@/components/assets/form-sections/AssetImageUpload";
import EscrowSection from "@/components/assets/form-sections/EscrowSection";
import { assetSchema } from "@/components/assets/schema";
import type { AssetFormData } from "@/components/assets/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const CreateAsset = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  const form = useForm<AssetFormData>({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      category: "Equipment",
      condition: "New",
      location: "",
    },
  });

  const onSubmit = async (data: AssetFormData) => {
    if (!agreeToTerms) {
      toast.error("You must agree to the terms and conditions");
      return;
    }

    try {
      // If user is not logged in, create an account first
      if (!user) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        // Wait for the auth state to update
        const { data: authData } = await supabase.auth.getSession();
        if (!authData.session?.user) {
          throw new Error("Failed to create account");
        }
      }

      // Now create the asset listing
      const { error: assetError } = await supabase
        .from("asset_listings")
        .insert({
          ...data,
          user_id: user?.id || (await supabase.auth.getUser()).data.user?.id,
          status: "published",
        });

      if (assetError) throw assetError;

      toast.success("Asset listed successfully");
      navigate("/assets");
    } catch (error) {
      console.error("Error creating asset:", error);
      toast.error("Failed to create asset listing");
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">List an Asset</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <AssetBasicInfo form={form} />
          <AssetImageUpload form={form} />
          <EscrowSection form={form} />
          
          {!user && (
            <div className="space-y-4 border p-4 rounded-lg">
              <h2 className="text-lg font-semibold">Create Account</h2>
              <p className="text-sm text-muted-foreground">
                To list an asset, you'll need an account. We'll create one for you.
              </p>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={agreeToTerms}
              onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
            />
            <Label htmlFor="terms" className="text-sm">
              I agree to the terms and conditions
            </Label>
          </div>
          
          <Button type="submit" className="w-full">
            Create Listing
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateAsset;