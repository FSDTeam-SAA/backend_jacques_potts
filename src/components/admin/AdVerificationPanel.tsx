import { useAdVerification } from "./ad-verification/hooks/useAdVerification";
import AdVerificationList from "./ad-verification/AdVerificationList";
import AdStats from "./ad-verification/AdStats";
import type { Ad } from "@/types/business";

const AdVerificationPanel = () => {
  const { pendingAds, isUpdating, updateAdStatus } = useAdVerification();

  return (
    <div className="space-y-6">
      <AdStats pendingCount={pendingAds?.length || 0} />
      <AdVerificationList
        ads={(pendingAds || []) as Ad[]}
        onApprove={(id) => updateAdStatus(id, "approved")}
        onReject={(id) => updateAdStatus(id, "rejected")}
        isUpdating={isUpdating}
      />
    </div>
  );
};

export default AdVerificationPanel;