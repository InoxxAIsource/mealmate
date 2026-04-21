import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { RelatedLinks } from "@/components/seo/RelatedLinks";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | MealCoreAI",
  description:
    "Answers to all your questions about MealCoreAI — how it works, PCOS, diabetes, thyroid, pregnancy, kids nutrition, pricing, and privacy.",
};

const FAQS = [
  {
    category: "General",
    emoji: "🍽️",
    items: [
      {
        q: "What is MealCoreAI?",
        a: "MealCoreAI is an AI-powered personalised meal planning app built specifically for Indian families managing health conditions. It generates a custom weekly meal plan with real Indian dish names, a grocery list, and daily meal reminders — tailored to your condition, regional cuisine, and food preferences.",
      },
      {
        q: "Which health conditions does MealCoreAI support?",
        a: "MealCoreAI currently supports PCOS, Diabetes (Type 2 and gestational), Thyroid (hypothyroidism and hyperthyroidism), Pregnancy, Kids Nutrition, Low Cholesterol, Weight Loss, and High Protein goals.",
      },
      {
        q: "Which regional cuisines are available?",
        a: "MealCoreAI supports North Indian, South Indian, East Indian, West Indian, Bengali, Punjabi, Gujarati, Tamil, Kerala, Maharashtrian, Andhra, Rajasthani, Mediterranean, Middle Eastern, Nigerian, Filipino, and Mexican cuisines.",
      },
      {
        q: "Is MealCoreAI a replacement for my doctor or nutritionist?",
        a: "No — MealCoreAI is a tool to help you implement your dietary goals. It is not a medical device and should not replace professional medical advice. Always consult your doctor for medication and treatment decisions.",
      },
      {
        q: "How is MealCoreAI different from generic meal planning apps?",
        a: "Most meal planning apps provide generic 'healthy eating' plans. MealCoreAI generates condition-specific plans — the PCOS plan is fundamentally different from the diabetes plan in terms of glycaemic index targets, anti-inflammatory foods, and hormonal considerations. Every plan uses real dishes from your regional cuisine, not Westernised 'Indian food'.",
      },
    ],
  },
  {
    category: "PCOS",
    emoji: "🌸",
    items: [
      {
        q: "How does the PCOS meal plan help manage symptoms?",
        a: "The PCOS meal plan is designed around three principles: low glycaemic index foods to reduce insulin spikes (which drive androgen production), anti-inflammatory ingredients to reduce chronic inflammation, and hormone-balancing nutrients like magnesium, omega-3, and zinc. The plan specifically uses Indian millets, legumes, and spices that have clinical evidence for PCOS management.",
      },
      {
        q: "Can diet alone help manage PCOS without medication?",
        a: "For many women with PCOS, particularly those with insulin-resistant PCOS, dietary changes alone can restore ovulation, regulate periods, and reduce androgen levels. Research shows 5–10% weight loss through diet improves ovulatory function in 55–60% of overweight PCOS patients. That said, some women require medication in addition to dietary changes — speak with your gynaecologist.",
      },
      {
        q: "Are dairy products included in the PCOS plan?",
        a: "The PCOS plan includes moderate amounts of dairy (curd, paneer, low-fat milk) as they provide calcium and protein. However, if you have suspected dairy sensitivity or your nutritionist has advised avoiding dairy, you can select the dairy-free preference in your profile.",
      },
      {
        q: "How quickly can I expect to see changes in my PCOS symptoms?",
        a: "Most women report reduced bloating and more stable energy within 2–3 weeks of following a low-GI, anti-inflammatory diet. Period regularity improvements typically take 2–3 months as hormonal changes occur over menstrual cycles. Consistency is key — the plan works best when followed for at least 90 days.",
      },
      {
        q: "Does the PCOS plan account for inositol and other supplements?",
        a: "The meal plan maximises dietary sources of myo-inositol (buckwheat, citrus fruits, legumes) and other PCOS-supportive nutrients. For specific supplement recommendations, please consult your healthcare provider.",
      },
    ],
  },
  {
    category: "Diabetes",
    emoji: "🩺",
    items: [
      {
        q: "Is the MealCoreAI diabetes plan suitable for Type 1 diabetes?",
        a: "MealCoreAI is primarily designed for Type 2 diabetes and pre-diabetes management. Type 1 diabetes involves complex insulin dosing that requires individual medical supervision. While the low-GI Indian food principles are beneficial for Type 1 as well, we recommend Type 1 diabetics use this as a reference alongside their endocrinologist's guidance.",
      },
      {
        q: "How does MealCoreAI ensure meals don't spike blood sugar?",
        a: "Every meal in the diabetes plan uses low-to-medium GI foods as the base carbohydrate, always combines carbohydrates with protein and fibre to slow glucose absorption, and avoids refined flour (maida) and high-sugar preparations. The plan also structures meals with appropriate portions to limit glycaemic load per meal.",
      },
      {
        q: "Can I use MealCoreAI if I have gestational diabetes?",
        a: "Yes — MealCoreAI has a specific gestational diabetes track that accounts for pregnancy nutrition needs alongside blood sugar management. The plan distributes carbohydrates across 3 meals and 2–3 snacks to prevent spikes while ensuring adequate folate, iron, and calcium for fetal development.",
      },
      {
        q: "Will the diabetes plan work if I'm on metformin?",
        a: "Yes. The low-GI, high-fibre Indian diet recommended by MealCoreAI complements metformin and other diabetes medications by reducing post-meal glucose peaks. It may actually reduce the required medication dosage over time — monitor your blood sugar closely and discuss any changes with your doctor.",
      },
      {
        q: "Are there breakfast options that don't spike blood sugar?",
        a: "Yes — the diabetes breakfast rotation includes ragi dosa, pesarattu (green moong crepe), besan cheela, oats upma, foxtail millet pongal, and other low-GI options that produce significantly lower glucose responses than traditional white rice or wheat preparations.",
      },
    ],
  },
  {
    category: "Thyroid & Pregnancy",
    emoji: "🦋",
    items: [
      {
        q: "Should I avoid goitrogenic foods completely with hypothyroidism?",
        a: "No — cooking deactivates most goitrogenic compounds by 30–90%. You can eat broccoli, cauliflower, and cabbage freely as long as they're cooked. Avoid consuming large quantities of raw goitrogenic foods daily (like raw kale juices). The MealCoreAI thyroid plan includes these vegetables in cooked form.",
      },
      {
        q: "How does MealCoreAI help with thyroid-related weight gain?",
        a: "The thyroid plan addresses the root cause — it maximises selenium (for T4 to T3 conversion), provides adequate iodine through iodised salt and seafood, and structures meals with protein at every meal to boost the thermic effect of food and maintain metabolic rate despite hypothyroidism.",
      },
      {
        q: "Is the pregnancy plan safe for all trimesters?",
        a: "Yes — MealCoreAI generates trimester-specific pregnancy plans. The first trimester emphasises folate-rich foods and nausea-friendly preparations. The second trimester focuses on iron and calcium. The third trimester emphasises DHA, protein, and preparing nutritionally for labour and breastfeeding.",
      },
      {
        q: "Does the pregnancy plan avoid unsafe foods automatically?",
        a: "Yes — the pregnancy plan automatically excludes high-mercury fish, unpasteurised dairy, raw sprouts, excess vitamin A sources, and other pregnancy-unsafe foods. It also flags potential food safety considerations for each trimester.",
      },
      {
        q: "Can I use the pregnancy plan if I have gestational diabetes?",
        a: "Yes — select both 'Pregnancy' and 'Gestational Diabetes' in your health profile. MealCoreAI will generate a plan that addresses both conditions simultaneously — blood sugar management within the nutritional requirements of pregnancy.",
      },
    ],
  },
  {
    category: "Kids & Cholesterol",
    emoji: "👶",
    items: [
      {
        q: "What age range is the kids meal plan designed for?",
        a: "The kids plan is designed for children aged 4–14. Nutritional requirements differ significantly between toddlers (1–3), school-age children (4–8), and adolescents (9–14). Select your child's age when setting up their profile and MealCoreAI will calibrate the portion sizes and nutrient targets accordingly.",
      },
      {
        q: "Does the kids plan address fussy eating?",
        a: "Yes — the kids plan prioritises foods that are nutritionally dense but accepted by most children, uses familiar formats, and suggests hidden-nutrition approaches (like spinach puree in paratha dough). It also provides alternative options within the same nutritional category for foods a child refuses.",
      },
      {
        q: "What foods does MealCoreAI recommend for reducing LDL cholesterol?",
        a: "The cholesterol plan centres around foods with the strongest clinical evidence: oats (beta-glucan), barley, flaxseeds, almonds, walnuts, garlic, legumes (rajma, chana), soybean, and plant sterols from whole grains. These foods can reduce LDL by 20–30% when eaten consistently.",
      },
      {
        q: "Can I follow the cholesterol plan if I'm already on statins?",
        a: "Yes — a heart-healthy diet complements statin therapy and may allow dose reduction over time. Specifically, a diet high in soluble fibre (from oats and legumes) has additive LDL-lowering effects beyond statins. Discuss any medication changes with your cardiologist.",
      },
    ],
  },
  {
    category: "Pricing & Privacy",
    emoji: "💳",
    items: [
      {
        q: "What does the free plan include?",
        a: "The free plan includes 1 personalised meal plan per week, grocery list generation, 3 meal swaps per day, push notification reminders, and access to all 8 health condition tracks. No credit card required.",
      },
      {
        q: "What does MealCoreAI Pro include?",
        a: "Pro (₹499/month or ₹2,999/year) includes unlimited meal plans, unlimited swaps, all 17 regional cuisines, detailed nutrition tracking, family profiles for up to 4 members, AI chat for personalised advice, no ads, and priority support.",
      },
      {
        q: "Is my health data safe with MealCoreAI?",
        a: "Your health data is encrypted at rest and in transit. We never sell your data to third parties. Health information is used only to generate your personalised meal plans. You can delete your account and all associated data at any time from your account settings.",
      },
      {
        q: "How do I cancel my subscription?",
        a: "You can cancel your Pro subscription at any time from your account settings. If you cancel, you keep Pro access until the end of your current billing period. There are no cancellation fees.",
      },
      {
        q: "Do you store my payment information?",
        a: "No — payments are processed through Razorpay (PCI-DSS Level 1 certified). MealCoreAI never stores your credit or debit card details on our servers.",
      },
    ],
  },
];

export default function FAQPage() {
  const allFaqs = FAQS.flatMap((cat) =>
    cat.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    }))
  );

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-0">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "FAQ" },
            ]}
          />
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-br from-orange-50 to-white py-20 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              Everything you need to know about MealCoreAI — from how it works to your privacy.
            </p>
          </div>
        </section>

        {/* FAQ categories */}
        <section className="max-w-3xl mx-auto px-4 py-12 space-y-12">
          {FAQS.map((category) => (
            <div key={category.category}>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-6">
                <span>{category.emoji}</span> {category.category}
              </h2>
              <div className="space-y-3">
                {category.items.map((item, i) => (
                  <details
                    key={i}
                    className="border border-gray-200 rounded-2xl overflow-hidden group"
                  >
                    <summary className="px-5 py-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 flex items-center justify-between list-none">
                      <span>{item.q}</span>
                      <span className="text-gray-400 group-open:rotate-180 transition-transform text-lg shrink-0 ml-3">▾</span>
                    </summary>
                    <div className="px-5 pb-5 text-gray-700 text-sm leading-relaxed border-t border-gray-100 pt-4">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </section>

        <RelatedLinks currentPath="/faq" heading="Explore MealCoreAI" />

        {/* Still have questions */}
        <section className="bg-orange-50 border-t border-orange-100 py-12 px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            Email us at{" "}
            <a href="mailto:hello@mealcoreai.com" className="text-orange-600 font-semibold">
              hello@mealcoreai.com
            </a>{" "}
            and we&apos;ll respond within 24 hours.
          </p>
          <a
            href="https://mealcoreai.com/app/sign-up"
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-3.5 rounded-full text-lg transition-colors"
          >
            Try MealCoreAI Free
          </a>
        </section>
      </main>
    </>
  );
}
