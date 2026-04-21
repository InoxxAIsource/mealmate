import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  conditions,
  regions,
  mealTypes,
  buildSlug,
  parseSlug,
  getDishes,
} from "@/lib/seo-data";

const BASE = "https://mealcoreai.com";

export async function generateStaticParams() {
  const slugs: { slug: string }[] = [];
  outer: for (const c of conditions) {
    for (const m of mealTypes) {
      for (const r of regions) {
        if (slugs.length >= 250) break outer;
        slugs.push({ slug: buildSlug(c.id, m.id, r.id) });
      }
    }
  }
  return slugs;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return { title: "Not Found" };

  const { condition, mealType, region } = parsed;
  const regionLabel = region?.label || "Indian";
  const title = `${regionLabel} ${condition.label} ${mealType.label}`;

  return {
    title: `${title} | MealCoreAI`,
    description: `Get a personalised ${regionLabel} ${condition.label} ${mealType.label} tailored to your health needs. AI-generated, culturally authentic, and nutritionally optimised.`,
    openGraph: {
      title,
      images: [
        {
          url: `${BASE}/api/og?title=${encodeURIComponent(title)}&condition=${condition.id}&accent=${condition.accent}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default async function ProgrammaticPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { condition, mealType, region } = parsed;
  const regionLabel = region?.label || "Indian";
  const regionId = region?.id || "north-indian";
  const conditionLabel = condition.label;
  const mealTypeLabel = mealType.label;

  const pageTitle = `${regionLabel} ${conditionLabel} ${mealTypeLabel}`;
  const dishes = getDishes(condition.id, regionId);

  const relatedConditions = conditions.filter((c) => c.id !== condition.id).slice(0, 3);
  const relatedRegions = regions.filter((r) => r.id !== regionId).slice(0, 3);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      {
        "@type": "ListItem",
        position: 2,
        name: `${conditionLabel} Meal Plan`,
        item: `${BASE}/${condition.id}-meal-plan`,
      },
      { "@type": "ListItem", position: 3, name: pageTitle, item: `${BASE}/meal-plans/${slug}` },
    ],
  };

  const faqs = [
    {
      q: `Is a ${regionLabel} ${conditionLabel} diet effective?`,
      a: `Yes — ${regionLabel} cuisine offers many ${conditionLabel.toLowerCase()}-friendly ingredients naturally. Adapting traditional ${regionLabel.toLowerCase()} recipes to your health needs is one of the most sustainable dietary approaches.`,
    },
    {
      q: `What are the best ${regionLabel} foods for ${conditionLabel}?`,
      a: `${regionLabel} cuisine includes ${condition.keywords.slice(0, 2).join(" and ")} foods that directly support ${conditionLabel.toLowerCase()} management. Key staples include local grains, seasonal vegetables, and traditional spices with therapeutic properties.`,
    },
    {
      q: `How does MealCoreAI personalise my ${conditionLabel} meal plan?`,
      a: `MealCoreAI analyses your specific health profile, regional food preferences, cooking time, and taste preferences to generate a weekly ${conditionLabel} meal plan with real dish names, portions, and grocery lists — updated every week.`,
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const isBreakfast = mealType.id === "breakfast-ideas";
  const isLunch = mealType.id === "lunch-ideas";
  const isSnack = mealType.id === "snack-ideas";
  const isDinner = mealType.id === "dinner-ideas";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section
          className="py-16 px-4"
          style={{
            background: `linear-gradient(135deg, #${condition.accent}15 0%, #fff 60%)`,
          }}
        >
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
              <Link href="/" className="hover:text-orange-600">Home</Link>
              <span>/</span>
              <Link
                href={`/${condition.id}-meal-plan`}
                className="hover:text-orange-600"
              >
                {conditionLabel} Meal Plan
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">{pageTitle}</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{condition.emoji}</span>
              <div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {condition.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              {pageTitle}
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
              Managing {conditionLabel.toLowerCase()} through food becomes effortless when you
              combine the healing power of {regionLabel.toLowerCase()} cuisine with
              evidence-based nutrition. This {mealTypeLabel.toLowerCase()} is designed
              specifically for people with {conditionLabel.toLowerCase()}, featuring authentic{" "}
              {regionLabel.toLowerCase()} dishes adapted to be {condition.keywords[0]} and{" "}
              {condition.keywords[1]}. Every meal preserves the rich flavours and cultural
              traditions of {regionLabel.toLowerCase()} cooking while addressing your specific
              health needs. Whether you&apos;re newly diagnosed or have been managing{" "}
              {conditionLabel.toLowerCase()} for years, these dishes will become staples you
              look forward to — not medical compromises.
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12 space-y-16">
          {/* Why this region works */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Why {regionLabel} Food Works for {conditionLabel}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {regionLabel} cuisine has evolved over centuries to use spices, fermentation
              techniques, and cooking methods that happen to align closely with what modern
              nutritional science recommends for {conditionLabel.toLowerCase()} management. The
              traditional {regionLabel.toLowerCase()} pantry is naturally rich in{" "}
              {condition.keywords.join(", ")} foods. Local staples like fermented preparations,
              seasonal vegetables, and traditional grains provide the fibre, micronutrients,
              and phytochemicals that directly support {conditionLabel.toLowerCase()} management
              — without requiring expensive supplements or unfamiliar ingredients.
            </p>
          </section>

          {/* Sample 7-day plan */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Sample 7-Day {pageTitle}
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-4 font-semibold text-gray-700">Day</th>
                    {isBreakfast || isLunch || isDinner || isSnack ? (
                      <th className="text-left p-4 font-semibold text-gray-700">
                        {mealTypeLabel}
                      </th>
                    ) : (
                      <>
                        <th className="text-left p-4 font-semibold text-gray-700">Breakfast</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Lunch</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Dinner</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {DAYS.map((day, i) => {
                    const row = dishes[i] || dishes[0];
                    return (
                      <tr key={day} className="border-t border-gray-100 hover:bg-orange-50/40 transition-colors">
                        <td className="p-4 font-semibold text-gray-900 whitespace-nowrap">{day}</td>
                        {isBreakfast || isLunch || isDinner || isSnack ? (
                          <td className="p-4 text-gray-700">{row[0]}</td>
                        ) : (
                          <>
                            <td className="p-4 text-gray-700">{row[0]}</td>
                            <td className="p-4 text-gray-700">{row[1]}</td>
                            <td className="p-4 text-gray-700">{row[2]}</td>
                          </>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              * MealCoreAI personalises this plan further based on your specific health profile and preferences.
            </p>
          </section>

          {/* Key ingredients */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Key Ingredients for {conditionLabel} from {regionLabel} Cuisine
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {condition.keywords.map((kw) => (
                <div
                  key={kw}
                  className="bg-orange-50 rounded-2xl p-4 text-center"
                >
                  <div className="text-2xl mb-2">{condition.emoji}</div>
                  <div className="text-sm font-semibold text-gray-800 capitalize">
                    {kw.replace(/-/g, " ")}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {regionLabel} staples
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-700 mt-4 leading-relaxed">
              The {regionLabel.toLowerCase()} kitchen already contains most of what you need for
              {" "}{conditionLabel.toLowerCase()} management. Local spices, fermented foods, and
              seasonal produce align naturally with a {condition.keywords[0]} and{" "}
              {condition.keywords[1]} approach to nutrition.
            </p>
          </section>

          {/* Cooking tips */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {regionLabel} Cooking Tips for {conditionLabel}
            </h2>
            <ul className="space-y-3">
              {[
                `Use traditional ${regionLabel.toLowerCase()} fermentation methods — fermented foods lower the glycaemic impact of meals and improve gut health.`,
                `Prefer steaming and pressure cooking over frying — ${regionLabel.toLowerCase()} cuisine has many naturally steamed preparations that are ideal for ${conditionLabel.toLowerCase()}.`,
                `Use whole grain versions of ${regionLabel.toLowerCase()} staples — whole millets and grains instead of refined versions significantly improve blood sugar response.`,
                `Leverage traditional ${regionLabel.toLowerCase()} spices — turmeric, fenugreek, and cinnamon have clinically demonstrated benefits for ${conditionLabel.toLowerCase()} management.`,
                `Control oil quantity — ${regionLabel.toLowerCase()} dishes can be made with 1-2 teaspoons of oil without compromising flavour when spices are used well.`,
              ].map((tip, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-700 font-bold text-xs shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-gray-700 text-sm leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* FAQs */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="border border-gray-200 rounded-2xl overflow-hidden group"
                >
                  <summary className="px-5 py-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 flex items-center justify-between list-none">
                    <span>{faq.q}</span>
                    <span className="text-gray-400 group-open:rotate-180 transition-transform text-lg">▾</span>
                  </summary>
                  <div className="px-5 pb-4 text-gray-700 text-sm leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-3xl p-8 text-white text-center">
            <div className="text-4xl mb-3">{condition.emoji}</div>
            <h2 className="text-2xl font-bold mb-2">
              Get Your Personalised {conditionLabel} Plan
            </h2>
            <p className="text-orange-100 mb-6 max-w-md mx-auto">
              MealCoreAI builds a custom {conditionLabel} meal plan based on your specific
              health profile, {regionLabel.toLowerCase()} food preferences, and taste — updated
              every week.
            </p>
            <a
              href="https://app.mealcoreai.com/sign-up"
              className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-8 py-3.5 rounded-full text-lg hover:bg-orange-50 transition-colors shadow-lg"
            >
              Start Free — No Credit Card
            </a>
          </section>

          {/* Related pages */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Meal Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {relatedRegions.map((r) => {
                const relSlug = buildSlug(condition.id, mealType.id, r.id);
                return (
                  <Link
                    key={r.id}
                    href={`/meal-plans/${relSlug}`}
                    className="flex items-center gap-3 p-4 border border-gray-200 rounded-2xl hover:border-orange-300 hover:bg-orange-50 transition-colors group"
                  >
                    <span className="text-2xl">{condition.emoji}</span>
                    <div>
                      <div className="font-semibold text-sm text-gray-900 group-hover:text-orange-700">
                        {r.label} {conditionLabel} {mealTypeLabel}
                      </div>
                      <div className="text-xs text-gray-500">
                        {r.label} recipes for {conditionLabel.toLowerCase()}
                      </div>
                    </div>
                  </Link>
                );
              })}
              {relatedConditions.map((c) => {
                const relSlug = buildSlug(c.id, mealType.id, regionId);
                return (
                  <Link
                    key={c.id}
                    href={`/meal-plans/${relSlug}`}
                    className="flex items-center gap-3 p-4 border border-gray-200 rounded-2xl hover:border-orange-300 hover:bg-orange-50 transition-colors group"
                  >
                    <span className="text-2xl">{c.emoji}</span>
                    <div>
                      <div className="font-semibold text-sm text-gray-900 group-hover:text-orange-700">
                        {regionLabel} {c.label} {mealTypeLabel}
                      </div>
                      <div className="text-xs text-gray-500">
                        {regionLabel.toLowerCase()} recipes for {c.label.toLowerCase()}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
