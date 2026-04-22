import { useEffect, useRef } from "react";
import { ClerkProvider, SignIn, SignUp, Show, useClerk } from "@clerk/react";
import { AIChat } from "@/components/ai-chat";
import { Switch, Route, useLocation, Router as WouterRouter, Redirect } from "wouter";
import { QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { queryClient } from "@/lib/queryClient";

import Landing from "./pages/landing";
import OnboardingTrack from "./pages/onboarding/track";
import OnboardingBasics from "./pages/onboarding/basics";
import OnboardingRegion from "./pages/onboarding/region";
import OnboardingConditions from "./pages/onboarding/conditions";
import OnboardingFavourites from "./pages/onboarding/favourites";
import OnboardingCooking from "./pages/onboarding/cooking";

import DashboardHome from "./pages/dashboard/home";
import DashboardWeek from "./pages/dashboard/week";
import DashboardLunchBox from "./pages/dashboard/lunchbox";
import DashboardFitness from "./pages/dashboard/fitness";
import DashboardRecipe from "./pages/dashboard/recipe";
import DashboardGrocery from "./pages/dashboard/grocery";
import DashboardProfile from "./pages/dashboard/profile";
import NotFound from "./pages/not-found";
import { useGetMyProfile } from "@workspace/api-client-react";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;
const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function stripBase(path: string): string {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || "/"
    : path;
}

if (!clerkPubKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY in .env file");
}

const clerkAppearance = {
  options: {
    logoPlacement: "inside" as const,
    logoLinkUrl: basePath || "/",
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
  },
  variables: {
    colorPrimary: "hsl(24, 95%, 53%)", // orange-500
    colorBackground: "hsl(40, 33%, 98%)",
    colorInputBackground: "hsl(0, 0%, 100%)",
    colorText: "hsl(20, 20%, 15%)",
    colorTextSecondary: "hsl(20, 10%, 45%)",
    colorInputText: "hsl(20, 20%, 15%)",
    colorNeutral: "hsl(30, 20%, 90%)",
    borderRadius: "0.75rem",
    fontFamily: "'Inter', sans-serif",
  },
  elements: {
    rootBox: "w-full",
    cardBox: "rounded-2xl w-full overflow-hidden shadow-lg",
    card: "!shadow-none !border-0 !bg-transparent !rounded-none",
    footer: "!shadow-none !border-0 !bg-transparent !rounded-none",
    headerTitle: { color: "hsl(20, 20%, 15%)" },
    headerSubtitle: { color: "hsl(20, 10%, 45%)" },
    socialButtonsBlockButtonText: { color: "hsl(20, 20%, 15%)" },
    formFieldLabel: { color: "hsl(20, 20%, 15%)" },
    footerActionLink: { color: "hsl(24, 95%, 53%)" },
    footerActionText: { color: "hsl(20, 10%, 45%)" },
    dividerText: { color: "hsl(20, 10%, 45%)" },
    identityPreviewEditButton: { color: "hsl(24, 95%, 53%)" },
    formFieldSuccessText: { color: "hsl(120, 30%, 50%)" },
    alertText: { color: "hsl(0, 84%, 60%)" },
    logoImage: "w-16 h-16 mx-auto",
    formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 rounded-xl",
  },
};

function SignInPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4">
      <SignIn routing="path" path={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`} />
    </div>
  );
}

function SignUpPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4">
      <SignUp routing="path" path={`${basePath}/sign-up`} signInUrl={`${basePath}/sign-in`} />
    </div>
  );
}

function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const queryClient = useQueryClient();
  const prevUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = addListener(({ user }) => {
      const userId = user?.id ?? null;
      if (
        prevUserIdRef.current !== undefined &&
        prevUserIdRef.current !== userId
      ) {
        queryClient.clear();
      }
      prevUserIdRef.current = userId;
    });
    return unsubscribe;
  }, [addListener, queryClient]);

  return null;
}

function ProtectedRoute({ component: Component, ...rest }: any) {
  return (
    <Route {...rest}>
      <Show when="signed-in">
        <Component />
      </Show>
      <Show when="signed-out">
        <Redirect to="/sign-in" />
      </Show>
    </Route>
  );
}

function AuthGate({ children }: { children: React.ReactNode }) {
  const { data: profile, isLoading, isError } = useGetMyProfile({
    query: { retry: false },
  });
  const [location] = useLocation();

  if (isLoading) {
    return <div className="min-h-[100dvh] flex items-center justify-center bg-background">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>;
  }

  const isComplete = profile?.onboardingComplete;
  const isOnboardingRoute = location.startsWith("/onboarding");

  if (!isComplete && !isOnboardingRoute) {
    return <Redirect to="/onboarding/track" />;
  }

  if (isComplete && isOnboardingRoute) {
    return <Redirect to="/dashboard" />;
  }

  return <>{children}</>;
}

function DashboardWrapper({ component: Component, showAI = false }: any) {
  return (
    <AuthGate>
      <Component />
      {showAI && <AIChat />}
    </AuthGate>
  );
}

function HomeRedirect() {
  return (
    <>
      <Show when="signed-in">
        <Redirect to="/dashboard" />
      </Show>
      <Show when="signed-out">
        <Landing />
      </Show>
    </>
  );
}

function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      appearance={clerkAppearance}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <ClerkQueryClientCacheInvalidator />
        <Switch>
          <Route path="/" component={HomeRedirect} />
          <Route path="/sign-in/*?" component={SignInPage} />
          <Route path="/sign-up/*?" component={SignUpPage} />

          <ProtectedRoute path="/onboarding/track" component={() => <DashboardWrapper component={OnboardingTrack} />} />
          <ProtectedRoute path="/onboarding/basics" component={() => <DashboardWrapper component={OnboardingBasics} />} />
          <ProtectedRoute path="/onboarding/region" component={() => <DashboardWrapper component={OnboardingRegion} />} />
          <ProtectedRoute path="/onboarding/conditions" component={() => <DashboardWrapper component={OnboardingConditions} />} />
          <ProtectedRoute path="/onboarding/favourites" component={() => <DashboardWrapper component={OnboardingFavourites} />} />
          <ProtectedRoute path="/onboarding/cooking" component={() => <DashboardWrapper component={OnboardingCooking} />} />

          <ProtectedRoute path="/dashboard" component={() => <DashboardWrapper component={DashboardHome} showAI />} />
          <ProtectedRoute path="/dashboard/week" component={() => <DashboardWrapper component={DashboardWeek} showAI />} />
          <ProtectedRoute path="/dashboard/lunchbox" component={() => <DashboardWrapper component={DashboardLunchBox} showAI />} />
          <ProtectedRoute path="/dashboard/fitness" component={() => <DashboardWrapper component={DashboardFitness} showAI />} />
          <ProtectedRoute path="/dashboard/recipe/:id" component={() => <DashboardWrapper component={DashboardRecipe} showAI />} />
          <ProtectedRoute path="/dashboard/grocery" component={() => <DashboardWrapper component={DashboardGrocery} showAI />} />
          <ProtectedRoute path="/dashboard/profile" component={() => <DashboardWrapper component={DashboardProfile} showAI />} />

          <Route component={NotFound} />
        </Switch>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

function App() {
  return (
    <WouterRouter base={basePath}>
      <TooltipProvider>
        <ClerkProviderWithRoutes />
        <Toaster />
        <SonnerToaster position="top-center" richColors />
      </TooltipProvider>
    </WouterRouter>
  );
}

export default App;