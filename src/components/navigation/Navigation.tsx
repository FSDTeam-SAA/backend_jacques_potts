import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";
import BrandName from "./BrandName";
import NavigationItems from "./NavigationItems";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navigation = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isOnSellPage = location.pathname === "/sell";

  return (
    <nav className="bg-[#1a365d] text-white sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between min-h-[4rem] px-4 sm:px-6 lg:px-8">
          <div className="flex-shrink-0 flex items-center">
            <BrandName isOnSellPage={isOnSellPage} />
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-6 lg:space-x-8">
            <NavigationItems />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <UserMenu user={user} />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          items={[]}
          user={user}
        />
      </div>
    </nav>
  );
};

export default Navigation;