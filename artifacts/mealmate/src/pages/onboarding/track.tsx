import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const TRACKS = [
  {
    id: "general",
    name: "Just our family",
    emoji: "🏠",
    subtitle: "Everyday balanced meals for the whole family",
  },
  {
    id: "fitness",
    name: "Gym & Fitness",
    emoji: "💪",
    subtitle: "Lean, keto, gaining & workout nutrition",
    highlight: true,
  },
  {
    id: "kids",
    name: "Cooking for kids",
    emoji: "👧",
    subtitle: "Kid-friendly, nutritious & fun meals",
  },
  {
    id: "pregnancy",
    name: "Pregnancy",
    emoji: "🤰",
    subtitle: "Nourishing meals for mum & baby",
  },
  {
    id: "pcos",
    name: "PCOS",
    emoji: "🌸",
    subtitle: "Hormone-balancing, low-GI Indian food",
  },
  {
    id: "diabetes",
    name: "Diabetes",
    emoji: "🩺",
    subtitle: "Low-sugar, blood-sugar-friendly meals",
  },
  {
    id: "thyroid",
    name: "Thyroid",
    emoji: "🦋",
    subtitle: "Thyroid-supportive, metabolism-friendly",
  },
];

export default function OnboardingTrack() {
  const [, setLocation] = useLocation();
  const [selected, setSelected] = useState<string | null>(null);

  const handleNext = () => {
    if (selected) {
      const data = JSON.parse(localStorage.getItem("onboarding_data") || "{}");
      localStorage.setItem(
        "onboarding_data",
        JSON.stringify({ ...data, track: selected })
      );
      setLocation("/onboarding/basics");
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background max-w-md mx-auto p-6">
      {/* Progress */}
      <div className="flex gap-1.5 pt-6 pb-2">
        {[1, 2, 3, 4, 5, 6].map((s) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full ${s === 1 ? "bg-primary" : "bg-muted"}`}
          />
        ))}
      </div>

      <div className="flex-1 space-y-7 mt-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Step 1 of 6
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground leading-snug">
            Who are we cooking for?
          </h1>
          <p className="text-muted-foreground text-sm">
            We'll personalise your weekly meal plan around this. You can always change it later.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {TRACKS.map((track) => (
            <motion.button
              whileTap={{ scale: 0.97 }}
              key={track.id}
              onClick={() => setSelected(track.id)}
              className={`flex flex-col items-start p-4 rounded-2xl border-2 text-left transition-all min-h-[120px] ${
                selected === track.id
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border bg-card shadow-sm hover:border-primary/30"
              }`}
              data-testid={`track-card-${track.id}`}
            >
              <span className="text-3xl mb-2 block">{track.emoji}</span>
              <span className="font-semibold text-sm text-foreground block leading-tight">
                {track.name}
              </span>
              <span className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {track.subtitle}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="pt-6 pb-4">
        <Button
          size="lg"
          className="w-full h-14 rounded-2xl text-base shadow-md font-semibold"
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
