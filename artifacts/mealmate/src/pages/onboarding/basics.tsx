import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function OnboardingBasics() {
  const [, setLocation] = useLocation();
  const [data, setData] = useState({
    name: "",
    ageRange: "",
    gender: "",
    heightCm: "",
    weightKg: "",
    familySize: ""
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("onboarding_data") || "{}");
    if (saved) {
      setData((prev) => ({ ...prev, ...saved }));
    }
  }, []);

  const handleNext = () => {
    const current = JSON.parse(localStorage.getItem("onboarding_data") || "{}");
    localStorage.setItem("onboarding_data", JSON.stringify({ ...current, ...data }));
    setLocation("/onboarding/region");
  };

  const isValid = data.name && data.ageRange && data.gender && data.heightCm && data.weightKg && data.familySize;

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background max-w-md mx-auto p-6">
      <div className="flex-1 space-y-6 mt-8">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Step 2 of 6</p>
          <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary w-2/6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mt-4">Let's get to know you</h1>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">What should we call you?</Label>
            <Input 
              id="name" 
              value={data.name} 
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="Your name"
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label>Age Range</Label>
            <Select value={data.ageRange} onValueChange={(v) => setData({ ...data, ageRange: v })}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select age range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="18-24">18-24</SelectItem>
                <SelectItem value="25-34">25-34</SelectItem>
                <SelectItem value="35-44">35-44</SelectItem>
                <SelectItem value="45-54">45-54</SelectItem>
                <SelectItem value="55+">55+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Gender</Label>
            <div className="flex gap-2">
              {["Female", "Male", "Other"].map((g) => (
                <Button
                  key={g}
                  type="button"
                  variant={data.gender === g ? "default" : "outline"}
                  className="flex-1 h-12"
                  onClick={() => setData({ ...data, gender: g })}
                >
                  {g}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input 
                id="height" 
                type="number"
                value={data.heightCm} 
                onChange={(e) => setData({ ...data, heightCm: e.target.value })}
                placeholder="165"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input 
                id="weight" 
                type="number"
                value={data.weightKg} 
                onChange={(e) => setData({ ...data, weightKg: e.target.value })}
                placeholder="65"
                className="h-12"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Cooking for how many?</Label>
            <div className="flex gap-2">
              {["1", "2", "3-4", "5+"].map((size) => (
                <Button
                  key={size}
                  type="button"
                  variant={data.familySize === size ? "default" : "outline"}
                  className="flex-1 h-12"
                  onClick={() => setData({ ...data, familySize: size })}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 pb-4 flex gap-3">
        <Button variant="outline" className="h-14 w-1/3 rounded-full text-lg" onClick={() => setLocation("/onboarding/track")}>Back</Button>
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