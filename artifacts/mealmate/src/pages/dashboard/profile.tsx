import { useState } from "react";
import {
  useGetMyProfile,
  useUpsertProfile,
  getGetMyProfileQueryKey,
  getGetActiveMealPlanQueryKey,
  getGetDashboardSummaryQueryKey,
} from "@workspace/api-client-react";
import { BottomNav } from "@/components/bottom-nav";
import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { LogOut, User, RefreshCw, X, Check, MapPin, Utensils } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ALL_TRACKS = [
  { id: "general",      name: "Just our family",   emoji: "🏠", subtitle: "Everyday balanced meals",          color: "bg-blue-100 text-blue-700 border-blue-200" },
  { id: "fitness",      name: "Gym & Fitness",      emoji: "💪", subtitle: "Lean, keto, gaining & workout",    color: "bg-violet-100 text-violet-700 border-violet-200" },
  { id: "kids",         name: "Cooking for kids",   emoji: "👧", subtitle: "Kid-friendly, nutritious & fun",   color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  { id: "pregnancy",    name: "Pregnancy",          emoji: "🤰", subtitle: "Nourishing meals for mum & baby",  color: "bg-orange-100 text-orange-700 border-orange-200" },
  { id: "pcos",         name: "PCOS",               emoji: "🌸", subtitle: "Hormone-balancing, low-GI food",   color: "bg-rose-100 text-rose-700 border-rose-200" },
  { id: "diabetes",     name: "Diabetes",           emoji: "🩺", subtitle: "Low-sugar, blood-sugar friendly",  color: "bg-teal-100 text-teal-700 border-teal-200" },
  { id: "thyroid",      name: "Thyroid",            emoji: "🦋", subtitle: "Thyroid-supportive, metabolism",   color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  { id: "cholesterol",  name: "Cholesterol",        emoji: "❤️", subtitle: "Heart-healthy, low saturated fat", color: "bg-red-100 text-red-700 border-red-200" },
];

const REGIONS = [
  { id: "North",     label: "North",     emoji: "🏔️" },
  { id: "South",     label: "South",     emoji: "🌴" },
  { id: "East",      label: "East",      emoji: "🌊" },
  { id: "West",      label: "West",      emoji: "🏜️" },
  { id: "Northeast", label: "Northeast", emoji: "🌿" },
  { id: "Mix",       label: "Mix",       emoji: "🍱" },
];

const DIETS = [
  { id: "Pure Veg",   emoji: "🥦", desc: "No meat, eggs or fish" },
  { id: "Eggetarian", emoji: "🥚", desc: "Veg + eggs" },
  { id: "Non-Veg",    emoji: "🍗", desc: "Includes meat & fish" },
  { id: "Jain",       emoji: "🌱", desc: "No root vegetables" },
  { id: "Vegan",      emoji: "🌾", desc: "No animal products" },
];

const PROTEINS = ["Chicken", "Mutton", "Fish", "Egg", "Seafood"];

type Sheet = "track" | "region" | "diet" | null;

export default function DashboardProfile() {
  const queryClient = useQueryClient();
  const { data: profile, isLoading } = useGetMyProfile();
  const { signOut } = useClerk();
  const { mutateAsync: upsertProfile, isPending } = useUpsertProfile();

  const { toast } = useToast();
  const [openSheet, setOpenSheet] = useState<Sheet>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [pendingProteins, setPendingProteins] = useState<string[]>([]);
  const [selectedDiet, setSelectedDiet] = useState<string>("");

  if (isLoading || !profile) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full" />
      </div>
    );
  }

  const currentTrack  = ALL_TRACKS.find((t) => t.id === (profile.primaryTrack ?? "general")) ?? ALL_TRACKS[0];
  const currentRegion = REGIONS.find((r) => r.id === profile.region) ?? null;
  const currentDiet   = DIETS.find((d) => d.id === profile.dietType) ?? null;

  const close = () => setOpenSheet(null);

  const handlePlanInvalidatedResponse = async (res: any, label: string) => {
    await queryClient.invalidateQueries({ queryKey: getGetMyProfileQueryKey() });
    if (res?.planInvalidated) {
      await queryClient.invalidateQueries({ queryKey: getGetActiveMealPlanQueryKey() });
      await queryClient.invalidateQueries({ queryKey: getGetDashboardSummaryQueryKey() });
      toast({
        title: `${label} updated`,
        description: "Your dashboard will show a refresh prompt to generate a new plan.",
      });
    } else {
      toast({ title: "Profile updated" });
    }
  };

  const handleTrackChange = async (trackId: string) => {
    if (trackId === profile.primaryTrack) { close(); return; }
    setPendingId(trackId);
    try {
      const res = await upsertProfile({ data: { primaryTrack: trackId as never } });
      await handlePlanInvalidatedResponse(res, "Health track");
    } finally { setPendingId(null); close(); }
  };

  const handleRegionChange = async (regionId: string) => {
    if (regionId === profile.region) { close(); return; }
    setPendingId(regionId);
    try {
      const res = await upsertProfile({ data: { region: regionId as never } });
      await handlePlanInvalidatedResponse(res, "Region");
    } finally { setPendingId(null); close(); }
  };

  const openDietSheet = () => {
    setSelectedDiet(profile.dietType ?? "");
    setPendingProteins((profile.proteinPreferences as string[]) ?? []);
    setOpenSheet("diet");
  };

  const handleDietSave = async () => {
    if (!selectedDiet) return;
    setPendingId(selectedDiet);
    try {
      const res = await upsertProfile({
        data: {
          dietType: selectedDiet as never,
          proteinPreferences: (selectedDiet === "Non-Veg" ? pendingProteins : []) as never,
        },
      });
      await handlePlanInvalidatedResponse(res, "Diet type");
    } finally { setPendingId(null); close(); }
  };

  const toggleProtein = (p: string) =>
    setPendingProteins((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );

  const Sheet = ({ children }: { children: React.ReactNode }) => (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 z-40"
        onClick={close}
      />
      <motion.div
        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl max-w-md mx-auto shadow-2xl max-h-[82vh] flex flex-col"
      >
        <div className="p-5 overflow-y-auto flex-1 pb-24">{children}</div>
      </motion.div>
    </>
  );

  const SheetHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-lg font-bold text-foreground">{title}</h2>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <button
        onClick={close}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-muted/80"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="min-h-[100dvh] bg-background max-w-md mx-auto pb-20">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>

        {/* Avatar + track badge */}
        <div className="bg-card border border-border shadow-sm rounded-2xl p-6 flex flex-col items-center text-center space-y-4">
          <div className="h-20 w-20 bg-primary/10 text-primary rounded-full flex items-center justify-center border-4 border-background shadow-sm">
            <User className="h-10 w-10" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-foreground">{profile.name || "User"}</h2>
            <div className="flex justify-center">
              <span className={`px-3 py-1 text-xs font-semibold rounded-full border uppercase tracking-wider ${currentTrack.color}`}>
                {currentTrack.emoji} {currentTrack.name}
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
              <span className="font-medium">{currentDiet ? `${currentDiet.emoji} ${currentDiet.id}` : "Not set"}</span>
            </div>
            <div className="flex justify-between p-4 border-b border-border/50">
              <span className="text-muted-foreground">Region</span>
              <span className="font-medium">{currentRegion ? `${currentRegion.emoji} ${currentRegion.label}` : "Not set"}</span>
            </div>
            <div className="flex justify-between p-4">
              <span className="text-muted-foreground">Stats</span>
              <span className="font-medium">
                {profile.heightCm ? `${profile.heightCm}cm` : "-"} / {profile.weightKg ? `${profile.weightKg}kg` : "-"}
              </span>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-3">
          <h3 className="font-semibold text-muted-foreground ml-1">Settings</h3>

          <Button
            variant="outline"
            className="w-full h-12 justify-start font-medium"
            onClick={() => setOpenSheet("track")}
          >
            <RefreshCw className="w-4 h-4 mr-3 text-muted-foreground" />
            Change Health Track
            <span className={`ml-auto text-xs px-2 py-0.5 rounded-full border ${currentTrack.color}`}>
              {currentTrack.emoji} {currentTrack.name}
            </span>
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 justify-start font-medium"
            onClick={() => setOpenSheet("region")}
          >
            <MapPin className="w-4 h-4 mr-3 text-muted-foreground" />
            Change Region
            {currentRegion && (
              <span className="ml-auto text-xs px-2 py-0.5 rounded-full border bg-orange-50 text-orange-700 border-orange-200">
                {currentRegion.emoji} {currentRegion.label}
              </span>
            )}
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 justify-start font-medium"
            onClick={openDietSheet}
          >
            <Utensils className="w-4 h-4 mr-3 text-muted-foreground" />
            Change Diet Type
            {currentDiet && (
              <span className="ml-auto text-xs px-2 py-0.5 rounded-full border bg-green-50 text-green-700 border-green-200">
                {currentDiet.emoji} {currentDiet.id}
              </span>
            )}
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

      {/* ── Track Sheet ── */}
      <AnimatePresence>
        {openSheet === "track" && (
          <Sheet>
            <SheetHeader title="Change Health Track" subtitle="Your meal plan will update automatically" />
            <div className="grid grid-cols-2 gap-2.5">
              {ALL_TRACKS.map((track) => {
                const isActive  = track.id === profile.primaryTrack;
                const isLoading = pendingId === track.id;
                return (
                  <motion.button
                    key={track.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleTrackChange(track.id)}
                    disabled={!!pendingId}
                    className={`relative flex flex-col items-start p-3.5 rounded-2xl border-2 text-left transition-all ${
                      isActive ? "border-primary bg-primary/5 shadow-md" : "border-border bg-card hover:border-primary/40"
                    }`}
                  >
                    {isActive  && <span className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-white" /></span>}
                    {isLoading && <span className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center animate-spin border-2 border-white border-t-transparent" />}
                    <span className="text-2xl mb-1.5">{track.emoji}</span>
                    <span className="font-semibold text-xs text-foreground leading-tight">{track.name}</span>
                    <span className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">{track.subtitle}</span>
                  </motion.button>
                );
              })}
            </div>
          </Sheet>
        )}
      </AnimatePresence>

      {/* ── Region Sheet ── */}
      <AnimatePresence>
        {openSheet === "region" && (
          <Sheet>
            <SheetHeader title="Change Region" subtitle="We'll serve dishes from your cuisine" />
            <div className="grid grid-cols-3 gap-2.5">
              {REGIONS.map((r) => {
                const isActive  = r.id === profile.region;
                const isLoading = pendingId === r.id;
                return (
                  <motion.button
                    key={r.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleRegionChange(r.id)}
                    disabled={!!pendingId}
                    className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 text-center transition-all ${
                      isActive ? "border-primary bg-primary/5 shadow-md" : "border-border bg-card hover:border-primary/40"
                    }`}
                  >
                    {isActive  && <span className="absolute top-2 right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center"><Check className="w-2.5 h-2.5 text-white" /></span>}
                    {isLoading && <span className="absolute top-2 right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center animate-spin border-2 border-white border-t-transparent" />}
                    <span className="text-2xl mb-1">{r.emoji}</span>
                    <span className="font-semibold text-xs text-foreground">{r.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </Sheet>
        )}
      </AnimatePresence>

      {/* ── Diet Sheet ── */}
      <AnimatePresence>
        {openSheet === "diet" && (
          <Sheet>
            <SheetHeader title="Change Diet Type" subtitle="Choose what suits your lifestyle" />
            <div className="space-y-2 mb-4">
              {DIETS.map((d) => {
                const isActive = selectedDiet === d.id;
                return (
                  <motion.button
                    key={d.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedDiet(d.id)}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border-2 text-left transition-all ${
                      isActive ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"
                    }`}
                  >
                    <span className="text-2xl">{d.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground">{d.id}</p>
                      <p className="text-xs text-muted-foreground">{d.desc}</p>
                    </div>
                    {isActive && (
                      <span className="w-5 h-5 bg-primary rounded-full flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Protein prefs for Non-Veg */}
            <AnimatePresence>
              {selectedDiet === "Non-Veg" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 overflow-hidden"
                >
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Preferred Proteins</p>
                  <div className="flex flex-wrap gap-2">
                    {PROTEINS.map((p) => (
                      <button
                        key={p}
                        onClick={() => toggleProtein(p)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all ${
                          pendingProteins.includes(p)
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-card text-muted-foreground"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              className="w-full h-12 rounded-xl font-semibold"
              disabled={!selectedDiet || (selectedDiet === "Non-Veg" && pendingProteins.length === 0) || !!pendingId}
              onClick={handleDietSave}
            >
              {pendingId ? "Saving…" : "Save"}
            </Button>
          </Sheet>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}
