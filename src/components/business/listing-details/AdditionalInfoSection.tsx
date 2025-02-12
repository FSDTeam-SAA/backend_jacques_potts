import { BusinessListing } from "@/types/supabase";

interface AdditionalInfoSectionProps {
  listing: BusinessListing;
}

const AdditionalInfoSection = ({ listing }: AdditionalInfoSectionProps) => {
  return (
    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
      <h3 className="text-lg font-semibold mb-4">Additional Verified Information</h3>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium">Financial Metrics</h4>
          <p>Monthly Revenue: ${listing.monthly_revenue?.toLocaleString()}</p>
          <p>Debt to Equity Ratio: {listing.debt_to_equity_ratio}</p>
        </div>
        <div>
          <h4 className="font-medium">Business Operations</h4>
          <p>Recurring Revenue: {listing.recurring_revenue_percentage}%</p>
          <p>Customer Type: {listing.customer_type}</p>
        </div>
        {listing.api_verified_data && (
          <div>
            <h4 className="font-medium">API Verified Data</h4>
            <pre className="bg-white p-4 rounded text-sm">
              {JSON.stringify(listing.api_verified_data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdditionalInfoSection;