import { useGetDish, useGetMyProfile } from "@workspace/api-client-react";
import { BottomNav } from "@/components/bottom-nav";
import { DishImage } from "@/components/dish-image";
import { useRoute, Link } from "wouter";
import { ChevronLeft, Clock, Flame, Info, Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

function YouTubeShortsCard({ dishName, youtubeUrl }: { dishName: string; youtubeUrl?: string | null }) {
  const searchQuery = encodeURIComponent(`${dishName} recipe shorts`);
  const shortsSearchUrl = `https://www.youtube.com/results?search_query=${searchQuery}&sp=EgIQAQ%3D%3D`;
  const hindiSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(dishName + ' recipe')}&sp=EgIQAQ%3D%3D`;
  const primaryUrl = youtubeUrl ?? shortsSearchUrl;

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-foreground">Watch How to Make It</h3>

      <div className="rounded-2xl overflow-hidden border border-red-100 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="flex items-center gap-3 p-4">
          <div className="w-12 h-12 bg-[#FF0000] rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="white">
              <path d="M23 7s-.27-1.93-1.1-2.78c-1.05-1.1-2.23-1.1-2.77-1.17C16.24 3 12 3 12 3s-4.24 0-7.13.05c-.54.07-1.72.07-2.77 1.17C1.27 5.07 1 7 1 7S.73 9.2.73 11.4v2.07C.73 15.6 1 17.8 1 17.8s.27 1.93 1.1 2.77c1.05 1.1 2.43 1.07 3.04 1.18C7.08 22 12 22 12 22s4.24 0 7.13-.25c.54-.07 1.72-.07 2.77-1.17.83-.84 1.1-2.77 1.1-2.77S23.27 15.6 23.27 13.4v-2.07C23.27 9.2 23 7 23 7z" fill="#FF0000"/>
              <polygon fill="white" points="9.74 15.5 9.74 8.5 16.5 12"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm text-foreground leading-tight">{dishName}</p>
            <p className="text-xs text-red-600 font-medium mt-0.5">
              {youtubeUrl ? "YouTube · Curated recipe video" : "YouTube Shorts · Quick recipe videos"}
            </p>
          </div>
        </div>

        <div className="px-4 pb-4 grid grid-cols-2 gap-2">
          <a
            href={primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#FF0000] text-white text-xs font-bold py-3 px-3 rounded-xl active:scale-[0.97] transition-transform shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            {youtubeUrl ? "Watch Recipe" : "English Shorts"}
          </a>
          <a
            href={hindiSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-white border border-red-200 text-red-600 text-xs font-bold py-3 px-3 rounded-xl active:scale-[0.97] transition-transform"
          >
            <Play className="w-3.5 h-3.5 fill-red-600" />
            हिंदी में देखें
          </a>
        </div>

        <div className="border-t border-red-100 px-4 py-2.5 flex items-center gap-2">
          <ExternalLink className="w-3 h-3 text-muted-foreground shrink-0" />
          <p className="text-[10px] text-muted-foreground">
            {youtubeUrl ? "Opens YouTube · Curated recipe video" : "Opens YouTube · Shows Shorts matching this recipe"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DashboardRecipe() {
  const [, params] = useRoute("/dashboard/recipe/:id");
  const dishId = Number(params?.id);
  const { data: dish, isLoading } = useGetDish(dishId, { query: { enabled: !!dishId } });
  const { data: profile } = useGetMyProfile();

  if (isLoading || !dish) {
    return <div className="min-h-[100dvh] flex items-center justify-center"><div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full"></div></div>;
  }

  const getBenefit = () => {
    if (!profile?.primaryTrack) return null;
    const track = profile.primaryTrack.toLowerCase();
    if (track === 'pcos' && dish.benefitsPcos) return dish.benefitsPcos;
    if (track === 'diabetes' && dish.benefitsDiabetes) return dish.benefitsDiabetes;
    if (track === 'thyroid' && dish.benefitsThyroid) return dish.benefitsThyroid;
    if (track === 'pregnancy' && dish.benefitsPregnancy) return dish.benefitsPregnancy;
    if (track === 'kids' && dish.benefitsKids) return dish.benefitsKids;
    if (track === 'fitness' && dish.benefitsGym) return dish.benefitsGym;
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
        <DishImage
          photoUrl={dish.photoUrl}
          name={dish.name}
          className="w-full h-full"
          emojiSize="text-7xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="absolute bottom-12 right-4 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1.5 rounded-full">
          <div className="w-4 h-4 bg-[#FF0000] rounded-sm flex items-center justify-center">
            <Play className="w-2.5 h-2.5 fill-white text-white" />
          </div>
          {(dish as any).youtubeUrl ? "Watch Recipe" : "Watch Shorts"}
        </div>
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

        <YouTubeShortsCard dishName={dish.name} youtubeUrl={(dish as any).youtubeUrl} />

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
