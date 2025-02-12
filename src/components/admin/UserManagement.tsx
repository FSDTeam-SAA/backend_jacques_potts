import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import UserTableRow from "./user-management/UserTableRow";
import UserTableHeader from "./user-management/UserTableHeader";

const UserManagement = () => {
  const { data: users, isLoading, refetch } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">User Management</h2>
        <Button variant="outline">Export Users</Button>
      </div>

      <Table>
        <TableHeader>
          <UserTableHeader />
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <UserTableRow 
              key={user.id} 
              user={user} 
              onRefetch={refetch}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserManagement;