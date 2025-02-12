import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface UserMenuProps {
  user: any;
  isMobile?: boolean;
}

const UserMenu = ({ user, isMobile = false }: UserMenuProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Successfully logged out");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4 items-stretch md:items-center`}>
        <Link
          to="/login"
          className="px-4 py-2 rounded-md bg-white text-[#1a365d] hover:bg-white/90 transition-colors text-center"
        >
          Login
        </Link>
        <Link
          to="/login?join=true"
          className={`px-4 py-2 rounded-md bg-white/10 text-white hover:bg-white/20 transition-colors text-center ${
            isMobile ? 'block' : 'hidden md:block'
          }`}
        >
          Join Now
        </Link>
      </div>
    );
  }

  return (
    <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4 items-stretch md:items-center`}>
      <Link
        to="/profile"
        className="flex items-center justify-center md:justify-start gap-2 text-white/80 hover:text-white transition-colors"
      >
        <UserCircle className="h-5 w-5" />
        <span className={isMobile ? 'inline' : 'md:hidden lg:inline'}>Profile</span>
      </Link>
      <Button
        onClick={handleLogout}
        variant="outline"
        className="bg-white/10 text-white hover:bg-white/20 transition-colors w-full md:w-auto"
      >
        Logout
      </Button>
    </div>
  );
};

export default UserMenu;