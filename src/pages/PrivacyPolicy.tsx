import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <h2>1. Information We Collect</h2>
          <p>We collect information that you provide directly to us, including:</p>
          <ul>
            <li>Name and contact information</li>
            <li>Business details and financial information</li>
            <li>Communication records and messages</li>
            <li>Account credentials</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Facilitate business listings and transactions</li>
            <li>Process payments and verify identities</li>
            <li>Communicate with users about their listings and offers</li>
            <li>Improve our services and user experience</li>
          </ul>

          <h2>3. Information Sharing</h2>
          <p>We share information only:</p>
          <ul>
            <li>With your consent</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights and prevent fraud</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>We implement appropriate security measures to protect your information, including:</p>
          <ul>
            <li>Encryption of sensitive data</li>
            <li>Secure database management</li>
            <li>Regular security audits</li>
          </ul>

          <h2>5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
          </ul>

          <h2>6. Contact Us</h2>
          <p>For privacy-related inquiries, please contact our Data Protection Officer at privacy@example.com</p>

          <p className="text-sm text-gray-500 mt-8">Last updated: {new Date().toLocaleDateString()}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;