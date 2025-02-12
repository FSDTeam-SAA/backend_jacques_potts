import { Card, CardContent } from "@/components/ui/card";

const EmptyState = () => {
  return (
    <Card>
      <CardContent className="p-6 text-center text-gray-500">
        No pending ads to verify
      </CardContent>
    </Card>
  );
};

export default EmptyState;