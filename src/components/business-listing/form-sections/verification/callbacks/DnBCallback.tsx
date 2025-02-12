import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const DnBCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code");
      const state = searchParams.get("state");
      
      if (!code) {
        toast({
          title: "Error",
          description: "No authorization code received from D&B",
          variant: "destructive",
        });
        navigate("/sell");
        return;
      }

      try {
        const { error } = await supabase.functions.invoke('dnb-callback', {
          body: { code, state }
        });

        if (error) throw error;

        toast({
          title: "Success",
          description: "D&B verification completed successfully",
        });
      } catch (error) {
        console.error('D&B callback error:', error);
        toast({
          title: "Error",
          description: "Failed to complete D&B verification",
          variant: "destructive",
        });
      }

      navigate("/sell");
    };

    handleCallback();
  }, [searchParams, navigate, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Processing D&B Verification</h2>
        <p className="text-gray-600">Please wait while we complete your verification...</p>
      </div>
    </div>
  );
};