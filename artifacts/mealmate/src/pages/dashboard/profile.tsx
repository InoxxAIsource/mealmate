import { useState } from "react";
import { useGetMyProfile, useUpsertProfile, getGetMyProfileQueryKey } from "@workspace/api-client-react";
import { BottomNav } from "@/components/bottom-nav";
import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/react";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut, User, RefreshCw, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ALL_TRACKS = [
  { id: "general",  name: "Just our family",  emoji: "🏠", subtitle: "Everyday balanced meals", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { id: "fitness",  name: "Gym & Fitness",     emoji: "💪", subtitle: "Lean, keto, gaining & workout", color: "bg-violet-100 text-violet-700 border-violet-200" },
  { id: "kids",     name: "Cooking for kids",  emoji: "👧", subtitle: "Kid-friendly, nutritious & fun", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  { id: "pregnancy",name: "Pregnancy",         emoji: "🤰", subtitle: "Nourishing meals for mum & baby", color: "bg-orange-100 text-orange-700 border-orange-200" },
  { id: "pcos",     name: "PCOS",              emoji: "🌸", subtitle: "Hormone-balancing, low-GI food", color: "bg-rose-100 text-rose-700 border-rose-200" },
  { id: "diabetes", name: "Diabetes",          emoji: "🩺", subtitle: "Low-sugar, blood-sugar friendly", color: "bg-teal-100 text-teal-700 border-teal-200" },
  { id: "thyroid",  name: "Thyroid",           emoji: "🦋", subtitle: "Thyroid-supportive, metabolism", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
];

export default function DashboardProfile() {
  const queryClient = useQueryClient();
  const { data: profile, isLoading } = useGetMyProfile();
  const { signOut } = useClerk();
  const { mutateAsync: upsertProfile, isPending } = useUpsertProfile();
  const [showTrackPicker, setShowTrackPicker] = useState(false);
  const [pendingTrack, setPendingTrack] = useState<string | null>(null);

  if (isLoading || !profile) {
    return <div className="min-h-[100dvh] flex items-center justify-center"><div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full"></div></div>;
  }

  const currentTrackInfo = ALL_TRACKS.find((t) => t.id === (profile.primaryTrack ?? "general")) ?? ALL_TRACKS[0];

  const handleTrackChange = async (trackId: string) => {
    if (trackId === profile.primaryTrack) {
      setShowTrackPicker(false);
      return;
    }
    setPendingTrack(trackId);
    try {
      await upsertProfile({ data: { primaryTrack: trackId as never } });
      await queryClient.invalidateQueries({ queryKey: getGetMyProfileQueryKey() });
    } finally {
      setPendingTrack(null);
      setShowTrackPicker(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background max-w-md mx-auto pb-20">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>

        {/* Avatar + track */}
        <div className="bg-card border border-border shadow-sm rounded-2xl p-6 flex flex-col items-center text-center space-y-4">
          <div className="h-20 w-20 bg-primary/10 text-primary rounded-full flex items-center justify-center border-4 border-background shadow-sm">
            <User className="h-10 w-10" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-foreground">{profile.name || "User"}</h2>
            <div className="flex justify-center">
              <span className={`px-3 py-1 text-xs font-semibold rounded-full border uppercase tracking-wider ${currentTrackInfo.color}`}>
                {currentTrackInfo.emoji} {currentTrackInfo.name}
              </span>
            </div>
          </div>
        </div>

        {/* Your Details */}
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

        {/* Change Track CTA */}
        <div className="space-y-3">
          <h3 className="font-semibold text-muted-foreground ml-1">Settings</h3>
          <Button
            variant="outline"
            className="w-full h-12 justify-start font-medium"
            onClick={() => setShowTrackPicker(true)}
          >
            <RefreshCw className="w-4 h-4 mr-3 text-muted-foreground" />
            Change Health Track
            <span className={`ml-auto text-xs px-2 py-0.5 rounded-full border ${currentTrackInfo.color}`}>
              {currentTrackInfo.emoji} {currentTrackInfo.name}
            </span>
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 justify-start font-medium text-destructive hover:text-destructive hover:bg-destructive/5"
            onClick={() => signOut()}
          >
            <LogOut className="w-4 h-4 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Track Picker Sheet */}
      <AnimatePresence>
        {showTrackPicker && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setShowTrackPicker(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl max-w-md mx-auto shadow-2xl"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-foreground">Change Health Track</h2>
                    <p className="text-xs text-muted-foreground">Your meal plan will update automatically</p>
                  </div>
                  <button
                    onClick={() => setShowTrackPicker(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-muted/80"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2.5 pb-safe">
                  {ALL_TRACKS.map((track) => {
                    const isActive = track.id === profile.primaryTrack;
                    const isLoading = pendingTrack === track.id;
                    return (
                      <motion.button
                        key={track.id}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleTrackChange(track.id)}
                        disabled={!!pendingTrack}
                        className={`relative flex flex-col items-start p-3.5 rounded-2xl border-2 text-left transition-all ${
                          isActive
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-border bg-card hover:border-primary/40"
                        }`}
                      >
                        {isActive && (
                          <span className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </span>
                        )}
                        {isLoading && (
                          <span className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center animate-spin border-2 border-white border-t-transparent" />
                        )}
                        <span className="text-2xl mb-1.5">{track.emoji}</span>
                        <span className="font-semibold text-xs text-foreground leading-tight">{track.name}</span>
                        <span className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">{track.subtitle}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}
