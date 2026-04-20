import { useGetMyProfile } from "@workspace/api-client-react";
import { BottomNav } from "@/components/bottom-nav";
import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/react";
import { LogOut, Edit3, Settings, User } from "lucide-react";
import { Link } from "wouter";

export default function DashboardProfile() {
  const { data: profile, isLoading } = useGetMyProfile();
  const { signOut } = useClerk();

  if (isLoading || !profile) {
    return <div className="min-h-[100dvh] flex items-center justify-center"><div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full"></div></div>;
  }

  const trackColors: Record<string, string> = {
    pcos: "bg-rose-100 text-rose-700 border-rose-200",
    diabetes: "bg-teal-100 text-teal-700 border-teal-200",
    thyroid: "bg-emerald-100 text-emerald-700 border-emerald-200",
    pregnancy: "bg-orange-100 text-orange-700 border-orange-200",
    kids: "bg-yellow-100 text-yellow-800 border-yellow-200",
    general: "bg-blue-100 text-blue-700 border-blue-200",
  };

  const getTrackColor = (track?: string | null) => {
    if (!track) return trackColors.general;
    return trackColors[track.toLowerCase()] || trackColors.general;
  };

  return (
    <div className="min-h-[100dvh] bg-background max-w-md mx-auto pb-20">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>

        <div className="bg-card border border-border shadow-sm rounded-2xl p-6 flex flex-col items-center text-center space-y-4">
          <div className="h-20 w-20 bg-primary/10 text-primary rounded-full flex items-center justify-center border-4 border-background shadow-sm">
            <User className="h-10 w-10" />
          </div>
          
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-foreground">{profile.name || "User"}</h2>
            <div className="flex justify-center">
              <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getTrackColor(profile.primaryTrack)} uppercase tracking-wider`}>
                {profile.primaryTrack || "General"} Track
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-muted-foreground ml-1">Your Details</h3>
          <div className="bg-card border border-border shadow-sm rounded-2xl overflow-hidden">
            <div className="flex justify-between p-4 border-b border-border/50">
              <span className="text-muted-foreground">Diet</span>
              <span className="font-medium">{profile.dietType || "Not set"}</span>
            </div>
            <div className="flex justify-between p-4 border-b border-border/50">
              <span className="text-muted-foreground">Region</span>
              <span className="font-medium">{profile.region || "Not set"}</span>
            </div>
            <div className="flex justify-between p-4">
              <span className="text-muted-foreground">Stats</span>
              <span className="font-medium">{profile.heightCm ? `${profile.heightCm}cm` : "-"} / {profile.weightKg ? `${profile.weightKg}kg` : "-"}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-4">
          <Button variant="outline" className="w-full h-12 justify-start font-medium" onClick={() => {/* Handle Edit */}}>
            <Edit3 className="w-4 h-4 mr-3 text-muted-foreground" />
            Edit Preferences
          </Button>
          
          <Button variant="outline" className="w-full h-12 justify-start font-medium text-destructive hover:text-destructive hover:bg-destructive/5" onClick={() => signOut()}>
            <LogOut className="w-4 h-4 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}