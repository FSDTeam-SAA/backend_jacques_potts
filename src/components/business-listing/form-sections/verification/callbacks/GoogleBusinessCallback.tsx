import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const GoogleBusinessCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code");
      const state = searchParams.get("state");

      if (!code || !state) {
        toast({
          title: "Error",
          description: "Missing required parameters",
          variant: "destructive",
        });
        navigate("/sell");
        return;
      }

      try {
        console.log("Processing Google Business callback");
        const { error } = await supabase.functions.invoke("google-business-callback", {
          body: { code, state }
        });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Google Business account connected successfully",
        });
      } catch (error) {
        console.error("Google Business callback error:", error);
        toast({
          title: "Error",
          description: "Failed to connect Google Business account",
          variant: "destructive",
        });
      }

      navigate("/sell");
    };

    handleCallback();
  }, [searchParams, navigate, toast]);

  return <div>Connecting your Google Business account...</div>;
};