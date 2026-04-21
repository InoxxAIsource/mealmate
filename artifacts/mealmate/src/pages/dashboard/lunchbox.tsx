import { useMemo, useState } from "react";
import { useListDishes, useGetActiveMealPlan } from "@workspace/api-client-react";
import { BottomNav } from "@/components/bottom-nav";
import { DishImage } from "@/components/dish-image";
import { Link } from "wouter";
import { Clock, Flame, PackageCheck, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const TIPS = [
  { emoji: "🌈", tip: "Add one colourful veggie to every box — kids eat with their eyes first!" },
  { emoji: "🥛", tip: "Include a small curd or milk item for calcium — growing bones need it daily." },
  { emoji: "🧊", tip: "Keep the box cool with an ice pack if it has dairy or curd." },
  { emoji: "✂️", tip: "Cut food into fun shapes or bite-sized pieces — kids are more likely to eat it." },
  { emoji: "💧", tip: "Send a water bottle along — hydration helps kids focus in school." },
  { emoji: "🍱", tip: "Pack a small surprise treat (a date, a piece of jaggery) to make the box exciting." },
];

const CATEGORIES = [
  {
    key: "main",
    label: "Main Course",
    emoji: "🍱",
    color: "bg-yellow-50 border-yellow-200",
    headerColor: "bg-yellow-400",
    names: ["Paneer Fried Rice", "Aloo Paratha with Curd", "Veg Pasta in Tomato Sauce", "Veg Hakka Noodles", "Cheese Roti Roll", "Dal Khichdi", "Rajma Chawal", "Curd Rice", "Masoor Dal with Chapati", "Mini Veg Uttapam"],
  },
  {
    key: "tiffin",
    label: "Tiffin Snacks",
    emoji: "🥪",
    color: "bg-orange-50 border-orange-200",
    headerColor: "bg-orange-400",
    names: ["Grilled Corn Cheese Sandwich", "Bread Upma", "Peanut Butter Banana Toast", "Moong Dal Cheela", "Oats Upma", "Poha", "Egg Bhurji with Toast"],
  },
  {
    key: "sweet",
    label: "Sweet Treat",
    emoji: "🍮",
    color: "bg-pink-50 border-pink-200",
    headerColor: "bg-pink-400",
    names: ["Fruit Custard", "Makhana Kheer", "Banana Oat Smoothie"],
  },
];

export default function KidsLunchBox() {
  const { data: dishes, isLoading: dishesLoading } = useListDishes();
  const { data: plan } = useGetActiveMealPlan();
  const [activeCategory, setActiveCategory] = useState<string>("main");

  const kidsDishes = useMemo(() => {
    if (!dishes) return [];
    return dishes.filter((d) => d.healthFlags?.kidsSafe);
  }, [dishes]);

  const categoryDishes = useMemo(() => {
    const cat = CATEGORIES.find((c) => c.key === activeCategory);
    if (!cat || !kidsDishes.length) return [];
    return cat.names
      .map((name) => kidsDishes.find((d) => d.name === name))
      .filter(Boolean) as typeof kidsDishes;
  }, [kidsDishes, activeCategory]);

  const todayLunch = plan?.days?.[0]?.lunch;
  const todaySnack = plan?.days?.[0]?.snack;
  const todayBreakfast = plan?.days?.[0]?.breakfast;

  const tip = TIPS[new Date().getDay() % TIPS.length];

  return (
    <div className="min-h-[100dvh] bg-background max-w-md mx-auto pb-24">

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-yellow-400 to-orange-400 px-5 pt-12 pb-8">
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full" />
        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/10 rounded-full" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-3xl">🎒</span>
            <h1 className="text-2xl font-bold text-white">Kids Lunch Box</h1>
          </div>
          <p className="text-yellow-100 text-sm font-medium">
            Tasty, healthy tiffin ideas your child will actually eat
          </p>
        </div>
      </div>

      <div className="px-4 pt-5 space-y-5">

        {/* Today's Box */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <PackageCheck className="w-4 h-4 text-primary" />
            <h2 className="font-bold text-foreground text-sm uppercase tracking-wide">Today's Lunch Box</h2>
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            {[
              { label: "Morning Box", dish: todayBreakfast },
              { label: "Lunch Box", dish: todayLunch },
              { label: "Snack Box", dish: todaySnack },
            ].map((item, i) => (
              item.dish ? (
                <Link
                  key={i}
                  href={`/dashboard/recipe/${item.dish.id}`}
                  className="flex items-center gap-3 p-3 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                    <DishImage photoUrl={item.dish.photoUrl} name={item.dish.name} className="w-full h-full" emojiSize="text-2xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-primary uppercase">{item.label}</p>
                    <p className="text-sm font-semibold text-foreground truncate">{item.dish.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                        <Flame className="w-3 h-3" />{item.dish.macros.cal} kcal
                      </span>
                      <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />{item.dish.prepTimeMin}m
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                </Link>
              ) : (
                <div key={i} className="flex items-center gap-3 p-3 border-b border-border last:border-b-0">
                  <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    <span className="text-2xl">🍽️</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">{item.label}</p>
                    <p className="text-sm text-muted-foreground">Generate a plan to see this</p>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>

        {/* Tip of the day */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 flex gap-3 items-start">
          <span className="text-2xl">{tip.emoji}</span>
          <div>
            <p className="text-xs font-bold text-yellow-700 uppercase mb-0.5">Packing Tip</p>
            <p className="text-sm text-yellow-800 font-medium leading-snug">{tip.tip}</p>
          </div>
        </div>

        {/* Browse dishes by category */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <h2 className="font-bold text-foreground text-sm uppercase tracking-wide">Browse Lunch Box Ideas</h2>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold border transition-all ${
                  activeCategory === cat.key
                    ? "bg-primary text-white border-primary"
                    : "bg-card border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Dish grid */}
          {dishesLoading ? (
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-muted rounded-2xl h-40 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {categoryDishes.map((dish) => (
                <Link key={dish.id} href={`/dashboard/recipe/${dish.id}`}>
                  <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-32 overflow-hidden">
                      <DishImage
                        photoUrl={dish.photoUrl}
                        name={dish.name}
                        className="w-full h-full"
                        emojiSize="text-4xl"
                      />
                    </div>
                    <div className="p-2.5">
                      <p className="text-xs font-semibold text-foreground leading-tight line-clamp-2">{dish.name}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px] text-muted-foreground">{dish.macros.cal} kcal</span>
                        <span className="text-[10px] text-muted-foreground">{dish.prepTimeMin}m</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              {categoryDishes.length === 0 && (
                <div className="col-span-2 text-center py-8 text-muted-foreground text-sm">
                  No dishes found in this category yet.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Nutrition guidelines for kids */}
        <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
          <h3 className="font-bold text-sm text-foreground">🌟 Ideal Kids Lunch Box</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Calories", value: "400–550 kcal", color: "text-orange-600" },
              { label: "Protein", value: "10–15g", color: "text-blue-600" },
              { label: "Carbs", value: "50–65g", color: "text-amber-600" },
              { label: "Calcium", value: "≥ 100mg", color: "text-green-600" },
            ].map((n) => (
              <div key={n.label} className="bg-muted/40 rounded-xl p-3 text-center">
                <p className={`text-sm font-bold ${n.color}`}>{n.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{n.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* All packing tips */}
        <div className="space-y-2">
          <h3 className="font-bold text-sm text-foreground">📦 Smart Packing Tips</h3>
          {TIPS.map((t, i) => (
            <div key={i} className="flex gap-3 items-start bg-card border border-border rounded-xl p-3">
              <span className="text-xl shrink-0">{t.emoji}</span>
              <p className="text-xs text-muted-foreground leading-relaxed">{t.tip}</p>
            </div>
          ))}
        </div>

      </div>

      <BottomNav />
    </div>
  );
}
