import { useState } from "react";
import {
  useGetDashboardSummary,
  useGetActiveMealPlan,
  useSwapMeal,
  getGetActiveMealPlanQueryKey,
  getGetDashboardSummaryQueryKey,
  type SwapMealBodyMealType,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { BottomNav } from "@/components/bottom-nav";
import { DishImage } from "@/components/dish-image";
import { NotificationPrompt } from "@/components/notification-prompt";
import { StalePlanBanner } from "@/components/stale-plan-banner";
import { Link } from "wouter";
import { Clock, Flame, ChevronRight, ArrowLeftRight, Loader2 } from "lucide-react";

export default function DashboardHome() {
  const queryClient = useQueryClient();
  const { data: summary, isLoading: summaryLoading } = useGetDashboardSummary();
  // Include error so we never show stale swap buttons when the plan has been deactivated
  const { data: planData, isLoading: planLoading, error: planError } = useGetActiveMealPlan();
  // Treat a plan as absent if the query errored (e.g. 404 after profile change deactivated it)
  const plan = planError ? undefined : planData;
  const swapMeal = useSwapMeal();
  const [swapping, setSwapping] = useState<string | null>(null);

  if (summaryLoading || planLoading || !summary) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full" />
      </div>
    );
  }

  // Today's index: Mon=0, Tue=1, ..., Sun=6 — matches the plan's dayIndex scheme
  const todayDayIndex = (new Date().getDay() + 6) % 7;
  // Find today's day in the plan; fall back to day 0 if plan doesn't cover today yet
  const today = plan?.days?.find((d) => d.dayIndex === todayDayIndex) ?? plan?.days?.[0];
  const meals = [
    { type: "breakfast" as SwapMealBodyMealType, label: "Breakfast", dish: today?.breakfast ?? null },
    { type: "lunch"     as SwapMealBodyMealType, label: "Lunch",     dish: today?.lunch     ?? null },
    { type: "snack"     as SwapMealBodyMealType, label: "Snack",     dish: today?.snack     ?? null },
    { type: "dinner"    as SwapMealBodyMealType, label: "Dinner",    dish: today?.dinner    ?? null },
  ];

  const handleSwap = async (mealType: SwapMealBodyMealType, currentDishId: number) => {
    if (!plan || !today) return;
    setSwapping(mealType);
    try {
      await swapMeal.mutateAsync({
        data: { planId: plan.id, dayIndex: today.dayIndex, mealType, currentDishId },
      });
      await queryClient.invalidateQueries({ queryKey: getGetActiveMealPlanQueryKey() });
      await queryClient.invalidateQueries({ queryKey: getGetDashboardSummaryQueryKey() });
    } catch (err: any) {
      const status = err?.status ?? err?.response?.status;
      if (status === 404) {
        // Plan was deactivated (e.g. after a profile change) — clear the stale cache
        queryClient.removeQueries({ queryKey: getGetActiveMealPlanQueryKey() });
        await queryClient.invalidateQueries({ queryKey: getGetDashboardSummaryQueryKey() });
        toast.error("Your plan was reset after a profile change. Go to the Week tab to generate a new one.");
      } else {
        toast.error("Couldn't swap meal. Please try again.");
      }
    } finally {
      setSwapping(null);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background max-w-md mx-auto pb-20">
      <div className="p-6 space-y-6">

        {/* Greeting */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">
            Hi, {summary.profile?.name?.split(" ")[0] || "there"} 👋
          </h1>
          <p className="text-muted-foreground text-sm">
            {new Date().toLocaleDateString("en-IN", { weekday: "long", month: "short", day: "numeric" })}
          </p>
        </div>

        {/* Stale plan banner — shown when region/track/diet changed */}
        {(plan as any)?.planIsStale && (
          <StalePlanBanner
            region={summary.profile?.region}
            track={summary.profile?.primaryTrack}
            planInvalidatedAt={(summary.profile as any)?.planInvalidatedAt}
          />
        )}

        {/* Calorie bar */}
        <div className="bg-card border border-border shadow-sm rounded-2xl p-4 space-y-3">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Daily Calories</p>
              <p className="text-2xl font-bold text-primary">
                {Math.round(summary.totalCalories)}{" "}
                <span className="text-sm font-normal text-muted-foreground">/ {summary.targetCalories} kcal</span>
              </p>
            </div>
          </div>
          <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, (summary.totalCalories / summary.targetCalories) * 100)}%` }}
            />
          </div>
        </div>

        {/* Tip */}
        {summary.tipOfDay && (
          <div className="bg-orange-50 border border-orange-100 dark:bg-orange-950/20 dark:border-orange-900/30 rounded-2xl p-4 flex gap-3 items-start">
            <span className="text-2xl">💡</span>
            <p className="text-sm text-orange-800 dark:text-orange-200 font-medium leading-snug">{summary.tipOfDay}</p>
          </div>
        )}

        {/* Track promo banners */}
        {summary.profile?.primaryTrack === "kids" && (
          <Link href="/dashboard/lunchbox">
            <div className="relative overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-4 flex items-center justify-between shadow-sm active:scale-[0.98] transition-transform">
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-white/10 rounded-full" />
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎒</span>
                <div>
                  <p className="text-white font-bold text-sm">Kids Lunch Box Ideas</p>
                  <p className="text-yellow-100 text-xs">10+ tiffin recipes your child will love</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white shrink-0" />
            </div>
          </Link>
        )}

        {summary.profile?.primaryTrack === "fitness" && (
          <Link href="/dashboard/fitness">
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl p-4 flex items-center justify-between shadow-sm active:scale-[0.98] transition-transform">
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-white/10 rounded-full" />
              <div className="flex items-center gap-3">
                <span className="text-3xl">💪</span>
                <div>
                  <p className="text-white font-bold text-sm">Your Gym Nutrition Hub</p>
                  <p className="text-blue-200 text-xs">Pre/Post workout · Lean · Keto · Gaining</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white shrink-0" />
            </div>
          </Link>
        )}

        {/* Today's Plan */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Today's Plan</h2>
            <Link href="/dashboard/week" className="text-xs text-primary font-semibold">
              Full week →
            </Link>
          </div>

          <div className="space-y-2.5">
            {meals.map((meal) =>
              meal.dish ? (
                <div
                  key={meal.type}
                  className={`flex items-center gap-3 bg-card border border-border shadow-sm rounded-2xl overflow-hidden transition-opacity ${
                    swapping === meal.type ? "opacity-60" : "opacity-100"
                  }`}
                >
                  {/* Dish image — taps to recipe */}
                  <Link
                    href={`/dashboard/recipe/${meal.dish.id}`}
                    className="w-20 h-20 shrink-0 relative"
                  >
                    {swapping === meal.type ? (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                      </div>
                    ) : (
                      <DishImage
                        photoUrl={meal.dish.photoUrl}
                        name={meal.dish.name}
                        className="w-full h-full"
                        emojiSize="text-3xl"
                      />
                    )}
                  </Link>

                  {/* Dish info — taps to recipe */}
                  <Link
                    href={`/dashboard/recipe/${meal.dish.id}`}
                    className="flex-1 min-w-0 py-2"
                  >
                    <p className="text-[10px] font-bold text-primary uppercase tracking-wider">{meal.label}</p>
                    <h3 className="font-semibold text-foreground text-sm leading-tight mt-0.5 line-clamp-2">{meal.dish.name}</h3>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {meal.dish.prepTimeMin}m</span>
                      <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5" /> {meal.dish.macros?.cal}</span>
                    </div>
                  </Link>

                  {/* Swap button */}
                  <button
                    onClick={() => handleSwap(meal.type, meal.dish!.id)}
                    disabled={!!swapping}
                    className="shrink-0 mr-3 flex flex-col items-center gap-1 p-2 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 active:scale-95 transition-all disabled:opacity-40"
                    title={`Swap ${meal.label}`}
                  >
                    {swapping === meal.type ? (
                      <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    ) : (
                      <ArrowLeftRight className="w-5 h-5" />
                    )}
                    <span className="text-[9px] font-semibold">Swap</span>
                  </button>
                </div>
              ) : null
            )}
          </div>

          {meals.every((m) => !m.dish) && (
            <div className="text-center py-8 text-muted-foreground text-sm">
              <p className="text-4xl mb-3">🍽️</p>
              <p>No plan yet — go to Week tab to generate your plan.</p>
              <Link href="/dashboard/week" className="mt-3 inline-block text-primary font-semibold text-sm">
                Generate Plan →
              </Link>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
      <NotificationPrompt />
    </div>
  );
}
