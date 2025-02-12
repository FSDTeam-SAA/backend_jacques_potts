import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BusinessListing } from "@/types/business";

interface ListingTableRowProps {
  listing: BusinessListing;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const ListingTableRow = ({ listing, onApprove, onReject }: ListingTableRowProps) => {
  return (
    <TableRow key={listing.id}>
      <TableCell>{listing.business_name}</TableCell>
      <TableCell>
        {listing.is_temporary ? (
          <Badge variant="secondary">Temporary</Badge>
        ) : (
          listing.profiles?.full_name || listing.profiles?.email || "N/A"
        )}
      </TableCell>
      <TableCell>
        <Badge
          className={
            listing.status === "published"
              ? "bg-green-500"
              : listing.status === "rejected"
              ? "bg-red-500"
              : "bg-yellow-500"
          }
        >
          {listing.status}
        </Badge>
      </TableCell>
      <TableCell>
        {listing.is_temporary ? (
          <Badge variant="secondary">Temporary</Badge>
        ) : (
          <Badge variant="default">Real</Badge>
        )}
      </TableCell>
      <TableCell>
        {new Date(listing.created_at).toLocaleDateString()}
      </TableCell>
      <TableCell className="space-x-2">
        {!listing.is_temporary && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onApprove(listing.id)}
              disabled={listing.status === "published"}
            >
              Approve
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onReject(listing.id)}
              disabled={listing.status === "rejected"}
              className="text-red-500 hover:text-red-600"
            >
              Reject
            </Button>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default ListingTableRow;