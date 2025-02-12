import { Table, TableBody } from "@/components/ui/table";
import { BusinessListing } from "@/types/business";
import PropertyFilters from "./PropertyFilters";
import ListingTableHeader from "./table/ListingTableHeader";
import ListingTableRow from "./table/ListingTableRow";

interface ListingsTableProps {
  listings: BusinessListing[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const ListingsTable = ({ listings, onApprove, onReject }: ListingsTableProps) => {
  const handleFilterChange = (filters: any) => {
    console.log("Filters changed:", filters);
    // TODO: Implement filter logic
  };

  return (
    <div className="space-y-4">
      <PropertyFilters onFilterChange={handleFilterChange} />
      
      <Table>
        <ListingTableHeader />
        <TableBody>
          {listings?.map((listing) => (
            <ListingTableRow
              key={listing.id}
              listing={listing}
              onApprove={onApprove}
              onReject={onReject}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListingsTable;