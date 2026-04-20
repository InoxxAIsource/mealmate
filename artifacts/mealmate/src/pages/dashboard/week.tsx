import { useGetActiveMealPlan, useSwapMeal, useToggleLockMeal } from "@workspace/api-client-react";
import { BottomNav } from "@/components/bottom-nav";
import { Link } from "wouter";
import { RefreshCw, Lock, Unlock, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardWeek() {
  const { data: plan, isLoading, refetch } = useGetActiveMealPlan();
  const swapMeal = useSwapMeal();
  const toggleLock = useToggleLockMeal();

  if (isLoading) {
    return <div className="min-h-[100dvh] flex items-center justify-center"><div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full"></div></div>;
  }

  const handleSwap = async (dayIndex: number, mealType: any, currentDishId: number) => {
    await swapMeal.mutateAsync({ data: { planId: plan!.id, dayIndex, mealType, currentDishId } });
    refetch();
  };

  const handleLock = async (dayIndex: number, mealType: any, locked: boolean) => {
    await toggleLock.mutateAsync({ data: { planId: plan!.id, dayIndex, mealType, locked } });
    refetch();
  };

  return (
    <div className="min-h-[100dvh] bg-background max-w-md mx-auto pb-20">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">This Week</h1>
          <Button variant="outline" size="sm" className="h-8 rounded-full text-xs" onClick={() => refetch()}>
            <RefreshCw className="w-3 h-3 mr-1.5" /> Refresh
          </Button>
        </div>

        <div className="space-y-8">
          {plan?.days.map((day) => {
            const date = new Date();
            date.setDate(date.getDate() + day.dayIndex);
            
            return (
              <div key={day.dayIndex} className="space-y-3">
                <h3 className="font-semibold text-muted-foreground border-b border-border pb-2">
                  {day.dayIndex === 0 ? "Today" : day.dayIndex === 1 ? "Tomorrow" : date.toLocaleDateString('en-IN', { weekday: 'long' })}
                </h3>
                
                <div className="space-y-2">
                  {[
                    { type: 'breakfast', dish: day.breakfast },
                    { type: 'lunch', dish: day.lunch },
                    { type: 'snack', dish: day.snack },
                    { type: 'dinner', dish: day.dinner }
                  ].map((meal) => meal.dish ? (
                    <div key={meal.type} className="flex items-center gap-3 bg-card border border-border rounded-xl p-2.5">
                      <Link href={`/dashboard/recipe/${meal.dish.id}`} className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-primary uppercase">{meal.type}</p>
                        <p className="text-sm font-medium text-foreground truncate">{meal.dish.name}</p>
                      </Link>
                      
                      <div className="flex items-center gap-1 shrink-0">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          onClick={() => handleSwap(day.dayIndex, meal.type as any, meal.dish!.id)}
                        >
                          <ArrowLeftRight className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className={`h-8 w-8 ${day.lockedSlots?.includes(meal.type) ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'}`}
                          onClick={() => handleLock(day.dayIndex, meal.type as any, !day.lockedSlots?.includes(meal.type))}
                        >
                          {day.lockedSlots?.includes(meal.type) ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  ) : null)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}