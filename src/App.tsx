import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import { BehaviorProvider } from "./contexts/BehaviorContext";
import { PremiumFeaturesProvider } from "./contexts/PremiumFeaturesContext";
import { PaymentProvider } from "./contexts/PaymentContext";
import Layout from "./components/Layout";
import AppRoutes from "./AppRoutes";
import { Toaster } from "./components/ui/sonner";
import { useEffect, Suspense } from "react";
import { supabase } from "./integrations/supabase/client";
import { Loader2 } from "lucide-react";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30000, // Increased stale time to reduce refetches
      gcTime: 3600000, // Cache data for 1 hour
    }
  }
});

// Loading fallback component with better visual feedback
const LoadingFallback = () => (
  <div className="h-screen w-screen flex items-center justify-center bg-background/50">
    <div className="flex flex-col items-center gap-2">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  </div>
);

function App() {
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
        }
        console.log('Session initialized:', session ? 'active' : 'none');
      } catch (err) {
        console.error('Failed to initialize auth:', err);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event);
      if (event === 'SIGNED_OUT') {
        queryClient.clear();
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<LoadingFallback />}>
          <AuthProvider>
            <PaymentProvider>
              <PremiumFeaturesProvider>
                <BehaviorProvider>
                  <Layout>
                    <div className="main">
                      <AppRoutes />
                    </div>
                  </Layout>
                </BehaviorProvider>
              </PremiumFeaturesProvider>
            </PaymentProvider>
          </AuthProvider>
        </Suspense>
      </QueryClientProvider>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;