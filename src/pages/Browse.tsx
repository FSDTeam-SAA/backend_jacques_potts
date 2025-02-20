import BrowseTabManager from "@/components/browse/BrowseTabManager";
import HeroSection from "@/components/browse/HeroSection";
import VerificationBanner from "@/components/browse/VerificationBanner";
import { PaymentMethodCheck } from "@/components/PaymentMethodCheck";
import { usePremiumFeatures } from "@/contexts/PremiumFeaturesContext";
import { useFeaturePayment } from "@/hooks/useFeaturePayment";
import { useFilterManagement } from "@/hooks/useFilterManagement";
import { useState } from "react";

const Browse = () => {
  const { features } = usePremiumFeatures();
  const { purchaseFeature } = useFeaturePayment();
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const isDynamicActive = features.find(
    (f) => f.type === "dynamic_filters"
  )?.isActive;
  const [activeTab, setActiveTab] = useState("businesses");

  const { filters, handleFilterChange, handleFilterReset } =
    useFilterManagement();

  return (
    <>
      <PaymentMethodCheck isOpen={showPaymentDialog} setIsOpen={setShowPaymentDialog} onPaymentComplete={() => setShowPaymentDialog(false)}>
        <div className="container mx-auto px-4 py-6 space-y-6">
          <HeroSection activeTab={activeTab} />

          <VerificationBanner />

          <BrowseTabManager
            activeTab={activeTab}
            onTabChange={setActiveTab}
            filters={filters}
            isDynamicActive={isDynamicActive}
            onFilterChange={handleFilterChange}
            onFilterReset={handleFilterReset}
            setShowPaymentDialog={setShowPaymentDialog}
          />
        </div>
      </PaymentMethodCheck>
    </>
  );
};

export default Browse;
