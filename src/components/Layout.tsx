import { useAuth } from "@/contexts/AuthContext";
import Navigation from "./navigation/Navigation";
import Footer from "./navigation/Footer";
import { BehaviorProvider } from "@/contexts/BehaviorContext";
import { lazy, Suspense } from "react";
import { CookieConsent } from "./gdpr/CookieConsent";
import { Toaster } from "@/components/ui/sonner";
import { Loader2 } from "lucide-react";

// Lazy load the suggestions container
const AISuggestionsContainer = lazy(() => 
  import("./suggestions/AISuggestionsContainer")
);

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user } = useAuth();

  return (
    <BehaviorProvider>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow w-full">
          {user && (
            <div className="container mx-auto px-4">
              <Suspense fallback={
                <div className="flex justify-center p-4">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              }>
                <AISuggestionsContainer />
              </Suspense>
            </div>
          )}
          {children}
        </main>
        <Footer />
      </div>
      <CookieConsent />
      <Toaster />
    </BehaviorProvider>
  );
};

export default Layout;