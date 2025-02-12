import { IntegrationButton } from "../IntegrationButton";
import { PlaidLink } from "@/components/plaid/PlaidLink";

interface FinancialIntegrationsProps {
  handleIntegrationClick: (key: string) => void;
  handlePlaidSuccess: () => void;
}

export const FinancialIntegrations = ({
  handleIntegrationClick,
  handlePlaidSuccess,
}: FinancialIntegrationsProps) => {
  return (
    <div className="space-y-3">
      <h5 className="text-sm font-medium text-muted-foreground">Financial & Accounting</h5>
      <PlaidLink onSuccess={handlePlaidSuccess} />
      <IntegrationButton
        label="QuickBooks Integration"
        integrationKey="quickbooks"
        onClick={handleIntegrationClick}
      />
      <IntegrationButton
        label="Xero Integration"
        integrationKey="xero"
        onClick={handleIntegrationClick}
      />
    </div>
  );
};