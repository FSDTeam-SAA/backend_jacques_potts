import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const useAdminCheck = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["admin-check", user?.id],
    queryFn: async () => {
      if (!user) {
        console.error("No user found");
        throw new Error("Authentication required");
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .maybeSingle();
      
      if (profileError) {
        console.error("Error fetching profile:", profileError);
        throw profileError;
      }

      if (!profile?.is_admin) {
        console.error("User is not an admin");
        throw new Error("Unauthorized: User is not an admin");
      }

      return profile.is_admin;
    },
  });
};