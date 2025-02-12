import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EULA = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>End-User License Agreement (EULA)</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <h2>1. Acceptance of Agreement</h2>
          <p>By accessing and using Buy Biz Fast, you agree to be bound by this End-User License Agreement.</p>

          <h2>2. License Grant</h2>
          <p>We grant you a limited, non-exclusive, non-transferable license to:</p>
          <ul>
            <li>Access and use the platform for business discovery and transactions</li>
            <li>Create and manage business listings</li>
            <li>Interact with other users through our messaging system</li>
          </ul>

          <h2>3. Usage Restrictions</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the platform for any illegal purposes</li>
            <li>Attempt to circumvent any platform security measures</li>
            <li>Share or distribute confidential business information</li>
            <li>Create multiple accounts for deceptive purposes</li>
          </ul>

          <h2>4. Data Usage</h2>
          <p>By using our platform, you acknowledge that:</p>
          <ul>
            <li>We collect and process data as outlined in our Privacy Policy</li>
            <li>Your business listing information will be visible to other users</li>
            <li>We may use aggregated data for platform improvements</li>
          </ul>

          <h2>5. Intellectual Property</h2>
          <ul>
            <li>The platform and its content remain our intellectual property</li>
            <li>You retain rights to your business listing content</li>
            <li>You grant us license to display your listing information</li>
          </ul>

          <h2>6. Termination</h2>
          <p>We reserve the right to:</p>
          <ul>
            <li>Terminate accounts that violate this agreement</li>
            <li>Remove content that violates our terms</li>
            <li>Modify or discontinue services with notice</li>
          </ul>

          <h2>7. Disclaimer of Warranties</h2>
          <p>The platform is provided "as is" without warranties of any kind.</p>

          <h2>8. Limitation of Liability</h2>
          <p>Our liability is limited to the extent permitted by law.</p>

          <p className="text-sm text-gray-500 mt-8">Last updated: {new Date().toLocaleDateString()}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EULA;