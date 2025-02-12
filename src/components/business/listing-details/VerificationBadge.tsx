import { BadgeCheck } from "lucide-react";

interface VerificationBadgeProps {
  isVerified: boolean;
}

const VerificationBadge = ({ isVerified }: VerificationBadgeProps) => {
  if (!isVerified) return null;

  return (
    <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full">
      <BadgeCheck className="w-5 h-5" />
      <span className="text-sm font-medium">Verified Business</span>
    </div>
  );
};

export default VerificationBadge;