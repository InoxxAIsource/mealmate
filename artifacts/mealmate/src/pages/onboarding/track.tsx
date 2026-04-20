import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const TRACKS = [
  { id: "pcos", name: "PCOS", emoji: "🌸", subtitle: "Balance hormones & cycles" },
  { id: "diabetes", name: "Diabetes", emoji: "🩸", subtitle: "Manage blood sugar" },
  { id: "thyroid", name: "Thyroid", emoji: "🦋", subtitle: "Support metabolism" },
  { id: "pregnancy", name: "Pregnancy", emoji: "🤰", subtitle: "Nourish you & baby" },
  { id: "kids", name: "Kids", emoji: "👧", subtitle: "Healthy growth" },
  { id: "general", name: "General Health", emoji: "🍽️", subtitle: "Everyday wellness" },
];

export default function OnboardingTrack() {
  const [, setLocation] = useLocation();
  const [selected, setSelected] = useState<string | null>(null);

  const handleNext = () => {
    if (selected) {
      const data = JSON.parse(localStorage.getItem("onboarding_data") || "{}");
      localStorage.setItem("onboarding_data", JSON.stringify({ ...data, track: selected }));
      setLocation("/onboarding/basics");
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background max-w-md mx-auto p-6">
      <div className="flex-1 space-y-8 mt-8">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Step 1 of 6</p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">What's your primary health focus?</h1>
          <p className="text-muted-foreground">We'll tailor your meal plan to support this.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {TRACKS.map((track) => (
            <motion.button
              whileTap={{ scale: 0.98 }}
              key={track.id}
              onClick={() => setSelected(track.id)}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 text-center transition-all min-h-[140px] ${
                selected === track.id
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border bg-card shadow-sm hover:border-primary/30"
              }`}
              data-testid={`track-card-${track.id}`}
            >
              <span className="text-4xl mb-3 block">{track.emoji}</span>
              <span className="font-semibold text-foreground">{track.name}</span>
              <span className="text-xs text-muted-foreground mt-1">{track.subtitle}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="pt-8 pb-4">
        <Button 
          size="lg" 
          className="w-full h-14 rounded-full text-lg shadow-md" 
          onClick={handleNext}
          disabled={!selected}
          data-testid="btn-next"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}