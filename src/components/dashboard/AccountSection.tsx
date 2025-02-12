import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaidLink } from "@/components/plaid/PlaidLink";
import { Mail } from "lucide-react";

interface AccountSectionProps {
  user: any;
}

const AccountSection = ({ user }: AccountSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="font-medium flex items-center gap-2">
            <Mail className="w-4 h-4" />
            {user?.email}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Financial Connection</p>
          <div className="mt-2">
            <PlaidLink />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSection;