import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Settings = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email Notifications</label>
            <Button variant="outline">Manage Notifications</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;