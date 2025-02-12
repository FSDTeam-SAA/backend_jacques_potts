import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import AdVerificationPanel from "@/components/admin/AdVerificationPanel";
import ContentModeration from "@/components/admin/ContentModeration";
import PlatformStats from "@/components/admin/PlatformStats";
import UserManagement from "@/components/admin/UserManagement";
import SettingsManagement from "@/components/admin/SettingsManagement";
import SupportRequestManagement from "@/components/admin/support/SupportRequestManagement";
import LawyerVerificationPanel from "@/components/admin/lawyer-verification/LawyerVerificationPanel";

const Admin = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs defaultValue="verification">
        <TabsList className="w-full">
          <TabsTrigger value="verification">Ad Verification</TabsTrigger>
          <TabsTrigger value="moderation">Content Moderation</TabsTrigger>
          <TabsTrigger value="stats">Platform Stats</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="support">Support Requests</TabsTrigger>
          <TabsTrigger value="lawyers">Lawyer Verification</TabsTrigger>
        </TabsList>

        <TabsContent value="verification">
          <Card className="p-6">
            <AdVerificationPanel />
          </Card>
        </TabsContent>

        <TabsContent value="moderation">
          <Card className="p-6">
            <ContentModeration />
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <Card className="p-6">
            <PlatformStats />
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card className="p-6">
            <UserManagement />
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="p-6">
            <SettingsManagement />
          </Card>
        </TabsContent>

        <TabsContent value="support">
          <Card className="p-6">
            <SupportRequestManagement />
          </Card>
        </TabsContent>

        <TabsContent value="lawyers">
          <Card className="p-6">
            <LawyerVerificationPanel />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;