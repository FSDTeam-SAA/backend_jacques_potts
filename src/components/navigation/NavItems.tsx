import { Link } from "react-router-dom";

interface NavItem {
  name: string;
  path: string;
}

interface NavItemsProps {
  items: NavItem[];
  isMobile?: boolean;
  onItemClick?: () => void;
}

const NavItems = ({ items, isMobile = false, onItemClick }: NavItemsProps) => {
  const baseClasses = "transition-colors";
  const mobileClasses = "block w-full text-lg text-white/90 hover:text-white px-4 py-3";
  const desktopClasses = "text-white/80 hover:text-white px-3 py-2";

  return (
    <nav className={isMobile ? "flex flex-col w-full space-y-2" : "hidden md:flex items-center space-x-4"}>
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`}
          onClick={onItemClick}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default NavItems;