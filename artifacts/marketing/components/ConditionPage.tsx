"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { RelatedLinks } from "@/components/seo/RelatedLinks";

const APP_URL = "https://mealcoreai.com/app";

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

export interface WhyIngredient {
  name: string;
  claim: string;
  citation: string;
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
  currentPath?: string;
  whyIngredients?: WhyIngredient[];
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
  currentPath,
  whyIngredients,
}: ConditionPageProps) {
  const ac = accentMap[accentColour] ?? accentMap.orange;
  const conditionSlug = condition.toLowerCase().replace(/\s+/g, "-");

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
            <h1 className="text-3xl sm:text-5xl font-black text-gray-900 leading-tight mb-5">
              {h1}
            </h1>

            {/* Author / Reviewer box — rendered in HTML for Google E-E-A-T */}
            <div className="flex items-center gap-3 mb-7 p-4 bg-white border border-gray-200 rounded-2xl shadow-sm max-w-sm">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-lg shrink-0" aria-hidden="true">
                👩‍⚕️
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Dr. Priya Sharma</p>
                <p className="text-xs text-gray-500">Nutritionist &amp; Dietitian, MealCoreAI</p>
                <p className="text-xs text-green-600 font-medium">✓ Reviewed for medical accuracy · April 2026</p>
              </div>
            </div>

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

      {/* NEW SECTION A: 7-Day Meal Plan */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
            7-Day {condition} Meal Plan for Indians
          </h2>
          <p className="text-gray-500 mb-10 max-w-2xl">
            A practical week of real Indian meals designed for {condition.toLowerCase()} management. Every day covers breakfast, lunch, dinner, and a snack.
          </p>

          {/* Mobile: card layout */}
          <div className="space-y-5 lg:hidden">
            {samplePlan.map(({ day, breakfast, lunch, snack, dinner }) => (
              <div key={day} className={`border ${ac.border} rounded-2xl overflow-hidden`}>
                <div className={`px-5 py-3 bg-gradient-to-r ${ac.bar} text-white font-bold text-sm`}>
                  {day}
                </div>
                <div className="grid grid-cols-2 divide-x divide-y divide-gray-100">
                  {[
                    { label: "🌅 Breakfast", dish: breakfast },
                    { label: "☀️ Lunch", dish: lunch },
                    { label: "🍿 Snack", dish: snack },
                    { label: "🌙 Dinner", dish: dinner },
                  ].map(({ label, dish }) => (
                    <div key={label} className="px-4 py-3">
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{label}</div>
                      <div className="text-sm text-gray-700">{dish}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: table layout */}
          <div className="hidden lg:block overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className={`bg-gradient-to-r ${ac.bar} text-white`}>
                  {["Day", "🌅 Breakfast", "☀️ Lunch", "🍿 Snack", "🌙 Dinner"].map((h) => (
                    <th key={h} className="px-5 py-4 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {samplePlan.map(({ day, breakfast, lunch, snack, dinner }, i) => (
                  <tr key={day} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-5 py-4 font-bold text-gray-800 whitespace-nowrap">{day}</td>
                    <td className="px-5 py-4 text-gray-700 leading-snug">{breakfast}</td>
                    <td className="px-5 py-4 text-gray-700 leading-snug">{lunch}</td>
                    <td className="px-5 py-4 text-gray-700 leading-snug">{snack}</td>
                    <td className="px-5 py-4 text-gray-700 leading-snug">{dinner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-5 text-sm text-gray-500 italic">
            This is a sample plan. MealCoreAI generates a personalised version based on your region, preferences, and health goals.
          </p>

          <div className="mt-6 p-6 bg-orange-50 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
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
              Get My Personalised {condition} Plan <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* NEW SECTION B: Why Indian Food Is Ideal */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
            Why Indian Food Is Ideal for {condition}
          </h2>
          <p className="text-gray-600 mb-10 max-w-2xl">
            Your kitchen is already stocked with some of the most clinically researched ingredients for {condition.toLowerCase()} management. Here's what the science says about three of them.
          </p>

          {whyIngredients && whyIngredients.length > 0 ? (
            <div className="space-y-10">
              {whyIngredients.map(({ name, claim, citation }) => (
                <div key={name} className="max-w-3xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{name}</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">{claim}</p>
                  <p className="text-sm text-gray-400 italic">{citation}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-10">
              {keyFoods.slice(0, 3).map(({ name, benefit }) => (
                <div key={name} className="max-w-3xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{name}</h3>
                  <p className="text-gray-700 leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* NEW SECTION C: Regional Variations */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
            Regional {condition} Meal Plan Variations
          </h2>
          <p className="text-gray-500 mb-10 max-w-2xl">
            Managing {condition.toLowerCase()} through food looks different depending on where in India you cook. Here's how it adapts across three major food traditions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">🌴 South Indian</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                South Indian cooking is built around rice, lentils, and fermented foods — all of which can be adapted for {condition.toLowerCase()} management. Swap white rice for ragi mudde or foxtail millet pongal, keep your sambar and rasam (they&apos;re excellent), and lean on pesarattu and dosas for high-protein breakfasts.
              </p>
              <a
                href={`/meal-plans/${conditionSlug}-weekly-meal-plan-south-indian`}
                className="text-orange-500 hover:text-orange-600 text-sm font-semibold inline-flex items-center gap-1"
              >
                See South Indian {condition} plan <ArrowRight className="h-3 w-3" />
              </a>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">🌾 North Indian</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                The roti-dal-sabzi structure of North Indian cooking is one of the most naturally adaptable frameworks for {condition.toLowerCase()}. Switch wheat atta to bajra or jowar flour, choose mustard oil or olive oil over vanaspati, and keep portions of dal generous — it&apos;s your best protein and fibre source.
              </p>
              <a
                href={`/meal-plans/${conditionSlug}-weekly-meal-plan-north-indian`}
                className="text-orange-500 hover:text-orange-600 text-sm font-semibold inline-flex items-center gap-1"
              >
                See North Indian {condition} plan <ArrowRight className="h-3 w-3" />
              </a>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">🎪 Gujarati</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Gujarati food traditions — dhokla, khichdi, thepla, handvo — are naturally portion-controlled and often dal-forward. For {condition.toLowerCase()}, the traditional Gujarati thali works well with small adjustments: less jaggery in sabzis, whole grain thepla instead of maida rotla, and moong dal khichdi as a staple dinner.
              </p>
              <a
                href={`/meal-plans/${conditionSlug}-weekly-meal-plan-gujarati`}
                className="text-orange-500 hover:text-orange-600 text-sm font-semibold inline-flex items-center gap-1"
              >
                See Gujarati {condition} plan <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION D: When to See a Doctor */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex gap-4">
            <div className="text-2xl shrink-0">⚕️</div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">When to See a Doctor</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Diet is one of the most powerful tools for managing {condition.toLowerCase()}, but it works best alongside proper medical care. If you&apos;re newly diagnosed, experiencing severe symptoms, considering stopping medication, or your symptoms are worsening despite dietary changes — please consult your doctor or a specialist. MealCoreAI&apos;s meal plans are designed to complement medical treatment, not replace it. The nutrition guidance on this page is for educational purposes and does not constitute medical advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
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

      {/* Related links — link graph (rich descriptive anchors) */}
      {currentPath ? (
        <RelatedLinks currentPath={currentPath} heading={`More ${condition} Resources`} />
      ) : (
        <section className="py-16 bg-gray-50">
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
      )}

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
