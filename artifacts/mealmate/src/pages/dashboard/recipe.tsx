import { useGetDish, useGetMyProfile } from "@workspace/api-client-react";
import { BottomNav } from "@/components/bottom-nav";
import { useRoute, Link } from "wouter";
import { ChevronLeft, Clock, Flame, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardRecipe() {
  const [, params] = useRoute("/dashboard/recipe/:id");
  const dishId = Number(params?.id);
  const { data: dish, isLoading } = useGetDish(dishId, { query: { enabled: !!dishId } });
  const { data: profile } = useGetMyProfile();

  if (isLoading || !dish) {
    return <div className="min-h-[100dvh] flex items-center justify-center"><div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full"></div></div>;
  }

  // Get specific benefit for user's track if available
  const getBenefit = () => {
    if (!profile?.primaryTrack) return null;
    const track = profile.primaryTrack.toLowerCase();
    
    if (track === 'pcos' && dish.benefitsPcos) return dish.benefitsPcos;
    if (track === 'diabetes' && dish.benefitsDiabetes) return dish.benefitsDiabetes;
    if (track === 'thyroid' && dish.benefitsThyroid) return dish.benefitsThyroid;
    if (track === 'pregnancy' && dish.benefitsPregnancy) return dish.benefitsPregnancy;
    if (track === 'kids' && dish.benefitsKids) return dish.benefitsKids;
    
    return null;
  };

  const trackBenefit = getBenefit();

  return (
    <div className="min-h-[100dvh] bg-background max-w-md mx-auto pb-20 relative">
      <div className="absolute top-4 left-4 z-10">
        <Link href="/dashboard">
          <Button variant="secondary" size="icon" className="rounded-full shadow-md bg-white/80 backdrop-blur text-foreground hover:bg-white">
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </Link>
      </div>

      <div className="w-full h-64 bg-muted relative">
        {dish.photoUrl ? (
          <img src={dish.photoUrl} alt={dish.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl bg-secondary">🍲</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
      </div>

      <div className="p-6 -mt-8 relative z-10 space-y-6">
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
              {dish.dietType}
            </span>
            {dish.region?.map((r: string) => (
              <span key={r} className="px-2.5 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                {r}
              </span>
            ))}
          </div>
          <h1 className="text-2xl font-bold text-foreground leading-tight mb-4">{dish.name}</h1>
          
          <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> {dish.prepTimeMin} mins</div>
            <div className="flex items-center gap-1.5"><Flame className="w-4 h-4 text-orange-500" /> {dish.macros?.cal || 0} kcal</div>
          </div>
        </div>

        {trackBenefit && (
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex gap-3">
            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-foreground/90 font-medium leading-relaxed">{trackBenefit}</p>
          </div>
        )}

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-foreground">Ingredients</h3>
          <ul className="space-y-2 bg-card border border-border rounded-2xl p-4">
            {dish.ingredients?.map((ing: any, i: number) => (
              <li key={i} className="flex justify-between text-sm py-1 border-b border-border/50 last:border-0">
                <span className="text-foreground capitalize">{ing.name.replace(/_/g, ' ')}</span>
                <span className="text-muted-foreground font-medium">{ing.grams}g</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-foreground">Nutrition</h3>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Prot', val: dish.macros?.protein, unit: 'g' },
              { label: 'Carb', val: dish.macros?.carbs, unit: 'g' },
              { label: 'Fat', val: dish.macros?.fat, unit: 'g' },
              { label: 'Fibr', val: dish.macros?.fibre, unit: 'g' },
            ].map(m => (
              <div key={m.label} className="bg-secondary/50 rounded-xl p-3 text-center border border-border/50">
                <p className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wider">{m.label}</p>
                <p className="text-sm font-bold text-foreground">{m.val}{m.unit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}