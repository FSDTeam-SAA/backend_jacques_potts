import PackageCard from "./PackageCard";

interface PackageGridProps {
  packages: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    features: string[];
  }>;
}

export default function PackageGrid({ packages }: PackageGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {packages?.map((pkg) => (
        <PackageCard key={pkg.id} pkg={pkg} />
      ))}
    </div>
  );
}