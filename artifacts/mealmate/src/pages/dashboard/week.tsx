import { useState, useEffect, useRef } from "react";
import {
  useGetActiveMealPlan,
  useSwapMeal,
  useToggleLockMeal,
  useGenerateMealPlan,
  getGetActiveMealPlanQueryKey,
  type SwapMealBodyMealType,
  type LockMealBodyMealType,
} from "@workspace/api-client-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { BottomNav } from "@/components/bottom-nav";
import { DishImage } from "@/components/dish-image";
import { Link } from "wouter";
import { RefreshCw, Lock, Unlock, ArrowLeftRight, Loader2, Sparkles, Check, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const GENERATE_STEPS = [
  { emoji: "🧠", text: "Analysing your health preferences…" },
  { emoji: "🥗", text: "Curating breakfast options…" },
  { emoji: "🍱", text: "Balancing lunch and dinner…" },
  { emoji: "✨", text: "Perfecting your week…" },
  { emoji: "🎉", text: "Almost ready!" },
];

function getDayLabel(dayIndex: number): string {
  // dayIndex 0 = Monday, 1 = Tuesday, ..., 6 = Sunday (matches plan's dayIndex scheme)
  const today = new Date();
  const todayDayIndex = (today.getDay() + 6) % 7; // Mon=0, ..., Sun=6
  if (dayIndex === todayDayIndex) return "Today";
  if (dayIndex === todayDayIndex + 1) return "Tomorrow";
  // Calculate the actual calendar date for this dayIndex
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - todayDayIndex); // rewind to Monday
  const date = new Date(weekStart);
  date.setDate(weekStart.getDate() + dayIndex);
  return date.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" });
}

function GeneratingOverlay() {
  const [stepIdx, setStepIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStepIdx((i) => Math.min(i + 1, GENERATE_STEPS.length - 1));
    }, 1800);
    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + 1.2, 92));
    }, 100);
    return () => { clearInterval(stepInterval); clearInterval(progressInterval); };
  }, []);

  const step = GENERATE_STEPS[stepIdx];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center px-8"
    >
      <div className="w-full max-w-xs text-center space-y-8">
        {/* Animated emoji */}
        <motion.div
          key={step.emoji}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="text-7xl mx-auto"
        >
          {step.emoji}
        </motion.div>

        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-foreground">Building your plan</h2>
          <motion.p
            key={step.text}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-muted-foreground"
          >
            {step.text}
          </motion.p>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground">
            {GENERATE_STEPS.map((s, i) => (
              <span key={i} className={i <= stepIdx ? "text-primary font-bold" : ""}>{s.emoji}</span>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground">Personalised just for you ✦</p>
      </div>
    </motion.div>
  );
}

function PlanReadySheet({ onDismiss }: { onDismiss: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/40 flex items-end"
      onClick={onDismiss}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md mx-auto bg-background rounded-t-3xl p-6 pb-10 shadow-2xl"
      >
        {/* Success icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Check className="w-8 h-8 text-primary" />
          </div>
        </div>

        <div className="text-center mb-6 space-y-1">
          <h2 className="text-xl font-bold text-foreground">Your new plan is ready! ✨</h2>
          <p className="text-sm text-muted-foreground">
            A fresh week of personalised Indian meals — swapped, balanced, and just for you.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[
            { e: "🥗", l: "7 days", s: "of meals" },
            { e: "🔄", l: "All fresh", s: "no repeats" },
            { e: "🎯", l: "On track", s: "for your goal" },
          ].map((f) => (
            <div key={f.l} className="bg-muted/50 rounded-2xl p-3 text-center">
              <span className="text-2xl">{f.e}</span>
              <p className="text-xs font-bold text-foreground mt-1">{f.l}</p>
              <p className="text-[10px] text-muted-foreground">{f.s}</p>
            </div>
          ))}
        </div>

        <Button
          className="w-full h-13 rounded-2xl text-base font-semibold shadow-md"
          size="lg"
          onClick={onDismiss}
        >
          <Sparkles className="w-4 h-4 mr-2" />
          See My New Plan
        </Button>
      </motion.div>
    </motion.div>
  );
}

export default function DashboardWeek() {
  const queryClient = useQueryClient();
  const { data: plan, isLoading } = useGetActiveMealPlan();
  const swapMeal = useSwapMeal();
  const toggleLock = useToggleLockMeal();
  const generatePlan = useGenerateMealPlan();

  const [swapping, setSwapping] = useState<string | null>(null);
  const [locking, setLocking] = useState<string | null>(null);
  const [showPlanReady, setShowPlanReady] = useState(false);

  const wasPending = useRef(false);

  // Detect when generation completes → show plan-ready sheet
  useEffect(() => {
    if (wasPending.current && !generatePlan.isPending && !generatePlan.isError) {
      setShowPlanReady(true);
    }
    wasPending.current = generatePlan.isPending;
  }, [generatePlan.isPending, generatePlan.isError]);

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: getGetActiveMealPlanQueryKey() });

  const handleSwap = async (dayIndex: number, mealType: SwapMealBodyMealType, currentDishId: number) => {
    const key = `${dayIndex}-${mealType}`;
    setSwapping(key);
    try {
      await swapMeal.mutateAsync({ data: { planId: plan!.id, dayIndex, mealType, currentDishId } });
      await invalidate();
    } catch {
      toast.error("Couldn't swap meal. Please try again.");
    } finally {
      setSwapping(null);
    }
  };

  const handleLock = async (dayIndex: number, mealType: LockMealBodyMealType, locked: boolean) => {
    const key = `${dayIndex}-${mealType}`;
    setLocking(key);
    try {
      await toggleLock.mutateAsync({ data: { planId: plan!.id, dayIndex, mealType, locked } });
      await invalidate();
    } finally {
      setLocking(null);
    }
  };

  const handleGenerate = async () => {
    await generatePlan.mutateAsync({ data: {} });
    await invalidate();
  };

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!plan) {
    return (
      <>
        <AnimatePresence>
          {generatePlan.isPending && <GeneratingOverlay />}
        </AnimatePresence>

        <div className="min-h-[100dvh] flex flex-col items-center justify-center gap-6 p-8 max-w-md mx-auto text-center">
          <div className="space-y-2">
            <p className="text-5xl">🍽️</p>
            <h2 className="text-xl font-bold text-foreground">No meal plan yet</h2>
            <p className="text-muted-foreground text-sm">
              Let our AI build you a personalised week of Indian meals based on your health track.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 w-full">
            {["🥗 Balanced", "🎯 Personalised", "🔄 Swappable"].map((f) => (
              <div key={f} className="bg-muted/50 rounded-2xl p-3 text-center text-xs font-medium">{f}</div>
            ))}
          </div>

          <Button
            size="lg"
            className="w-full h-14 rounded-2xl text-base font-semibold shadow-md"
            onClick={handleGenerate}
            disabled={generatePlan.isPending}
            data-testid="btn-generate"
          >
            {generatePlan.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Sparkles className="w-4 h-4 mr-2" />
            )}
            Generate My Plan
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Generating overlay */}
      <AnimatePresence>
        {generatePlan.isPending && <GeneratingOverlay />}
      </AnimatePresence>

      {/* Plan Ready sheet */}
      <AnimatePresence>
        {showPlanReady && <PlanReadySheet onDismiss={() => setShowPlanReady(false)} />}
      </AnimatePresence>

      <div className="min-h-[100dvh] bg-background max-w-md mx-auto pb-24">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-5 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">This Week</h1>
          <Button
            variant="outline"
            size="sm"
            className="h-8 rounded-full text-xs gap-1.5"
            onClick={handleGenerate}
            disabled={generatePlan.isPending}
            data-testid="btn-regenerate"
          >
            <RefreshCw className="w-3 h-3" />
            New Plan
          </Button>
        </div>

        <div className="px-4 pt-4 space-y-6">
          {/* Stale plan inline warning */}
          {(plan as any).planIsStale && (
            <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-3.5 py-3">
              <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
              <p className="text-xs text-amber-800 leading-snug">
                This plan was created before your last preference change.
                Tap <strong>New Plan</strong> to get updated dishes.
              </p>
            </div>
          )}

          {plan.days.map((day) => (
            <div key={day.dayIndex}>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 px-1">
                {getDayLabel(day.dayIndex)}
              </p>

              <div className="space-y-2">
                {(["breakfast", "lunch", "snack", "dinner"] as const).map((mealType) => {
                  const dish = day[mealType];
                  if (!dish) return null;
                  const key = `${day.dayIndex}-${mealType}`;
                  const isSwapping = swapping === key;
                  const isLocking = locking === key;
                  const isLocked = day.lockedSlots?.includes(mealType);

                  return (
                    <div
                      key={mealType}
                      className={`flex items-center gap-3 bg-card border rounded-2xl overflow-hidden transition-opacity ${
                        isSwapping ? "opacity-50" : "opacity-100"
                      } ${isLocked ? "border-primary/30" : "border-border"}`}
                      data-testid={`meal-row-${day.dayIndex}-${mealType}`}
                    >
                      {/* Thumbnail */}
                      <Link href={`/dashboard/recipe/${dish.id}`} className="w-16 h-16 shrink-0 relative">
                        {isSwapping ? (
                          <div className="w-full h-full flex items-center justify-center bg-muted">
                            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                          </div>
                        ) : (
                          <DishImage photoUrl={dish.photoUrl} name={dish.name} className="w-full h-full" emojiSize="text-2xl" />
                        )}
                      </Link>

                      {/* Info */}
                      <Link href={`/dashboard/recipe/${dish.id}`} className="flex-1 min-w-0 py-1">
                        <p className="text-[10px] font-bold text-primary uppercase tracking-wide">{mealType}</p>
                        <p className="text-sm font-semibold text-foreground leading-tight truncate">{dish.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{dish.macros?.cal} kcal · {dish.prepTimeMin}m</p>
                      </Link>

                      {/* Actions */}
                      <div className="flex items-center gap-0.5 pr-2 shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl"
                          onClick={() => handleSwap(day.dayIndex, mealType as SwapMealBodyMealType, dish.id)}
                          disabled={isSwapping || isLocking || !!isLocked}
                          data-testid={`btn-swap-${day.dayIndex}-${mealType}`}
                          title="Swap meal"
                        >
                          {isSwapping ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowLeftRight className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-9 w-9 rounded-xl ${
                            isLocked ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                          }`}
                          onClick={() => handleLock(day.dayIndex, mealType as LockMealBodyMealType, !isLocked)}
                          disabled={isSwapping || isLocking}
                          data-testid={`btn-lock-${day.dayIndex}-${mealType}`}
                          title={isLocked ? "Unlock meal" : "Lock meal"}
                        >
                          {isLocking ? <Loader2 className="w-4 h-4 animate-spin" /> : isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <BottomNav />
      </div>
    </>
  );
}
