import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ListingTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Business Name</TableHead>
        <TableHead>Owner</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Type</TableHead>
        <TableHead>Created</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default ListingTableHeader;