import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const DataExportSection = () => {
  const { user } = useAuth();

  const handleDataExport = async () => {
    if (!user) return;

    try {
      const [profileData, securityLogs] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).single(),
        supabase.from("security_logs").select("*").eq("user_id", user.id),
      ]);

      const exportData = {
        profile: profileData.data,
        security_logs: securityLogs.data,
        exported_at: new Date().toISOString(),
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `data-export-${new Date().toISOString()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("Your data has been exported successfully");
    } catch (error) {
      console.error("Error exporting data:", error);
      toast.error("Failed to export data. Please try again.");
    }
  };

  return (
    <div>
      <h4 className="font-medium mb-2">Export Your Data</h4>
      <p className="text-sm text-muted-foreground mb-2">
        Download a copy of your personal data in JSON format.
      </p>
      <Button onClick={handleDataExport}>Export Data</Button>
    </div>
  );
};