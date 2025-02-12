import ProfileForm from "@/components/profile/ProfileForm";
import TwoFactorAuth from "@/components/profile/TwoFactorAuth";
import { PrivacyCenter } from "@/components/gdpr/PrivacyCenter";
import BillingSection from "@/components/profile/BillingSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Profile Settings</h1>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileForm />
        </TabsContent>

        <TabsContent value="billing">
          <BillingSection />
        </TabsContent>

        <TabsContent value="security">
          <TwoFactorAuth />
        </TabsContent>

        <TabsContent value="privacy">
          <PrivacyCenter />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;