import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AuthPrompt = () => {
  return (
    <Card className="p-6 mb-6 bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="text-lg">Sign Up to Access More Features</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          Create an account to contact sellers, view detailed information, and access premium features.
        </p>
        <Link to="/login">
          <Button>Sign Up or Login</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default AuthPrompt;