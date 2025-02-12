import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import DeleteUserDialog from "./DeleteUserDialog";

interface UserTableRowProps {
  user: {
    id: string;
    full_name: string;
    email: string;
    is_verified: boolean;
    city: string;
    state: string;
    country: string;
  };
  onRefetch: () => void;
}

const UserTableRow = ({ user, onRefetch }: UserTableRowProps) => {
  const handleVerifyUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ is_verified: true, verification_date: new Date().toISOString() })
        .eq("id", userId);

      if (error) throw error;
      toast.success("User verified successfully");
      onRefetch();
    } catch (error) {
      console.error("Error verifying user:", error);
      toast.error("Failed to verify user");
    }
  };

  return (
    <TableRow>
      <TableCell>{user.full_name || "N/A"}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>
        {user.is_verified ? (
          <Badge className="bg-green-500">
            <CheckCircle className="w-4 h-4 mr-1" />
            Verified
          </Badge>
        ) : (
          <Badge variant="secondary">
            <XCircle className="w-4 h-4 mr-1" />
            Unverified
          </Badge>
        )}
      </TableCell>
      <TableCell>
        {[user.city, user.state, user.country]
          .filter(Boolean)
          .join(", ") || "N/A"}
      </TableCell>
      <TableCell className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleVerifyUser(user.id)}
          disabled={user.is_verified}
        >
          Verify
        </Button>
        <DeleteUserDialog userId={user.id} onDelete={onRefetch} />
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;