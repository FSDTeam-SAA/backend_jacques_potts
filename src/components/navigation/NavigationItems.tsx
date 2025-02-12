import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import NavItems from "./NavItems";

interface NavigationItemsProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

const NavigationItems = ({ isMobile = false, onItemClick }: NavigationItemsProps) => {
  const { user } = useAuth();
  const location = useLocation();

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const getNavItems = () => {
    if (user) {
      const items = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Sell", path: "/sell" },
        { name: "Browse", path: "/browse" },
        { name: "Due Diligence", path: "/due-diligence" },
      ];

      if (profile?.is_admin) {
        items.push({ name: "Admin", path: "/admin" });
      }

      return items;
    }
    return [
      { name: "Sell", path: "/sell" },
      { name: "Browse", path: "/browse" },
      { name: "Due Diligence", path: "/due-diligence" },
    ];
  };

  return <NavItems items={getNavItems()} isMobile={isMobile} onItemClick={onItemClick} />;
};

export default NavigationItems;