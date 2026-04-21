import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, X } from "lucide-react";
import { useGenerateMealPlan, getGetActiveMealPlanQueryKey, getGetDashboardSummaryQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const TRACK_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  pcos:        { bg: "bg-rose-50",    border: "border-l-rose-500",    text: "text-rose-700"    },
  diabetes:    { bg: "bg-teal-50",    border: "border-l-teal-500",    text: "text-teal-700"    },
  thyroid:     { bg: "bg-emerald-50", border: "border-l-emerald-500", text: "text-emerald-700" },
  pregnancy:   { bg: "bg-orange-50",  border: "border-l-orange-500",  text: "text-orange-700"  },
  kids:        { bg: "bg-yellow-50",  border: "border-l-yellow-500",  text: "text-yellow-800"  },
  fitness:     { bg: "bg-violet-50",  border: "border-l-violet-500",  text: "text-violet-700"  },
  cholesterol: { bg: "bg-red-50",     border: "border-l-red-500",     text: "text-red-700"     },
  general:     { bg: "bg-blue-50",    border: "border-l-blue-500",    text: "text-blue-700"    },
};

interface StalePlanBannerProps {
  region: string | null | undefined;
  track: string | null | undefined;
  planInvalidatedAt?: string | null;
}

export function StalePlanBanner({ region, track, planInvalidatedAt }: StalePlanBannerProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const generatePlan = useGenerateMealPlan();
  const dismissKey = `mealcoreai-stale-dismissed-${planInvalidatedAt ?? "unknown"}`;
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setDismissed(!!localStorage.getItem(dismissKey));
  }, [dismissKey]);
  const [isGenerating, setIsGenerating] = useState(false);

  const colors = TRACK_COLORS[track?.toLowerCase() ?? "general"] ?? TRACK_COLORS.general;

  const displayRegion = region ?? "your region";
  const displayTrack = track
    ? track.charAt(0).toUpperCase() + track.slice(1).toLowerCase()
    : "your health";

  const dismiss = () => {
    localStorage.setItem(dismissKey, "1");
    setDismissed(true);
  };

  const handleRegenerate = async () => {
    setIsGenerating(true);
    try {
      await generatePlan.mutateAsync({ data: { forceRegenerate: true } });
      await queryClient.invalidateQueries({ queryKey: getGetActiveMealPlanQueryKey() });
      await queryClient.invalidateQueries({ queryKey: getGetDashboardSummaryQueryKey() });
      localStorage.removeItem(dismissKey);
      setDismissed(true);
      toast({
        title: `New ${displayRegion} plan ready!`,
        description: "Your meal plan now matches your updated preferences.",
      });
    } catch {
      toast({
        title: "Could not generate plan",
        description: "Try again from the dashboard.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        className={`rounded-xl border-l-4 p-4 ${colors.bg} ${colors.border}`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <RefreshCw className={`w-5 h-5 mt-0.5 shrink-0 ${colors.text}`} />
            <div className="min-w-0">
              <p className={`font-semibold text-sm ${colors.text}`}>
                Your region changed to {displayRegion}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                Refresh your plan to get {displayRegion} dishes personalised for your {displayTrack} track.
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={handleRegenerate}
                  disabled={isGenerating}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity disabled:opacity-60 ${
                    track === "pcos" ? "bg-rose-500" :
                    track === "diabetes" ? "bg-teal-500" :
                    track === "thyroid" ? "bg-emerald-500" :
                    track === "pregnancy" ? "bg-orange-500" :
                    track === "kids" ? "bg-yellow-500" :
                    track === "fitness" ? "bg-violet-500" :
                    track === "cholesterol" ? "bg-red-500" :
                    "bg-blue-500"
                  }`}
                >
                  {isGenerating ? (
                    <div className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <RefreshCw className="w-3 h-3" />
                  )}
                  {isGenerating ? "Generating…" : "Get New Plan"}
                </button>
                <button
                  onClick={dismiss}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground bg-background border border-border hover:bg-muted/50 transition-colors"
                >
                  Keep Current Plan
                </button>
              </div>
            </div>
          </div>
          <button onClick={dismiss} className="text-muted-foreground hover:text-foreground shrink-0 p-0.5">
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
