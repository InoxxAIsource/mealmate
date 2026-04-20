import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const REGIONS = ["North", "South", "East", "West", "Northeast", "Mix"];
const DIETS = ["Pure Veg", "Eggetarian", "Non-Veg", "Jain", "Vegan"];
const PROTEINS = ["Chicken", "Mutton", "Fish", "Egg", "Seafood"];

export default function OnboardingRegion() {
  const [, setLocation] = useLocation();
  const [data, setData] = useState({
    region: "",
    dietType: "",
    proteinPreferences: [] as string[]
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("onboarding_data") || "{}");
    if (saved) {
      setData((prev) => ({ 
        ...prev, 
        region: saved.region || "",
        dietType: saved.dietType || "",
        proteinPreferences: saved.proteinPreferences || []
      }));
    }
  }, []);

  const handleNext = () => {
    const current = JSON.parse(localStorage.getItem("onboarding_data") || "{}");
    localStorage.setItem("onboarding_data", JSON.stringify({ ...current, ...data }));
    setLocation("/onboarding/conditions");
  };

  const toggleProtein = (p: string) => {
    setData((prev) => ({
      ...prev,
      proteinPreferences: prev.proteinPreferences.includes(p)
        ? prev.proteinPreferences.filter((x) => x !== p)
        : [...prev.proteinPreferences, p]
    }));
  };

  const isValid = data.region && data.dietType && (data.dietType !== "Non-Veg" || data.proteinPreferences.length > 0);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background max-w-md mx-auto p-6">
      <div className="flex-1 space-y-8 mt-8">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Step 3 of 6</p>
          <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary w-3/6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mt-4">Your Food Preferences</h1>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base">Regional Cuisine Preference</Label>
            <div className="grid grid-cols-3 gap-2">
              {REGIONS.map((r) => (
                <Button
                  key={r}
                  variant={data.region === r ? "default" : "outline"}
                  className="h-12"
                  onClick={() => setData({ ...data, region: r })}
                >
                  {r}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base">Diet Type</Label>
            <div className="flex flex-wrap gap-2">
              {DIETS.map((d) => (
                <Button
                  key={d}
                  variant={data.dietType === d ? "default" : "outline"}
                  className="h-12 flex-1 min-w-[100px]"
                  onClick={() => {
                    setData({ ...data, dietType: d, proteinPreferences: d === "Non-Veg" ? data.proteinPreferences : [] });
                  }}
                >
                  {d}
                </Button>
              ))}
            </div>
          </div>

          {data.dietType === "Non-Veg" && (
            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
              <Label className="text-base">Preferred Proteins</Label>
              <div className="flex flex-wrap gap-2">
                {PROTEINS.map((p) => (
                  <Button
                    key={p}
                    variant={data.proteinPreferences.includes(p) ? "default" : "outline"}
                    className="h-10 rounded-full px-4"
                    onClick={() => toggleProtein(p)}
                  >
                    {p}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="pt-8 pb-4 flex gap-3">
        <Button variant="outline" className="h-14 w-1/3 rounded-full text-lg" onClick={() => setLocation("/onboarding/basics")}>Back</Button>
        <Button 
          className="h-14 flex-1 rounded-full text-lg shadow-md" 
          onClick={handleNext}
          disabled={!isValid}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}