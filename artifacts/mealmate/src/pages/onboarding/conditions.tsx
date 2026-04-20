import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function OnboardingConditions() {
  const [, setLocation] = useLocation();
  const [track, setTrack] = useState("");
  const [conditionData, setConditionData] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("onboarding_data") || "{}");
    setTrack(saved.track || "general");
    if (saved.conditionData) {
      setConditionData(saved.conditionData);
    }
  }, []);

  const handleNext = () => {
    const current = JSON.parse(localStorage.getItem("onboarding_data") || "{}");
    localStorage.setItem("onboarding_data", JSON.stringify({ ...current, conditionData }));
    setLocation("/onboarding/favourites");
  };

  const renderQuestions = () => {
    switch (track) {
      case "pcos":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Main PCOS concerns (e.g. weight, acne, irregular cycles)</Label>
              <Textarea 
                value={conditionData.concerns || ""} 
                onChange={(e) => setConditionData({ ...conditionData, concerns: e.target.value })}
                placeholder="What are you looking to manage?"
                className="min-h-[100px]"
              />
            </div>
          </div>
        );
      case "diabetes":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Type of Diabetes</Label>
              <div className="flex gap-2">
                {["Type 1", "Type 2", "Pre-diabetes"].map(t => (
                  <Button 
                    key={t}
                    variant={conditionData.type === t ? "default" : "outline"}
                    onClick={() => setConditionData({ ...conditionData, type: t })}
                    className="flex-1"
                  >
                    {t}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );
      // Add other cases as needed or just show a general notes field
      default:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Any specific health goals or notes?</Label>
              <Textarea 
                value={conditionData.notes || ""} 
                onChange={(e) => setConditionData({ ...conditionData, notes: e.target.value })}
                placeholder="Share any other health details we should know about..."
                className="min-h-[100px]"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background max-w-md mx-auto p-6">
      <div className="flex-1 space-y-8 mt-8">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Step 4 of 6</p>
          <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary w-4/6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mt-4">Health Details</h1>
          <p className="text-muted-foreground">Help us customize your plan further.</p>
        </div>

        {renderQuestions()}
      </div>

      <div className="pt-8 pb-4 flex gap-3">
        <Button variant="outline" className="h-14 w-1/3 rounded-full text-lg" onClick={() => setLocation("/onboarding/region")}>Back</Button>
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