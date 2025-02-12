import { Star } from "lucide-react";
import { VerificationDialog } from "@/components/verification/VerificationDialog";

const VerificationBanner = () => {
  return (
    <div className="bg-[#1a365d]/5 p-6 rounded-lg mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Star className="w-8 h-8 text-[#1a365d]" />
          <div>
            <h3 className="font-semibold text-[#1a365d]">Get Verified</h3>
            <p className="text-sm text-gray-600">Verified users get 2x more engagement</p>
          </div>
        </div>
        <VerificationDialog />
      </div>
    </div>
  );
};

export default VerificationBanner;