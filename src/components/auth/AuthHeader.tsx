interface AuthHeaderProps {
  isJoining: boolean;
}

const AuthHeader = ({ isJoining }: AuthHeaderProps) => {
  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-2">
        {isJoining ? "Create an Account" : "Welcome Back"}
      </h1>
      <p className="text-muted-foreground text-center mb-6">
        {isJoining
          ? "Join Buy Biz Fast to start exploring business opportunities"
          : "Sign in to access your account"}
      </p>
    </>
  );
};

export default AuthHeader;