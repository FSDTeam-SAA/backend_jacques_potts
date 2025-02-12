import { Card, CardContent } from "@/components/ui/card";

export default function EmptyState() {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-center text-muted-foreground">
          You haven't purchased any due diligence packages yet.
        </p>
      </CardContent>
    </Card>
  );
}