import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChefHat, CalendarDays, ShoppingBasket, Sparkles } from "lucide-react";

const features = [
  {
    icon: ChefHat,
    title: "Aaj kya banau?",
    desc: "Get a fresh week's menu every Sunday — no more daily decision fatigue.",
  },
  {
    icon: CalendarDays,
    title: "Plan for the whole family",
    desc: "Recipes scaled for your family size, with Indian ingredients you already have.",
  },
  {
    icon: ShoppingBasket,
    title: "Grocery list, ready.",
    desc: "One tap generates your full week's shopping list. WhatsApp it to anyone.",
  },
  {
    icon: Sparkles,
    title: "Smart, not generic",
    desc: "Tailored to your region, diet, and family's health needs — not copy-paste meals.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground max-w-md mx-auto relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[-8%] right-[-12%] w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[25%] left-[-18%] w-60 h-60 rounded-full bg-orange-300/15 blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="flex items-center gap-2 px-6 pt-8 z-10">
        <img
          src={`${import.meta.env.BASE_URL}logo.svg`}
          alt="MealMate"
          className="w-8 h-8"
        />
        <span className="text-lg font-bold text-primary tracking-tight">MealMate</span>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col px-6 z-10">
        <div className="mt-10 mb-10">
          <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-5">
            <Sparkles className="w-3 h-3" />
            Free to use · No credit card
          </div>

          <h1 className="text-[2.2rem] font-extrabold leading-tight text-foreground mb-4">
            Tired of asking
            <br />
            <span className="text-primary">"Aaj kya banau?"</span>
          </h1>

          <p className="text-muted-foreground text-base leading-relaxed max-w-[320px]">
            MealMate plans your entire week's Indian meals in seconds — breakfast, lunch, snack, dinner — for your family, your taste, your kitchen.
          </p>

          <Link href="/sign-up" className="block mt-7">
            <Button
              size="lg"
              className="w-full text-base h-14 rounded-2xl shadow-lg font-semibold"
              data-testid="button-get-started"
            >
              Plan this week's meals →
            </Button>
          </Link>

          <p className="text-center text-xs text-muted-foreground mt-3">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-primary underline underline-offset-2">
              Sign in
            </Link>
          </p>
        </div>

        {/* Feature cards */}
        <div className="space-y-3 mb-12">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-3 bg-card border border-border/50 rounded-2xl px-4 py-3.5 shadow-sm"
            >
              <div className="bg-primary/10 rounded-xl p-2 shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
