import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground max-w-md mx-auto relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-[20%] left-[-20%] w-[250px] h-[250px] rounded-full bg-orange-400/10 blur-3xl" />
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center z-10 space-y-8 mt-12">
        <div className="space-y-4">
          <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="MealMate Logo" className="w-24 h-24 mx-auto drop-shadow-md" />
          <h1 className="text-4xl font-bold tracking-tight text-primary">MealMate</h1>
          <p className="text-xl font-medium text-foreground/80 max-w-[280px] mx-auto leading-snug">
            Your personalised Indian meal plan
          </p>
        </div>

        <p className="text-muted-foreground text-sm max-w-[300px] mx-auto">
          Nutritionally balanced, culturally grounded recipes for your health journey.
        </p>

        <div className="grid grid-cols-2 gap-3 w-full max-w-[320px] pt-4">
          {["PCOS", "Diabetes", "Thyroid", "Pregnancy", "Kids", "General"].map((track) => (
            <div key={track} className="bg-card text-card-foreground shadow-sm rounded-xl py-3 px-4 border border-border/50 text-sm font-medium flex items-center justify-center">
              {track}
            </div>
          ))}
        </div>
      </main>

      <div className="p-6 z-10 mb-8 w-full max-w-md mx-auto">
        <Link href="/sign-in" className="w-full inline-block">
          <Button size="lg" className="w-full text-lg h-14 rounded-full shadow-lg" data-testid="link-get-started">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
}