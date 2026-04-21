import { useState } from "react";
import {
  useGetActiveMealPlan,
  useSwapMeal,
  useToggleLockMeal,
  useGenerateMealPlan,
  getGetActiveMealPlanQueryKey,
  type SwapMealBodyMealType,
  type LockMealBodyMealType,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { BottomNav } from "@/components/bottom-nav";
import { DishImage } from "@/components/dish-image";
import { Link } from "wouter";
import { RefreshCw, Lock, Unlock, ArrowLeftRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const DAY_LABELS = ["Today", "Tomorrow", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function getDayLabel(dayIndex: number): string {
  const date = new Date();
  date.setDate(date.getDate() + dayIndex);
  if (dayIndex === 0) return "Today";
  if (dayIndex === 1) return "Tomorrow";
  return date.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" });
}

export default function DashboardWeek() {
  const queryClient = useQueryClient();
  const { data: plan, isLoading } = useGetActiveMealPlan({
    query: { queryKey: getGetActiveMealPlanQueryKey() },
  });
  const swapMeal = useSwapMeal();
  const toggleLock = useToggleLockMeal();
  const generatePlan = useGenerateMealPlan();

  const [swapping, setSwapping] = useState<string | null>(null);
  const [locking, setLocking] = useState<string | null>(null);

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: getGetActiveMealPlanQueryKey() });

  const handleSwap = async (dayIndex: number, mealType: SwapMealBodyMealType, currentDishId: number) => {
    const key = `${dayIndex}-${mealType}`;
    setSwapping(key);
    try {
      await swapMeal.mutateAsync({
        data: { planId: plan!.id, dayIndex, mealType, currentDishId },
      });
      await invalidate();
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

  const handleRegenerate = async () => {
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
      <div className="min-h-[100dvh] flex flex-col items-center justify-center gap-4 p-6 max-w-md mx-auto">
        <p className="text-muted-foreground text-center">No meal plan yet. Generate one to get started.</p>
        <Button onClick={handleRegenerate} disabled={generatePlan.isPending}>
          {generatePlan.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          Generate My Plan
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-background max-w-md mx-auto pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-5 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">This Week</h1>
        <Button
          variant="outline"
          size="sm"
          className="h-8 rounded-full text-xs gap-1.5"
          onClick={handleRegenerate}
          disabled={generatePlan.isPending}
          data-testid="btn-regenerate"
        >
          {generatePlan.isPending ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <RefreshCw className="w-3 h-3" />
          )}
          Regenerate
        </Button>
      </div>

      <div className="px-4 pt-4 space-y-6">
        {plan.days.map((day) => (
          <div key={day.dayIndex}>
            {/* Day label */}
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 px-1">
              {getDayLabel(day.dayIndex)}
            </p>

            <div className="space-y-2">
              {[
                { type: "breakfast", dish: day.breakfast },
                { type: "lunch", dish: day.lunch },
                { type: "snack", dish: day.snack },
                { type: "dinner", dish: day.dinner },
              ].map((meal) => {
                if (!meal.dish) return null;
                const key = `${day.dayIndex}-${meal.type}`;
                const isSwapping = swapping === key;
                const isLocking = locking === key;
                const isLocked = day.lockedSlots?.includes(meal.type);

                return (
                  <div
                    key={meal.type}
                    className={`flex items-center gap-3 bg-card border rounded-2xl overflow-hidden transition-opacity ${
                      isSwapping ? "opacity-50" : "opacity-100"
                    } ${isLocked ? "border-primary/30" : "border-border"}`}
                    data-testid={`meal-row-${day.dayIndex}-${meal.type}`}
                  >
                    {/* Dish image thumbnail */}
                    <Link
                      href={`/dashboard/recipe/${meal.dish.id}`}
                      className="w-16 h-16 shrink-0 relative"
                    >
                      {isSwapping ? (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                        </div>
                      ) : (
                        <DishImage
                          photoUrl={meal.dish.photoUrl}
                          name={meal.dish.name}
                          className="w-full h-full"
                          emojiSize="text-2xl"
                        />
                      )}
                    </Link>

                    {/* Meal info */}
                    <Link
                      href={`/dashboard/recipe/${meal.dish.id}`}
                      className="flex-1 min-w-0 py-1"
                    >
                      <p className="text-[10px] font-bold text-primary uppercase tracking-wide">
                        {meal.type}
                      </p>
                      <p className="text-sm font-semibold text-foreground leading-tight truncate">
                        {meal.dish.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {meal.dish.macros?.cal} kcal · {meal.dish.prepTimeMin}m
                      </p>
                    </Link>

                    {/* Actions */}
                    <div className="flex items-center gap-0.5 pr-2 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl"
                        onClick={() => handleSwap(day.dayIndex, meal.type as SwapMealBodyMealType, meal.dish!.id)}
                        disabled={isSwapping || isLocking || isLocked}
                        data-testid={`btn-swap-${day.dayIndex}-${meal.type}`}
                      >
                        {isSwapping ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <ArrowLeftRight className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-9 w-9 rounded-xl ${
                          isLocked
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                        }`}
                        onClick={() => handleLock(day.dayIndex, meal.type as LockMealBodyMealType, !isLocked)}
                        disabled={isSwapping || isLocking}
                        data-testid={`btn-lock-${day.dayIndex}-${meal.type}`}
                      >
                        {isLocking ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : isLocked ? (
                          <Lock className="w-4 h-4" />
                        ) : (
                          <Unlock className="w-4 h-4" />
                        )}
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
  );
}
