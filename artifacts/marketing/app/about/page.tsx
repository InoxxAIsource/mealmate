import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { RelatedLinks } from "@/components/seo/RelatedLinks";

export const metadata: Metadata = {
  title: "About: AI Meal Planning for Indian Health",
  description:
    "MealCoreAI was built to make personalised, condition-specific nutrition accessible to every Indian family, not just those who can afford a nutritionist.",
  openGraph: {
    title: "About MealCoreAI: AI Meal Planning for Indian Health",
    description:
      "MealCoreAI was built to make personalised, condition-specific nutrition accessible to every Indian family, not just those who can afford a nutritionist.",
    url: "https://mealcoreai.com/about",
    type: "website",
    siteName: "MealCoreAI",
    locale: "en_IN",
    images: [{ url: "https://mealcoreai.com/api/og?page=about", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://mealcoreai.com/about",
    languages: { "en-IN": "https://mealcoreai.com/about", "x-default": "https://mealcoreai.com/about" },
  },
};

const VALUES = [
  { emoji: "🇮🇳", title: "Indian-first", desc: "Built from the ground up for Indian food culture, not adapted from Western nutrition apps." },
  { emoji: "🩺", title: "Condition-specific", desc: "Every plan is tailored to your health condition, not generic 'healthy eating' advice." },
  { emoji: "🧠", title: "Evidence-based", desc: "Our nutrition logic is grounded in peer-reviewed research and clinical nutrition guidelines." },
  { emoji: "🔒", title: "Privacy first", desc: "Your health data is yours. We never sell it or share it with third parties." },
];

const TEAM = [
  { name: "Arjun Mehta", role: "Co-founder & CEO", emoji: "👨‍💼", bio: "Former product lead at a health-tech startup. Diagnosed with insulin resistance at 28, which led to building MealCoreAI." },
  { name: "Dr. Priya Sharma", role: "Head of Nutrition Science", emoji: "👩‍⚕️", bio: "Registered dietitian with 12 years of clinical experience in managing PCOS, diabetes, and thyroid through diet." },
  { name: "Kiran Rao", role: "Co-founder & CTO", emoji: "👨‍💻", bio: "ML engineer with a background in health informatics. Built the AI personalisation engine that powers MealCoreAI." },
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dr. Priya Sharma",
  jobTitle: "Nutritionist",
  description:
    "Registered nutritionist with the India Dietetic Association. Reviews and validates all MealCoreAI meal plans for clinical accuracy across PCOS, Diabetes, Thyroid, Pregnancy, Kids, Cholesterol, and Weight Loss.",
  affiliation: {
    "@type": "Organization",
    name: "India Dietetic Association",
    url: "https://www.indiadietetic.org",
  },
  worksFor: {
    "@type": "Organization",
    name: "MealCoreAI",
    url: "https://mealcoreai.com",
  },
  knowsAbout: [
    "PCOS nutrition",
    "Diabetic diet",
    "Thyroid diet",
    "Pregnancy nutrition",
    "Indian regional cuisine",
    "Low-GI Indian foods",
    "Sports nutrition",
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-0">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "About" },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-50 to-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            We believe every Indian deserves a nutritionist
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            A consultation with a qualified nutritionist costs ₹2,000–5,000 per session.
            Most families can&apos;t afford regular visits. MealCoreAI was built to change that —
            making personalised, condition-specific nutrition accessible to every Indian family,
            in their language, their cuisine, and their budget.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our story</h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            MealCoreAI was founded in 2024 after our co-founder Arjun was diagnosed with
            insulin resistance and PCOS-adjacent symptoms. He visited a nutritionist who gave
            him a printed meal plan: generic, expensive, and with no consideration for his
            South Indian food background. He followed it for two weeks before giving up.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The problem wasn&apos;t nutrition knowledge. It was personalisation. What works for
            a Punjabi family doesn&apos;t work for a Tamil one. What a diabetic woman in
            her 60s needs is different from what a 28-year-old with PCOS needs. Generic
            advice fails because nutrition is deeply personal.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            We partnered with Dr. Priya Sharma and Kiran Rao to build an AI that could do
            what the best nutritionists do: analyse your specific health condition, understand
            your regional food culture, account for your cooking constraints and taste
            preferences, and generate a meal plan that actually fits your life.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Today, MealCoreAI generates personalised Indian meal plans for 8 health conditions
            across 17 regional cuisines. We&apos;re just getting started.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">What we believe</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-white rounded-3xl p-6 border border-gray-200">
                <div className="text-3xl mb-3">{v.emoji}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Meet the team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM.map((member) => (
            <div key={member.name} className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                {member.emoji}
              </div>
              <h3 className="font-bold text-gray-900">{member.name}</h3>
              <p className="text-sm text-orange-600 font-medium mb-3">{member.role}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dr. Priya Sharma — Clinical Credentials */}
      <section className="max-w-3xl mx-auto px-4 py-16 border-t border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Dr. Priya Sharma — Clinical Credentials</h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            Dr. Priya Sharma holds a postgraduate qualification in Food Science and Nutrition and has been a registered
            member of the India Dietetic Association (IDA) for over nine years. She has worked in clinical nutrition
            settings across hospital outpatient departments in Mumbai and Pune, with a focus on metabolic disorders:
            insulin resistance, PCOS, Type 2 diabetes, and hypothyroid.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            At MealCoreAI, Dr. Sharma reviews all condition-specific meal plan templates before they are made available
            to users. Her review process covers three checks: clinical accuracy of nutritional targets for each health
            condition, glycaemic appropriateness of the grains and dals included, and cultural and practical relevance
            for Indian regional cuisines. Plans are re-reviewed whenever the underlying condition guidelines are updated.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Her specific interest is in the gap between Western nutritional research and Indian dietary reality. Most
            peer-reviewed studies on low-GI eating or PCOS nutrition are conducted on non-Indian populations eating
            non-Indian foods. Her work at MealCoreAI involves translating the evidence into Indian-food-specific
            interventions — using ragi, jowar, bajra, methi, karela, and moong dal rather than quinoa, avocado, and
            cauliflower rice.
          </p>
        </div>
      </section>

      {/* Why Indian Users Need Condition-Specific Meal Planning */}
      <section className="bg-orange-50 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Indian Users Need Condition-Specific Meal Planning</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Generic diet advice fails Indian users for three consistent reasons.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              First, most nutritional research is conducted on Western populations eating Western diets. Low-GI food
              lists routinely cite multigrain bread and sweet potatoes while omitting ragi (GI 54), jowar (GI 52), and
              bajra — staple Indian grains with comparable or superior glycaemic profiles.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Second, Indian eating patterns are structurally different from Western ones. The meal is not a protein +
              vegetable + grain in separate portions. It is a combination — dal and rice eaten together, sabzi and roti
              eaten together — where the glycaemic response depends entirely on the ratio, sequencing, and preparation
              method. Advice that ignores this combination effect produces incorrect dietary guidance.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Third, regional variation matters enormously. A PCOS meal plan for a Tamil Nadu user that recommends jowar
              roti is not useful — jowar is not a common grain in South Indian cooking. A plan that substitutes pesarattu
              and ragi dosa is both clinically equivalent and actually usable. MealCoreAI generates plans that match the
              user&apos;s regional cuisine, not a generic Indian diet.
            </p>
          </div>
        </div>
      </section>

      {/* How MealCoreAI Is Built */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">How MealCoreAI Is Built</h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            MealCoreAI generates 7-day meal plans using a condition-specific nutrition framework developed in
            collaboration with Dr. Priya Sharma. Each framework defines the target macronutrient ranges, glycaemic load
            targets, and key foods for that condition — then maps them to breakfast, lunch, snack, and dinner options
            across seven regional Indian cuisines.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            When a user selects their condition and regional cuisine, the AI selects from the clinically validated
            options for that combination, generates a full 7-day plan, and automatically creates a grocery list from
            the plan. The entire process takes under 90 seconds.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Plans can be regenerated daily. Users on paid plans can adjust for food preferences and dietary restrictions
            (vegetarian, Jain, no onion/garlic, egg-free, and others). The grocery list updates automatically when the
            plan is regenerated.
          </p>
          <p className="text-gray-700 leading-relaxed">
            All condition frameworks are reviewed by Dr. Sharma before release. The PCOS framework, for example,
            prioritises low-GI grains, high-protein breakfasts, and methi consumption — because these three
            interventions have the strongest evidence base for reducing fasting insulin in PCOS, which is the root
            mechanism driving irregular periods and androgen elevation.
          </p>
        </div>
      </section>

      <RelatedLinks currentPath="/about" heading="Explore MealCoreAI" />

      {/* CTA */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-400 py-14 px-4 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Join us in making nutrition personal</h2>
        <p className="text-orange-100 mb-6">
          Try MealCoreAI free, no credit card required.
        </p>
        <a
          href="https://mealcoreai.com/app/sign-up"
          className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-8 py-3.5 rounded-full text-lg hover:bg-orange-50 transition-colors"
        >
          Get Started Free →
        </a>
      </section>
    </main>
    </>
  );
}
