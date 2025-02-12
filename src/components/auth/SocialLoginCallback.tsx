import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const SocialLoginCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error during social login:", error);
          toast.error("Failed to complete social login");
          navigate("/login");
          return;
        }

        if (session) {
          toast.success("Successfully logged in!");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error handling social login callback:", error);
        toast.error("Failed to complete social login");
        navigate("/login");
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
};

export default SocialLoginCallback;