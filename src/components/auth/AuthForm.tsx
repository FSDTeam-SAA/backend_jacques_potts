import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AuthFormProps {
  isJoining: boolean;
  onAuthSuccess?: () => void;
}

const AuthForm = ({ isJoining, onAuthSuccess }: AuthFormProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        toast.success('Successfully signed in!');
        if (onAuthSuccess) {
          onAuthSuccess();
        } else {
          navigate('/dashboard');
        }
      } else if (event === 'SIGNED_OUT') {
        toast.success('Successfully signed out!');
      } else if (event === 'USER_UPDATED') {
        toast.success('User information updated!');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, onAuthSuccess]);

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{
        theme: ThemeSupa,
        style: {
          button: {
            background: "#1a365d",
            color: "white",
            borderRadius: "0.375rem",
          },
          anchor: {
            color: "#1a365d",
          },
          message: {
            color: "#ef4444",
          },
          input: {
            borderRadius: "0.375rem",
          },
          container: {
            position: "relative",
          }
        },
        variables: {
          default: {
            colors: {
              brand: "#1a365d",
              brandAccent: "#2563eb",
            },
          },
        },
      }}
      view={isJoining ? "sign_up" : "sign_in"}
      providers={["google", "facebook"]}
      redirectTo={window.location.origin + '/auth/callback'}
      localization={{
        variables: {
          sign_in: {
            email_label: "Email",
            password_label: "Password",
            email_input_placeholder: "Your email address",
            password_input_placeholder: "Your password",
            button_label: "Sign In",
            loading_button_label: "Signing in...",
            link_text: "Already have an account? Sign in",
            social_provider_text: "Sign in with {{provider}}",
          },
          sign_up: {
            email_label: "Email",
            password_label: "Password",
            email_input_placeholder: "Your email address",
            password_input_placeholder: "Create a password",
            button_label: "Sign Up",
            loading_button_label: "Signing up...",
            link_text: "Don't have an account? Sign up",
            social_provider_text: "Sign up with {{provider}}",
          },
        },
      }}
    />
  );
};

export default AuthForm;