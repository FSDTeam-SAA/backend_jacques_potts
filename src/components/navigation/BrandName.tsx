import { Link } from "react-router-dom";

interface BrandNameProps {
  isOnSellPage: boolean;
}

const BrandName = ({ isOnSellPage }: BrandNameProps) => {
  return (
    <Link to="/" className="text-2xl font-bold text-white hover:text-white/90 transition-colors">
      Buy Biz Fast
    </Link>
  );
};

export default BrandName;