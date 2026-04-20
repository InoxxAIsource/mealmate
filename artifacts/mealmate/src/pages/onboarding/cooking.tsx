import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useUpsertProfile, useGenerateMealPlan } from "@workspace/api-client-react";

export default function OnboardingCooking() {
  const [, setLocation] = useLocation();
  const upsertProfile = useUpsertProfile();
  const generatePlan = useGenerateMealPlan();
  const [isGenerating, setIsGenerating] = useState(false);

  const [data, setData] = useState({
    weekdayCookTime: "30-45 mins",
    weekendCookTime: "1 hour+",
    allergyInput: "",
    allergies: [] as string[]
  });

  const handleAddAllergy = () => {
    if (data.allergyInput && !data.allergies.includes(data.allergyInput)) {
      setData({
        ...data,
        allergies: [...data.allergies, data.allergyInput],
        allergyInput: ""
      });
    }
  };

  const handleFinish = async () => {
    setIsGenerating(true);
    try {
      const saved = JSON.parse(localStorage.getItem("onboarding_data") || "{}");
      
      const payload = {
        name: saved.name,
        ageRange: saved.ageRange,
        gender: saved.gender,
        heightCm: Number(saved.heightCm),
        weightKg: Number(saved.weightKg),
        familySize: saved.familySize,
        primaryTrack: saved.track,
        region: saved.region,
        dietType: saved.dietType,
        proteinPreferences: saved.proteinPreferences,
        conditionData: saved.conditionData,
        weekdayCookTime: data.weekdayCookTime,
        weekendCookTime: data.weekendCookTime,
        allergies: data.allergies,
        onboardingComplete: true
      };

      await upsertProfile.mutateAsync({ data: payload });
      // Skip preferences update for now if hook is missing or do it if available
      await generatePlan.mutateAsync({ data: { forceRegenerate: true } });
      
      setLocation("/dashboard");
    } catch (e) {
      console.error(e);
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-background text-center p-6 space-y-6">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary"></div>
        <h2 className="text-2xl font-bold text-foreground">Building your plan...</h2>
        <p className="text-muted-foreground max-w-[250px]">Applying health rules and adding your favourite recipes.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background max-w-md mx-auto p-6">
      <div className="flex-1 space-y-8 mt-8">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Step 6 of 6</p>
          <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary w-full" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mt-4">Cooking & Allergies</h1>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Weekday Cooking Time (per meal)</Label>
            <Select value={data.weekdayCookTime} onValueChange={(v) => setData({ ...data, weekdayCookTime: v })}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Under 15 mins">Under 15 mins</SelectItem>
                <SelectItem value="15-30 mins">15-30 mins</SelectItem>
                <SelectItem value="30-45 mins">30-45 mins</SelectItem>
                <SelectItem value="45 mins+">45 mins+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Weekend Cooking Time</Label>
            <Select value={data.weekendCookTime} onValueChange={(v) => setData({ ...data, weekendCookTime: v })}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Under 30 mins">Under 30 mins</SelectItem>
                <SelectItem value="30-60 mins">30-60 mins</SelectItem>
                <SelectItem value="1 hour+">1 hour+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Any allergies or strict dislikes?</Label>
            <div className="flex gap-2">
              <Input 
                value={data.allergyInput}
                onChange={e => setData({ ...data, allergyInput: e.target.value })}
                placeholder="e.g. Peanuts, Dairy"
                className="h-12 flex-1"
                onKeyDown={(e) => { if (e.key === 'Enter') handleAddAllergy(); }}
              />
              <Button type="button" onClick={handleAddAllergy} className="h-12 px-6">Add</Button>
            </div>
            
            {data.allergies.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {data.allergies.map(a => (
                  <span key={a} className="bg-destructive/10 text-destructive px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                    {a}
                    <button onClick={() => setData({ ...data, allergies: data.allergies.filter(x => x !== a) })} className="text-destructive/70 hover:text-destructive">×</button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pt-8 pb-4 flex gap-3">
        <Button variant="outline" className="h-14 w-1/3 rounded-full text-lg" onClick={() => setLocation("/onboarding/favourites")}>Back</Button>
        <Button 
          className="h-14 flex-1 rounded-full text-lg shadow-md bg-green-600 hover:bg-green-700 text-white" 
          onClick={handleFinish}
        >
          Generate My Plan
        </Button>
      </div>
    </div>
  );
}