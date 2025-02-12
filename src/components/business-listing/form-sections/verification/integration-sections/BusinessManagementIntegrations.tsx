import { useState } from "react";
import { IntegrationButton } from "../IntegrationButton";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface BusinessManagementIntegrationsProps {
  handleIntegrationClick: (key: string) => void;
}

export const BusinessManagementIntegrations = ({
  handleIntegrationClick,
}: BusinessManagementIntegrationsProps) => {
  const [shopifyUrl, setShopifyUrl] = useState("");
  const [showShopifyDialog, setShowShopifyDialog] = useState(false);

  const handleShopifyConnect = () => {
    if (shopifyUrl) {
      // Extract the shop domain from the URL
      const shopDomain = shopifyUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
      handleIntegrationClick(`shopify?shop=${shopDomain}`);
      setShowShopifyDialog(false);
    }
  };

  return (
    <div className="space-y-3">
      <h5 className="text-sm font-medium text-muted-foreground">Business Management</h5>
      
      <Dialog open={showShopifyDialog} onOpenChange={setShowShopifyDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            Shopify Integration
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect Your Shopify Store</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Shopify Store URL</label>
              <Input
                placeholder="mystore.myshopify.com"
                value={shopifyUrl}
                onChange={(e) => setShopifyUrl(e.target.value)}
              />
            </div>
            <Button onClick={handleShopifyConnect} className="w-full">
              Connect Store
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <IntegrationButton
        label="Square Integration"
        integrationKey="square"
        onClick={handleIntegrationClick}
      />
      {/* <IntegrationButton
        label="Thryv Integration"
        integrationKey="thryv"
        onClick={handleIntegrationClick}
      /> */}
    </div>
  );
};