import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const YelpCallback = () => {
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
        const { error } = await supabase.functions.invoke("yelp-callback", {
          body: { code, state },
        });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Yelp account connected successfully",
        });
      } catch (error) {
        console.error("Yelp callback error:", error);
        toast({
          title: "Error",
          description: "Failed to connect Yelp account",
          variant: "destructive",
        });
      }

      navigate("/sell");
    };

    handleCallback();
  }, [searchParams, navigate, toast]);

  return <div>Connecting your Yelp account...</div>;
};