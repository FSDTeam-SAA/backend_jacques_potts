import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ListingDetailsErrorProps {
  error: Error | null;
  onRetry: () => void;
}

const ListingDetailsError = ({ error, onRetry }: ListingDetailsErrorProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-6 text-center">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-red-600">Error Loading Listing</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">{error?.message || "Listing not found"}</p>
          <Button onClick={onRetry}>Try Again</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListingDetailsError;