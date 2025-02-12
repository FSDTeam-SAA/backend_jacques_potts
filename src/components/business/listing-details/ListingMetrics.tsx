import { BusinessListing } from "@/types/supabase";
import { Card } from "@/components/ui/card";
import { Users, Clock, TrendingUp, Building } from "lucide-react";

interface ListingMetricsProps {
  listing: BusinessListing;
}

const ListingMetrics = ({ listing }: ListingMetricsProps) => {
  if (!listing) return null;

  const metrics = [
    {
      label: "Employees",
      value: listing.employee_count || "N/A",
      icon: Users,
    },
    {
      label: "Years in Operation",
      value: listing.years_in_operation || "N/A",
      icon: Clock,
    },
    {
      label: "Growth Rate",
      value: listing.scalability_rating ? `${listing.scalability_rating}/10` : "N/A",
      icon: TrendingUp,
    },
    {
      label: "Property Type",
      value: listing.property_type || "N/A",
      icon: Building,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <Card key={metric.label} className="p-4">
          <div className="flex items-center gap-3">
            <metric.icon className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">{metric.label}</p>
              <p className="font-semibold">{metric.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ListingMetrics;