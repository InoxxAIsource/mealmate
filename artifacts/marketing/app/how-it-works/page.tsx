import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How MealCoreAI Works | AI Meal Planning for Indian Health Conditions",
  description:
    "See how MealCoreAI builds your personalised Indian meal plan in 3 simple steps. AI-powered, condition-specific, and culturally authentic.",
};

const STEPS = [
  {
    num: "01",
    emoji: "🩺",
    title: "Tell us about your health",
    desc: "Select your health condition (PCOS, diabetes, thyroid, pregnancy, kids, or cholesterol), your regional cuisine preference, dietary type, cooking time available, and any food dislikes. Takes about 2 minutes.",
  },
  {
    num: "02",
    emoji: "🤖",
    title: "AI builds your weekly plan",
    desc: "Our AI analyses your health profile and generates a complete 7-day meal plan with breakfast, lunch, snacks, and dinner — using real dish names from your regional cuisine, optimised for your condition.",
  },
  {
    num: "03",
    emoji: "🛒",
    title: "Get your grocery list",
    desc: "MealCoreAI automatically generates a consolidated grocery list for the week. You know exactly what to buy, in what quantities, without any guesswork.",
  },
  {
    num: "04",
    emoji: "🔄",
    title: "Swap meals you don't like",
    desc: "Not feeling a particular dish? Tap to swap it for another condition-appropriate alternative from your regional cuisine. Your preferences improve the AI over time.",
  },
  {
    num: "05",
    emoji: "📲",
    title: "Get daily meal reminders",
    desc: "Enable push notifications to receive personalised reminders — with the actual dish name from your plan — at breakfast, lunch, and dinner time.",
  },
  {
    num: "06",
    emoji: "♻️",
    title: "New plan every week",
    desc: "MealCoreAI generates a fresh plan every week for variety while maintaining nutritional consistency for your condition. No repetition, no boredom.",
  },
];

const FEATURES = [
  { emoji: "🇮🇳", title: "Built for Indian cuisine", desc: "8 regional cuisines from North Indian to Kerala to Mediterranean." },
  { emoji: "🩺", title: "8 health conditions", desc: "PCOS, Diabetes, Thyroid, Pregnancy, Kids, Cholesterol, Weight Loss, High Protein." },
  { emoji: "🧠", title: "AI-powered personalisation", desc: "Every plan is unique to your health profile and food preferences." },
  { emoji: "🔄", title: "Unlimited swaps", desc: "Don't like a dish? Swap it instantly for a condition-appropriate alternative." },
  { emoji: "📋", title: "Grocery list included", desc: "Auto-generated weekly grocery list with exact quantities." },
  { emoji: "🔔", title: "Meal reminders", desc: "Push notifications with your actual dish name at meal times." },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-50 to-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            How MealCoreAI Works
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            From health profile to a full week of personalised Indian meals in under 3 minutes.
            No dietitian appointment, no generic meal plans.
          </p>
          <a
            href="https://app.mealcoreai.com/sign-up"
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-4 rounded-full text-lg transition-colors shadow-lg"
          >
            Try It Free →
          </a>
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">6 Simple Steps</h2>
        <div className="space-y-8">
          {STEPS.map((step, i) => (
            <div key={step.num} className="flex gap-6 items-start">
              <div className="shrink-0 flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl font-extrabold text-orange-600">
                  {step.num}
                </div>
                {i < STEPS.length - 1 && (
                  <div className="w-0.5 h-12 bg-orange-100 mt-2" />
                )}
              </div>
              <div className="pt-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{step.emoji}</span>
                  <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed max-w-xl">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature grid */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            Everything included — free to start
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white rounded-3xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{f.emoji}</div>
                <h3 className="font-bold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video/demo placeholder */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">See it in action</h2>
        <p className="text-gray-600 mb-8">Watch how a PCOS meal plan is generated in under 2 minutes.</p>
        <div className="bg-orange-50 border-2 border-dashed border-orange-200 rounded-3xl h-64 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-3">▶️</div>
            <p className="text-gray-500 text-sm">Demo video coming soon</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-400 py-16 px-4 text-center text-white">
        <h2 className="text-3xl font-bold mb-3">Start your personalised plan today</h2>
        <p className="text-orange-100 mb-8 max-w-md mx-auto">
          Free plan includes 1 meal plan per week, grocery list, and meal reminders.
          No credit card required.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://app.mealcoreai.com/sign-up"
            className="bg-white text-orange-600 font-bold px-8 py-3.5 rounded-full text-lg hover:bg-orange-50 transition-colors"
          >
            Get Started Free
          </a>
          <Link
            href="/pricing"
            className="border-2 border-white text-white font-bold px-8 py-3.5 rounded-full text-lg hover:bg-white/10 transition-colors"
          >
            See Pricing
          </Link>
        </div>
      </section>
    </main>
  );
}
