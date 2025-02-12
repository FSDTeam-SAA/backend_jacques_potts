import { Ad } from "@/types/business";
import AdCard from "./AdCard";
import EmptyState from "./EmptyState";

interface AdVerificationListProps {
  ads: Ad[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  isUpdating: boolean;
}

const AdVerificationList = ({
  ads,
  onApprove,
  onReject,
  isUpdating,
}: AdVerificationListProps) => {
  if (!ads?.length) {
    return <EmptyState />;
  }

  return (
    <div className="grid gap-4">
      {ads.map((ad) => (
        <AdCard
          key={ad.id}
          ad={ad}
          onApprove={onApprove}
          onReject={onReject}
          isUpdating={isUpdating}
        />
      ))}
    </div>
  );
};

export default AdVerificationList;