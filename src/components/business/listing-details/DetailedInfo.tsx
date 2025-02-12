import { BusinessListing } from "@/types/supabase";
import { toast } from "sonner";

interface DetailedInfoProps {
  listing: BusinessListing;
}

const DetailedInfo = ({ listing }: DetailedInfoProps) => {
  if (!listing) {
    toast.error("Listing information is not available");
    return null;
  }

  const formatCurrency = (value: number | null) => {
    if (!value) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number | null) => {
    if (!value) return 'N/A';
    return `${value}%`;
  };

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Business Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium">Industry</h4>
            <p className="text-gray-600">{listing.industry || 'N/A'}</p>
          </div>
          <div>
            <h4 className="font-medium">Location</h4>
            <p className="text-gray-600">{listing.location || 'N/A'}</p>
          </div>
          <div>
            <h4 className="font-medium">Yearly Revenue</h4>
            <p className="text-gray-600">{formatCurrency(listing.yearly_revenue)}</p>
          </div>
          <div>
            <h4 className="font-medium">Monthly Revenue</h4>
            <p className="text-gray-600">{formatCurrency(listing.monthly_revenue)}</p>
          </div>
          {listing.profit_margin && (
            <div>
              <h4 className="font-medium">Profit Margin</h4>
              <p className="text-gray-600">{formatPercentage(Number(listing.profit_margin))}</p>
            </div>
          )}
        </div>
      </section>

      {listing.description && (
        <section className="space-y-4">
          <h3 className="text-xl font-semibold">Description</h3>
          <p className="text-gray-600 whitespace-pre-wrap">{listing.description}</p>
        </section>
      )}

      {listing.property_features && (
        <section className="space-y-4">
          <h3 className="text-xl font-semibold">Property Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(listing.property_features).map(([key, value]) => (
              <div key={key}>
                <h4 className="font-medium">{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h4>
                <p className="text-gray-600">{String(value)}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default DetailedInfo;