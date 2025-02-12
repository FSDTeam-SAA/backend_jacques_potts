import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const AccountDeletionSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const handleAccountDeletion = async () => {
    if (!user) return;

    setIsDeletingAccount(true);
    try {
      await Promise.all([
        supabase.from("profiles").delete().eq("id", user.id),
        supabase.from("security_logs").delete().eq("user_id", user.id),
        supabase.from("user_behavior_logs").delete().eq("user_id", user.id),
        supabase.from("user_segments").delete().eq("user_id", user.id),
        supabase.from("premium_feature_usage").delete().eq("user_id", user.id),
        supabase.from("payment_methods").delete().eq("user_id", user.id),
        supabase.from("plaid_connections").delete().eq("user_id", user.id),
      ]);

      const { error } = await supabase.auth.admin.deleteUser(user.id);
      if (error) throw error;

      await supabase.auth.signOut();
      
      toast.success("Your account has been successfully deleted");
      navigate("/");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account. Please contact support.");
    } finally {
      setIsDeletingAccount(false);
    }
  };

  return (
    <div>
      <h4 className="font-medium mb-2">Delete Your Account</h4>
      <p className="text-sm text-muted-foreground mb-2">
        Permanently delete your account and all associated data. This action cannot be undone.
      </p>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Delete Account</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove all your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleAccountDeletion}
              disabled={isDeletingAccount}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeletingAccount ? "Deleting..." : "Yes, delete my account"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};