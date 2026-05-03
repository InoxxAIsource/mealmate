import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { conditions, regions, mealTypes, buildSlug } from "@/lib/seo-data";

const BASE = "https://mealcoreai.com";

export const metadata: Metadata = {
  title: "Indian Meal Plans by Condition & Region | MealCoreAI",
  description:
    "Browse 265+ personalised Indian meal plans by health condition and region. PCOS, diabetes, thyroid, pregnancy, cholesterol, weight loss — South Indian, North Indian, Bengali, Punjabi, Gujarati and more.",
  openGraph: {
    title: "Indian Meal Plans by Condition & Region | MealCoreAI",
    description:
      "Browse 265+ personalised Indian meal plans by health condition and region. PCOS, diabetes, thyroid, pregnancy, cholesterol, weight loss.",
    url: `${BASE}/meal-plans`,
    type: "website",
    siteName: "MealCoreAI",
    locale: "en_IN",
    images: [{ url: `${BASE}/api/og?page=meal-plans`, width: 1200, height: 630 }],
  },
  alternates: {
    canonical: `${BASE}/meal-plans`,
    languages: { "en-IN": `${BASE}/meal-plans`, "x-default": `${BASE}/meal-plans` },
  },
  twitter: {
    card: "summary_large_image",
    title: "Indian Meal Plans by Condition & Region | MealCoreAI",
    description: "Browse 265+ personalised Indian meal plans by health condition and region.",
    images: [`${BASE}/api/og?page=meal-plans`],
  },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE },
    { "@type": "ListItem", position: 2, name: "Meal Plans", item: `${BASE}/meal-plans` },
  ],
};

const collectionLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Indian Meal Plans by Condition & Region",
  description:
    "A comprehensive collection of AI-generated Indian meal plans by health condition and regional cuisine.",
  url: `${BASE}/meal-plans`,
  publisher: {
    "@type": "Organization",
    name: "MealCoreAI",
    url: BASE,
    logo: { "@type": "ImageObject", url: `${BASE}/logo.svg` },
  },
};

const CONDITION_META: Record<string, { label: string; emoji: string; slug: string; accent: string }> = {
  pcos: { label: "PCOS", emoji: "🌸", slug: "pcos-meal-plan", accent: "rose" },
  diabetes: { label: "Diabetes", emoji: "🩺", slug: "diabetes-meal-plan", accent: "blue" },
  thyroid: { label: "Thyroid", emoji: "🦋", slug: "thyroid-diet-plan", accent: "purple" },
  pregnancy: { label: "Pregnancy", emoji: "🤱", slug: "pregnancy-meal-plan", accent: "pink" },
  kids: { label: "Kids", emoji: "👶", slug: "kids-meal-plan", accent: "amber" },
  cholesterol: { label: "Cholesterol", emoji: "❤️", slug: "cholesterol-diet-plan", accent: "red" },
  "weight-loss": { label: "Weight Loss", emoji: "⚖️", slug: "weight-loss-meal-plan", accent: "emerald" },
  highprotein: { label: "High Protein", emoji: "💪", slug: "weight-loss-meal-plan", accent: "orange" },
};

const ACCENT_CLASSES: Record<string, string> = {
  rose: "bg-rose-50 border-rose-200 text-rose-700",
  blue: "bg-blue-50 border-blue-200 text-blue-700",
  purple: "bg-purple-50 border-purple-200 text-purple-700",
  pink: "bg-pink-50 border-pink-200 text-pink-700",
  amber: "bg-amber-50 border-amber-200 text-amber-700",
  red: "bg-red-50 border-red-200 text-red-700",
  emerald: "bg-emerald-50 border-emerald-200 text-emerald-700",
  orange: "bg-orange-50 border-orange-200 text-orange-700",
};

const PRIORITY_REGIONS = ["north-indian", "south-indian", "punjabi", "gujarati", "bengali", "maharashtrian", "tamil", "kerala"];
const PRIORITY_MEAL_TYPES = ["weekly-meal-plan", "7-day-meal-plan", "breakfast-ideas", "lunch-ideas"];

export default function MealPlansHubPage() {
  const priorityConditions = conditions.filter((c) => CONDITION_META[c.id]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />

      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-0">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-orange-500">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-800 font-medium">Meal Plans</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="py-14 sm:py-20 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-semibold mb-6">
                🍱 265+ Plans Available
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-gray-900 leading-tight mb-5">
                Indian Meal Plans for Every Condition & Region
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Browse condition-specific Indian meal plans — PCOS, diabetes, thyroid, pregnancy, cholesterol, and weight loss — adapted for North Indian, South Indian, Bengali, Punjabi, Gujarati, and more regional cuisines. All plans are free to personalise further with MealCoreAI.
              </p>
              <a
                href="https://mealcoreai.com/app/sign-up"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg transition-colors"
              >
                Get My Personalised Plan Free <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Condition sections */}
        {priorityConditions.map((condition) => {
          const meta = CONDITION_META[condition.id];
          if (!meta) return null;
          const accentClass = ACCENT_CLASSES[meta.accent] ?? ACCENT_CLASSES.orange;

          const priorityLinks = PRIORITY_REGIONS.flatMap((regionId) =>
            PRIORITY_MEAL_TYPES.slice(0, 2).map((mealTypeId) => {
              const region = regions.find((r) => r.id === regionId);
              const mealType = mealTypes.find((m) => m.id === mealTypeId);
              if (!region || !mealType) return null;
              return {
                href: `/meal-plans/${buildSlug(condition.id, mealTypeId, regionId)}`,
                label: `${region.label} ${condition.label} ${mealType.label}`,
              };
            }).filter(Boolean)
          ).slice(0, 12);

          return (
            <section key={condition.id} className="py-14 border-b border-gray-100">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold mb-3 ${accentClass}`}>
                      {meta.emoji} {meta.label}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                      {meta.label} Meal Plans
                    </h2>
                    <p className="text-gray-500 mt-2 max-w-xl text-sm">
                      {condition.description}
                    </p>
                  </div>
                  <Link
                    href={`/${meta.slug}`}
                    className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 hover:text-orange-700 shrink-0"
                  >
                    Full {meta.label} guide <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {priorityLinks.map((link) => link && (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-orange-300 hover:shadow-sm text-sm font-medium text-gray-700 hover:text-orange-600 transition-all"
                    >
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-orange-400" />
                      <span className="line-clamp-2">{link.label}</span>
                    </Link>
                  ))}
                </div>

                <div className="mt-4">
                  <Link
                    href={`/${meta.slug}`}
                    className="inline-flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 font-medium"
                  >
                    View full {meta.label} guide with sample plan →
                  </Link>
                </div>
              </div>
            </section>
          );
        })}

        {/* Regional overview */}
        <section className="py-14 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
              Browse by Indian Region
            </h2>
            <p className="text-gray-500 mb-8 max-w-2xl">
              Every meal plan is adapted to your regional cuisine — same health goals, familiar ingredients.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {regions.filter((r) => PRIORITY_REGIONS.includes(r.id)).map((region) => (
                <div key={region.id} className="bg-white border border-gray-200 rounded-2xl p-5">
                  <h3 className="font-bold text-gray-900 mb-3">{region.label}</h3>
                  <ul className="space-y-1.5">
                    {priorityConditions.slice(0, 4).map((condition) => {
                      const meta = CONDITION_META[condition.id];
                      if (!meta) return null;
                      return (
                        <li key={condition.id}>
                          <Link
                            href={`/meal-plans/${buildSlug(condition.id, "weekly-meal-plan", region.id)}`}
                            className="text-xs text-orange-600 hover:text-orange-700 font-medium hover:underline"
                          >
                            {meta.emoji} {meta.label} Plan
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gray-950 text-center px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-4xl mb-4">🍱</div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
              Want a Plan Built Around You?
            </h2>
            <p className="text-gray-400 mb-8">
              These sample plans are a starting point. MealCoreAI personalises every meal to your condition, cook time, region, allergies, and taste preferences. Free to start.
            </p>
            <a
              href="https://mealcoreai.com/app/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg shadow-lg transition-colors"
            >
              Get My Free Personalised Plan <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
