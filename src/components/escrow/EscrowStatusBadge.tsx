import { Badge } from "@/components/ui/badge";
import type { EscrowStatus } from "@/types/escrow";

interface EscrowStatusBadgeProps {
  status: EscrowStatus;
}

const EscrowStatusBadge = ({ status }: EscrowStatusBadgeProps) => {
  const variants: Record<EscrowStatus, "default" | "secondary" | "destructive" | "outline"> = {
    pending: "outline",
    in_progress: "secondary",
    completed: "default",
    cancelled: "destructive",
    disputed: "destructive"
  };

  return (
    <Badge variant={variants[status]}>
      {status.replace('_', ' ')}
    </Badge>
  );
};

export default EscrowStatusBadge;