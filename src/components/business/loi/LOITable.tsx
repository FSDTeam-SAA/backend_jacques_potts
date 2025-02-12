import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

interface LOITableProps {
  lois: any[];
  type: "received" | "sent";
  isLoading: boolean;
}

const LOITable = ({ lois, type, isLoading }: LOITableProps) => {
  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      accepted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return (
      <Badge className={statusColors[status] || "bg-gray-100 text-gray-800"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!lois?.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No {type} Letters of Intent found
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Business</TableHead>
          <TableHead>{type === "received" ? "From" : "To"}</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Payment Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {lois.map((loi) => (
          <TableRow key={loi.id}>
            <TableCell>{loi.business_listings?.business_name}</TableCell>
            <TableCell>
              {type === "received"
                ? loi.profiles?.full_name || loi.profiles?.email
                : loi.profiles?.full_name || loi.profiles?.email}
            </TableCell>
            <TableCell>
              {format(new Date(loi.created_at), "MMM d, yyyy")}
            </TableCell>
            <TableCell>{getStatusBadge(loi.status)}</TableCell>
            <TableCell>{getStatusBadge(loi.payment_status)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LOITable;