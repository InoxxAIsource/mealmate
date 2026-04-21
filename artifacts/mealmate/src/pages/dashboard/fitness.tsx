import { useMemo, useState } from "react";
import { useListDishes, useGetActiveMealPlan } from "@workspace/api-client-react";
import { BottomNav } from "@/components/bottom-nav";
import { DishImage } from "@/components/dish-image";
import { Link } from "wouter";
import { Clock, Flame, ChevronRight, Zap, Dumbbell, Droplets, Gauge, TrendingUp } from "lucide-react";

const CATEGORIES = [
  { key: "pre_workout",  label: "Pre-Workout",  emoji: "⚡", icon: Zap,       color: "from-yellow-500 to-amber-500",   bg: "bg-yellow-50 border-yellow-200",  tag: "Energy & Carbs" },
  { key: "post_workout", label: "Post-Workout", emoji: "💪", icon: Dumbbell,  color: "from-blue-500 to-indigo-500",    bg: "bg-blue-50 border-blue-200",     tag: "High Protein" },
  { key: "lean",         label: "Lean & Cut",   emoji: "🔥", icon: Flame,     color: "from-orange-500 to-red-500",    bg: "bg-orange-50 border-orange-200", tag: "Low Calorie" },
  { key: "keto",         label: "Keto",         emoji: "🥑", icon: Droplets,  color: "from-green-600 to-emerald-500", bg: "bg-green-50 border-green-200",   tag: "Low Carb" },
  { key: "gaining",      label: "Mass Gain",    emoji: "📈", icon: TrendingUp, color: "from-purple-600 to-violet-500", bg: "bg-purple-50 border-purple-200", tag: "Calorie Dense" },
];

const MACRO_TIPS: Record<string, { protein: string; carbs: string; fat: string; timing: string }> = {
  pre_workout:  { protein: "15–20g", carbs: "40–60g", fat: "5–10g",  timing: "60–90 min before" },
  post_workout: { protein: "30–40g", carbs: "20–40g", fat: "5–10g",  timing: "Within 30 min after" },
  lean:         { protein: "30–40g", carbs: "10–20g", fat: "5–10g",  timing: "Any time" },
  keto:         { protein: "25–35g", carbs: "< 10g",  fat: "20–35g", timing: "Any time" },
  gaining:      { protein: "35–50g", carbs: "60–90g", fat: "15–25g", timing: "Post-workout" },
};

export default function FitnessPage() {
  const { data: dishes, isLoading } = useListDishes();
  const { data: plan } = useGetActiveMealPlan();
  const [activeCategory, setActiveCategory] = useState<string>("pre_workout");

  const gymDishes = useMemo(() => {
    if (!dishes) return [];
    return dishes.filter((d) => d.healthFlags?.gymSafe);
  }, [dishes]);

  const categoryDishes = useMemo(() => {
    return gymDishes.filter((d) =>
      (d.healthFlags?.gymCategories ?? []).includes(activeCategory)
    );
  }, [gymDishes, activeCategory]);

  const activeCat = CATEGORIES.find((c) => c.key === activeCategory)!;
  const macros = MACRO_TIPS[activeCategory];

  const todayLunch = plan?.days?.[0]?.lunch;
  const todayBreakfast = plan?.days?.[0]?.breakfast;
  const todayDinner = plan?.days?.[0]?.dinner;

  return (
    <div className="min-h-[100dvh] bg-background max-w-md mx-auto pb-24">

      {/* Hero */}
      <div className={`relative overflow-hidden bg-gradient-to-br ${activeCat.color} px-5 pt-12 pb-8 transition-all duration-500`}>
        <div className="absolute -top-8 -right-8 w-36 h-36 bg-white/10 rounded-full" />
        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/10 rounded-full" />
        <div className="relative z-10">
          <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Fitness Nutrition</p>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-4xl">{activeCat.emoji}</span>
            <div>
              <h1 className="text-2xl font-bold text-white leading-tight">{activeCat.label}</h1>
              <span className="text-white/80 text-xs font-semibold bg-white/20 px-2 py-0.5 rounded-full">{activeCat.tag}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-5">

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold border transition-all ${
                activeCategory === cat.key
                  ? "bg-primary text-white border-primary shadow-sm"
                  : "bg-card border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Macro target guide */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">
            🎯 {activeCat.label} Macro Targets
          </p>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "Protein", value: macros.protein, color: "text-blue-600" },
              { label: "Carbs",   value: macros.carbs,   color: "text-amber-600" },
              { label: "Fat",     value: macros.fat,     color: "text-green-600" },
              { label: "Timing",  value: macros.timing,  color: "text-purple-600" },
            ].map((m) => (
              <div key={m.label} className="bg-muted/40 rounded-xl p-2 text-center">
                <p className={`text-[11px] font-bold leading-tight ${m.color}`}>{m.value}</p>
                <p className="text-[9px] text-muted-foreground mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Today's workout meals */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Today's Meals</p>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {[
              { label: "Breakfast", dish: todayBreakfast },
              { label: "Lunch",     dish: todayLunch },
              { label: "Dinner",    dish: todayDinner },
            ].map((item, i) =>
              item.dish ? (
                <Link
                  key={i}
                  href={`/dashboard/recipe/${item.dish.id}`}
                  className="flex items-center gap-3 p-3 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                    <DishImage photoUrl={item.dish.photoUrl} name={item.dish.name} className="w-full h-full" emojiSize="text-xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-primary uppercase">{item.label}</p>
                    <p className="text-sm font-semibold text-foreground truncate">{item.dish.name}</p>
                    <div className="flex gap-2 mt-0.5">
                      <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                        <Flame className="w-3 h-3" />{item.dish.macros.cal} kcal
                      </span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">{item.dish.macros.protein}g protein</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                </Link>
              ) : (
                <div key={i} className="flex items-center gap-3 p-3 border-b border-border last:border-b-0">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0 text-xl">🍽️</div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">{item.label}</p>
                    <p className="text-xs text-muted-foreground">Generate a plan to see meals</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Dish grid for selected category */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
            {activeCat.emoji} {activeCat.label} Recipes ({categoryDishes.length})
          </p>

          {isLoading ? (
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => <div key={i} className="bg-muted rounded-2xl h-44 animate-pulse" />)}
            </div>
          ) : categoryDishes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">No dishes found in this category.</div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {categoryDishes.map((dish) => {
                const cats = dish.healthFlags?.gymCategories ?? [];
                return (
                  <Link key={dish.id} href={`/dashboard/recipe/${dish.id}`}>
                    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="h-32 relative overflow-hidden">
                        <DishImage
                          photoUrl={dish.photoUrl}
                          name={dish.name}
                          className="w-full h-full"
                          emojiSize="text-4xl"
                        />
                        {/* Category badges */}
                        <div className="absolute bottom-1.5 left-1.5 flex gap-1 flex-wrap">
                          {cats.slice(0, 2).map((c) => {
                            const cat = CATEGORIES.find((x) => x.key === c);
                            return cat ? (
                              <span key={c} className="text-[9px] bg-black/60 text-white px-1.5 py-0.5 rounded-full font-semibold">
                                {cat.emoji} {cat.label}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                      <div className="p-2.5">
                        <p className="text-xs font-semibold text-foreground leading-tight line-clamp-2">{dish.name}</p>
                        <div className="flex items-center justify-between mt-1.5">
                          <span className="text-[10px] font-bold text-blue-600">{dish.macros.protein}g protein</span>
                          <span className="text-[10px] text-muted-foreground">{dish.macros.cal} kcal</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Workout nutrition tips */}
        <div className="space-y-2 pb-2">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">💡 Gym Nutrition Tips</p>
          {[
            { e: "🥛", t: "Aim for 1.6–2.2g protein per kg of bodyweight on training days." },
            { e: "⏰", t: "Eat your biggest carb-heavy meal within 2 hours post-workout for best recovery." },
            { e: "💧", t: "Drink 500ml water before training and 200–250ml every 20 min during workout." },
            { e: "🥜", t: "Never train fasted — have a light carb + protein snack 60 min before." },
            { e: "😴", t: "Sleep is when muscle is built — eat a slow-digesting protein (like curd) before bed." },
            { e: "🫀", t: "On rest days, reduce carbs by 30% and focus on protein + vegetables." },
          ].map((tip, i) => (
            <div key={i} className="flex gap-3 items-start bg-card border border-border rounded-xl p-3">
              <span className="text-lg shrink-0">{tip.e}</span>
              <p className="text-xs text-muted-foreground leading-relaxed">{tip.t}</p>
            </div>
          ))}
        </div>

      </div>

      <BottomNav />
    </div>
  );
}
