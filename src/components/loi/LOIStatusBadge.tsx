import { Badge } from "@/components/ui/badge";

interface LOIStatusBadgeProps {
  status: string;
  type: "status" | "payment";
}

const LOIStatusBadge = ({ status, type }: LOIStatusBadgeProps) => {
  const getVariant = (status: string, type: "status" | "payment") => {
    const variants: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      completed: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
    };
    
    const label = type === "payment" ? `Payment: ${status}` : status;
    return (
      <Badge className={variants[status.toLowerCase()] || "bg-gray-100 text-gray-800"}>
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </Badge>
    );
  };

  return getVariant(status, type);
};

export default LOIStatusBadge;