import { TableHead, TableRow } from "@/components/ui/table";

const UserTableHeader = () => {
  return (
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Location</TableHead>
      <TableHead>Actions</TableHead>
    </TableRow>
  );
};

export default UserTableHeader;