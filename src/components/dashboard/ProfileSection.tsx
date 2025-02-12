import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UserCircle, MapPin, Building2 } from "lucide-react";

interface ProfileSectionProps {
  profile: any;
}

const ProfileSection = ({ profile }: ProfileSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Full Name</p>
          <p className="font-medium flex items-center gap-2">
            <UserCircle className="w-4 h-4" />
            {profile?.full_name || "Not set"}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Role</p>
          <p className="font-medium flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            {profile?.role ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1) : "Not set"}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Location</p>
          <p className="font-medium flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {profile?.city && profile?.state
              ? `${profile.city}, ${profile.state}`
              : "Not set"}
          </p>
        </div>
        <Link to="/profile">
          <Button variant="outline" className="w-full">
            Edit Profile
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;