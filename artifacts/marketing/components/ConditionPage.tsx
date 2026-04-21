"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, CheckCircle2, XCircle } from "lucide-react";

const APP_URL = "https://app.mealcoreai.com";

export interface KeyFood {
  name: string;
  benefit: string;
}

export interface FoodToLimit {
  name: string;
  reason: string;
}

export interface MealPlanDay {
  day: string;
  breakfast: string;
  lunch: string;
  snack: string;
  dinner: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface RelatedLink {
  title: string;
  slug: string;
}

export interface ConditionPageProps {
  condition: string;
  emoji: string;
  accentColour: string;
  h1: string;
  intro: string;
  keyFoods: KeyFood[];
  foodsToLimit: FoodToLimit[];
  samplePlan: MealPlanDay[];
  faqs: FAQ[];
  relatedPosts: RelatedLink[];
  relatedPlans: RelatedLink[];
}

const accentMap: Record<string, { badge: string; btn: string; bar: string; border: string }> = {
  rose: {
    badge: "bg-rose-50 text-rose-700 border-rose-200",
    btn: "bg-rose-500 hover:bg-rose-600 shadow-rose-200",
    bar: "from-rose-400 to-pink-400",
    border: "border-rose-200",
  },
  teal: {
    badge: "bg-teal-50 text-teal-700 border-teal-200",
    btn: "bg-teal-600 hover:bg-teal-700 shadow-teal-200",
    bar: "from-teal-400 to-emerald-400",
    border: "border-teal-200",
  },
  emerald: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    btn: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200",
    bar: "from-emerald-400 to-teal-400",
    border: "border-emerald-200",
  },
  orange: {
    badge: "bg-orange-50 text-orange-700 border-orange-200",
    btn: "bg-orange-500 hover:bg-orange-600 shadow-orange-200",
    bar: "from-orange-400 to-amber-400",
    border: "border-orange-200",
  },
  yellow: {
    badge: "bg-yellow-50 text-yellow-700 border-yellow-200",
    btn: "bg-yellow-500 hover:bg-yellow-600 shadow-yellow-200",
    bar: "from-yellow-400 to-orange-400",
    border: "border-yellow-200",
  },
  purple: {
    badge: "bg-purple-50 text-purple-700 border-purple-200",
    btn: "bg-purple-600 hover:bg-purple-700 shadow-purple-200",
    bar: "from-purple-400 to-indigo-400",
    border: "border-purple-200",
  },
};

function FAQItem({ q, a, accent }: { q: string; a: string; accent: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-gray-50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-semibold text-gray-900 text-sm sm:text-base">{q}</span>
        <ChevronDown
          className={`h-5 w-5 text-gray-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-6 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

export default function ConditionPage({
  condition,
  emoji,
  accentColour,
  h1,
  intro,
  keyFoods,
  foodsToLimit,
  samplePlan,
  faqs,
  relatedPosts,
  relatedPlans,
}: ConditionPageProps) {
  const ac = accentMap[accentColour] ?? accentMap.orange;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-0"
      >
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li><Link href="/" className="hover:text-orange-500">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-gray-800 font-medium">{condition} Meal Plan</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className={`track-badge ${ac.badge} mb-6 inline-flex`}>
              {emoji} {condition}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-gray-900 leading-tight mb-6">
              {h1}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">{intro}</p>
            <a
              href={`${APP_URL}/sign-up`}
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold shadow-lg transition-colors ${ac.btn}`}
            >
              Get My {condition} Plan Free <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Key Foods */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
            8 Best Indian Foods for {condition}
          </h2>
          <p className="text-gray-500 mb-10 max-w-2xl">
            These ingredients are prioritised in your MealCoreAI {condition} meal plan because of their evidence-based benefits.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {keyFoods.map(({ name, benefit }) => (
              <div
                key={name}
                className={`bg-white border ${ac.border} rounded-2xl p-5 hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-bold text-gray-900 mb-1">{name}</div>
                    <div className="text-xs text-gray-500 leading-relaxed">{benefit}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Foods to Limit */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
            Foods to Limit on a {condition} Diet
          </h2>
          <p className="text-gray-500 mb-10 max-w-2xl">
            These foods don't need to be completely avoided — but MealCoreAI significantly reduces them in your plan.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {foodsToLimit.map(({ name, reason }) => (
              <div key={name} className="bg-white border border-red-100 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-red-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-bold text-gray-900 mb-1">{name}</div>
                    <div className="text-xs text-gray-500 leading-relaxed">{reason}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Meal Plan */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
            3-Day Sample {condition} Meal Plan
          </h2>
          <p className="text-gray-500 mb-10 max-w-2xl">
            A sample of what MealCoreAI generates for the {condition} track. Your actual plan will be personalised to your region, diet, and preferences.
          </p>
          <div className="space-y-6">
            {samplePlan.map(({ day, breakfast, lunch, snack, dinner }) => (
              <div key={day} className={`border ${ac.border} rounded-2xl overflow-hidden`}>
                <div className={`px-6 py-3 bg-gradient-to-r ${ac.bar} text-white font-bold text-sm`}>
                  {day}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-100">
                  {[
                    { label: "🌅 Breakfast", dish: breakfast },
                    { label: "☀️ Lunch", dish: lunch },
                    { label: "🍿 Snack", dish: snack },
                    { label: "🌙 Dinner", dish: dinner },
                  ].map(({ label, dish }) => (
                    <div key={label} className="px-5 py-4">
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                        {label}
                      </div>
                      <div className="text-sm text-gray-700 font-medium">{dish}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-orange-50 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <div className="font-bold text-gray-900 mb-1">Get your personalised {condition} plan</div>
              <div className="text-sm text-gray-500">
                This sample plan is generic. MealCoreAI personalises every meal based on your region, cook time, allergies, and food preferences.
              </div>
            </div>
            <a
              href={`${APP_URL}/sign-up`}
              className={`shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-sm shadow-lg transition-colors ${ac.btn}`}
            >
              Generate My Plan <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
            {condition} Diet — Frequently Asked Questions
          </h2>
          <p className="text-gray-500 mb-10">Evidence-based answers to the most common questions about {condition} nutrition.</p>
          <div className="space-y-3">
            {faqs.map(({ q, a }) => (
              <FAQItem key={q} q={q} a={a} accent={accentColour} />
            ))}
          </div>
        </div>
      </section>

      {/* Related links */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {relatedPlans.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-5">Related Health Plans</h3>
                <ul className="space-y-3">
                  {relatedPlans.map(({ title, slug }) => (
                    <li key={slug}>
                      <Link
                        href={`/${slug}`}
                        className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium text-sm"
                      >
                        <ArrowRight className="h-4 w-4 shrink-0" />
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {relatedPosts.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-5">Related Articles</h3>
                <ul className="space-y-3">
                  {relatedPosts.map(({ title, slug }) => (
                    <li key={slug}>
                      <Link
                        href={`/${slug}`}
                        className="flex items-center gap-2 text-gray-600 hover:text-orange-500 font-medium text-sm"
                      >
                        <ArrowRight className="h-4 w-4 shrink-0" />
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="text-4xl mb-4">{emoji}</div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
            Ready for Your {condition} Meal Plan?
          </h2>
          <p className="text-gray-400 mb-8">
            Free to start. Personalised in 90 seconds. Real Indian food.
          </p>
          <a
            href={`${APP_URL}/sign-up`}
            className={`inline-flex items-center gap-2 px-10 py-4 rounded-full text-white font-bold text-lg transition-colors shadow-xl ${ac.btn}`}
          >
            Get My {condition} Plan Free <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
