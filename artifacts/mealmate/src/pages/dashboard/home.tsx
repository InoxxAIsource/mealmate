import { useGetDashboardSummary, getGetDashboardSummaryQueryKey } from "@workspace/api-client-react";
import { BottomNav } from "@/components/bottom-nav";
import { DishImage } from "@/components/dish-image";
import { Link } from "wouter";
import { Clock, Flame } from "lucide-react";

export default function DashboardHome() {
  const { data: summary, isLoading } = useGetDashboardSummary();

  if (isLoading || !summary) {
    return <div className="min-h-[100dvh] flex items-center justify-center"><div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full"></div></div>;
  }

  const meals = [
    { type: "Breakfast", dish: summary.todayMeals?.breakfast },
    { type: "Lunch", dish: summary.todayMeals?.lunch },
    { type: "Snack", dish: summary.todayMeals?.snack },
    { type: "Dinner", dish: summary.todayMeals?.dinner },
  ];

  return (
    <div className="min-h-[100dvh] bg-background max-w-md mx-auto pb-20">
      <div className="p-6 space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Hi, {summary.profile?.name?.split(" ")[0] || "there"} 👋</h1>
          <p className="text-muted-foreground text-sm">{new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
        </div>

        <div className="bg-card border border-border shadow-sm rounded-2xl p-4 space-y-3">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Daily Calories</p>
              <p className="text-2xl font-bold text-primary">{Math.round(summary.totalCalories)} <span className="text-sm font-normal text-muted-foreground">/ {summary.targetCalories} kcal</span></p>
            </div>
          </div>
          <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full" 
              style={{ width: `${Math.min(100, (summary.totalCalories / summary.targetCalories) * 100)}%` }}
            />
          </div>
        </div>

        {summary.tipOfDay && (
          <div className="bg-orange-50 border border-orange-100 dark:bg-orange-950/20 dark:border-orange-900/30 rounded-2xl p-4 flex gap-3 items-start">
            <span className="text-2xl">💡</span>
            <p className="text-sm text-orange-800 dark:text-orange-200 font-medium leading-snug">{summary.tipOfDay}</p>
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Today's Plan</h2>
          
          <div className="space-y-3">
            {meals.map((meal) => meal.dish ? (
              <Link 
                key={meal.type} 
                href={`/dashboard/recipe/${meal.dish.id}`}
                className="flex items-center gap-4 bg-card border border-border shadow-sm rounded-2xl p-3 active:scale-[0.98] transition-transform"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted shrink-0 relative">
                  <DishImage
                    photoUrl={meal.dish.photoUrl}
                    name={meal.dish.name}
                    className="w-full h-full"
                    emojiSize="text-3xl"
                  />
                </div>
                <div className="flex-1 min-w-0 py-1">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider">{meal.type}</p>
                  <h3 className="font-medium text-foreground text-sm leading-tight mt-0.5 line-clamp-2">{meal.dish.name}</h3>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {meal.dish.prepTimeMin}m</span>
                    <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5" /> {meal.dish.macros?.cal}</span>
                  </div>
                </div>
              </Link>
            ) : null)}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}