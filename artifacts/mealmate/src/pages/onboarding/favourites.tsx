import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useListDishes } from "@workspace/api-client-react";
import { DishImage } from "@/components/dish-image";

export default function OnboardingFavourites() {
  const [, setLocation] = useLocation();
  const { data: dishes, isLoading } = useListDishes();
  
  const [favourites, setFavourites] = useState<number[]>([]);
  const [dislikes, setDislikes] = useState<number[]>([]);

  const handleNext = () => {
    const current = JSON.parse(localStorage.getItem("onboarding_data") || "{}");
    localStorage.setItem("onboarding_data", JSON.stringify({ 
      ...current, 
      favouriteDishIds: favourites,
      dislikedDishIds: dislikes
    }));
    setLocation("/onboarding/cooking");
  };

  const toggleStatus = (id: number) => {
    if (favourites.includes(id)) {
      setFavourites(favourites.filter(fid => fid !== id));
      setDislikes([...dislikes, id]);
    } else if (dislikes.includes(id)) {
      setDislikes(dislikes.filter(did => did !== id));
    } else {
      setFavourites([...favourites, id]);
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background max-w-md mx-auto p-6">
      <div className="flex-1 space-y-6 mt-8">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Step 5 of 6</p>
          <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary w-5/6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mt-4">Tap what you love</h1>
          <p className="text-muted-foreground text-sm">Tap once to love ❤️, twice to dislike 🚫, three times to reset.</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-4">
            {[1,2,3,4].map(i => <div key={i} className="h-32 bg-muted animate-pulse rounded-xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 overflow-y-auto pb-20">
            {dishes?.slice(0, 10).map((dish) => {
              const isFav = favourites.includes(dish.id);
              const isDis = dislikes.includes(dish.id);
              
              return (
                <button
                  key={dish.id}
                  onClick={() => toggleStatus(dish.id)}
                  className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all text-left ${
                    isFav ? "border-green-500" : isDis ? "border-red-500 opacity-60" : "border-transparent"
                  }`}
                >
                  <DishImage photoUrl={dish.photoUrl} name={dish.name} className="absolute inset-0 w-full h-full" emojiSize="text-4xl" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-3 w-full">
                    <p className="text-white font-medium leading-tight text-sm line-clamp-2">{dish.name}</p>
                  </div>
                  {isFav && <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm">❤️</div>}
                  {isDis && <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm">🚫</div>}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="pt-4 pb-4 flex gap-3 bg-background z-10 sticky bottom-0">
        <Button variant="outline" className="h-14 w-1/3 rounded-full text-lg" onClick={() => setLocation("/onboarding/conditions")}>Back</Button>
        <Button 
          className="h-14 flex-1 rounded-full text-lg shadow-md" 
          onClick={handleNext}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}