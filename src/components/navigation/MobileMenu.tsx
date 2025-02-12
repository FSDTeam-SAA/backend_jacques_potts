import { User } from "@supabase/supabase-js";
import UserMenu from "./UserMenu";
import { X } from "lucide-react";
import NavigationItems from "./NavigationItems";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: { name: string; path: string }[];
  user: User | null;
}

const MobileMenu = ({ isOpen, onClose, user }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-50 bg-[#1a365d]">
      <div className="flex flex-col h-full">
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-white hover:text-white/80 p-2"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-2">
          <NavigationItems isMobile={true} onItemClick={onClose} />
        </div>
        <div className="mt-auto p-4 border-t border-white/10">
          <UserMenu user={user} isMobile={true} />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;