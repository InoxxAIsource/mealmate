import type { Metadata } from "next";
import { CheckCircle2, Lock, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing — Free, Starter, Core & Premium Plans | MealCoreAI",
  description:
    "MealCoreAI is free to start. Starter at ₹199/mo, Core at ₹499/mo with unlimited AI chat and swaps, Premium at ₹999/mo for the whole family. 7-day free trial on paid plans.",
};

const priceSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "MealCoreAI",
  description: "Personalised Indian meal plans for PCOS, Diabetes, Thyroid, and weight loss",
  offers: [
    { "@type": "Offer", name: "Free", price: "0", priceCurrency: "INR" },
    { "@type": "Offer", name: "Starter", price: "199", priceCurrency: "INR" },
    { "@type": "Offer", name: "Core", price: "499", priceCurrency: "INR" },
    { "@type": "Offer", name: "Premium", price: "999", priceCurrency: "INR" },
  ],
};

const TIERS = [
  {
    name: "Free",
    price: "₹0",
    period: "",
    tagline: "Forever free — no credit card needed",
    upgradeReason: null,
    popular: false,
    dark: false,
    ctaText: "Get Started Free",
    ctaHref: "https://mealcoreai.com/app/sign-up",
    features: [
      "7-day personalised meal plan (regenerate weekly)",
      "1 health condition track",
      "Grocery list generation",
      "3 meal swaps per day",
      "Push reminders with your dish name",
      "Basic nutrition info (calories, protein)",
      "AI diet chat — 5 messages/day",
    ],
    locked: [
      "Regional cuisine selection",
      "Multiple health tracks",
      "Unlimited swaps",
      "Full nutrition tracking",
      "Family profiles",
    ],
  },
  {
    name: "Starter",
    price: "₹199",
    period: "/month",
    tagline: "For consistent daily health tracking",
    upgradeReason: "Unlock your regional cuisine and get more out of AI chat",
    popular: false,
    dark: false,
    ctaText: "Start Starter — 7 Days Free",
    ctaHref: "https://mealcoreai.com/app/sign-up",
    features: [
      "Everything in Free",
      "Choose your regional cuisine (North, South, Bengali, Gujarati…)",
      "10 meal swaps per day",
      "AI diet chat — 25 messages/day",
      "Full nutrition breakdown (protein, fibre, calcium, iron)",
    ],
    locked: [
      "Multiple family profiles",
      "Unlimited swaps",
      "Meal history & analytics",
    ],
  },
  {
    name: "Core",
    price: "₹499",
    period: "/month",
    tagline: "The plan that actually gets results",
    upgradeReason: "Unlimited swaps, unlimited AI chat, and full tracking — everything you need",
    popular: true,
    dark: true,
    ctaText: "Start Core — 7 Days Free",
    ctaHref: "https://mealcoreai.com/app/sign-up",
    features: [
      "Everything in Starter",
      "All 8 health condition tracks",
      "Unlimited meal swaps — swap as often as you like",
      "Unlimited AI diet chat — ask anything, anytime",
      "Full calorie & macro tracking with progress charts",
      "2 family profiles, each personalised",
      "WhatsApp grocery list sharing",
    ],
    locked: [
      "4 family profiles",
      "Meal history & analytics",
    ],
  },
  {
    name: "Premium",
    price: "₹999",
    period: "/month",
    tagline: "Personalised health plans for the whole family",
    upgradeReason: "One plan for you, your partner, your parents, and your kids",
    popular: false,
    dark: false,
    ctaText: "Start Premium — 7 Days Free",
    ctaHref: "https://mealcoreai.com/app/sign-up",
    features: [
      "Everything in Core",
      "4 family profiles — each with their own health condition & plan",
      "Meal history & week-over-week progress analytics",
      "Downloadable PDF grocery list",
      "Priority support (response within 4 hours)",
      "Early access to new features",
    ],
    locked: [],
  },
];

const FAQS = [
  {
    q: "Is the Free plan really free forever?",
    a: "Yes — always. No credit card required. You get a personalised 7-day meal plan every week, a grocery list, and push reminders. Forever free.",
  },
  {
    q: "What happens after the 7-day trial on paid plans?",
    a: "You'll be charged at your chosen plan rate (₹199, ₹499, or ₹999/month). You can cancel anytime before the trial ends — no charge.",
  },
  {
    q: "Can I switch between plans?",
    a: "Yes. Upgrade or downgrade at any time from your account settings. Upgrades take effect immediately; downgrades at the end of your billing cycle.",
  },
  {
    q: "Is my payment secure?",
    a: "Yes. All payments are processed through Razorpay (PCI-DSS Level 1 certified). We never store your card details.",
  },
  {
    q: "Do family profiles each get their own personalised plan?",
    a: "Yes — each family member gets a fully personalised plan based on their own health condition, dietary preference, and regional cuisine. Not a shared plan.",
  },
  {
    q: "Do you offer student or annual discounts?",
    a: "Annual plans are coming soon with significant savings. Student discounts — email hello@mealcoreai.com and we'll sort you out.",
  },
];

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(priceSchema) }}
      />
      <main className="min-h-screen bg-white">

        {/* Hero */}
        <section className="bg-gradient-to-br from-orange-50 to-white pt-28 pb-16 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Start Free. Upgrade When You're Ready.
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Every plan gives you a personalised 7-day Indian meal plan built around your health condition.
              No credit card needed to start.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-sm text-gray-500">
              {["Free to start", "7-day trial on paid plans", "Cancel anytime", "Secured by Razorpay"].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing cards */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-3xl p-7 flex flex-col ${
                  tier.dark
                    ? "bg-gray-950 border-2 border-orange-500 text-white"
                    : "border-2 border-gray-200 bg-white"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                    MOST POPULAR
                  </div>
                )}

                <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${tier.dark ? "text-orange-400" : "text-gray-400"}`}>
                  {tier.name}
                </div>
                <div className={`mb-1 ${tier.dark ? "text-white" : "text-gray-900"}`}>
                  <span className="text-4xl font-extrabold">{tier.price}</span>
                  <span className={`text-sm ${tier.dark ? "text-gray-400" : "text-gray-500"}`}>{tier.period}</span>
                </div>
                <p className={`text-xs mb-5 ${tier.dark ? "text-gray-400" : "text-gray-500"}`}>{tier.tagline}</p>

                {tier.upgradeReason && (
                  <div className={`rounded-xl px-3 py-2.5 mb-5 ${tier.dark ? "bg-orange-500/10 border border-orange-400/20" : "bg-orange-50 border border-orange-100"}`}>
                    <p className={`text-xs font-semibold ${tier.dark ? "text-orange-300" : "text-orange-600"}`}>
                      {tier.upgradeReason}
                    </p>
                  </div>
                )}

                <a
                  href={tier.ctaHref}
                  className={`block w-full text-center font-bold py-3 rounded-2xl text-sm transition-colors mb-6 ${
                    tier.dark
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "border-2 border-orange-500 text-orange-600 hover:bg-orange-50"
                  }`}
                >
                  {tier.ctaText}
                </a>

                <ul className="space-y-2.5 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-xs leading-relaxed ${tier.dark ? "text-gray-300" : "text-gray-700"}`}>
                      <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${tier.dark ? "text-orange-400" : "text-green-500"}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                {tier.locked.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-gray-200/20 space-y-2">
                    {tier.locked.map((f) => (
                      <div key={f} className="flex items-start gap-2 text-xs text-gray-400 opacity-50">
                        <Lock className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                        {f}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-400 mt-8">
            All paid plans include a 7-day free trial · Cancel anytime · No hidden fees
          </p>
        </section>

        {/* FAQ */}
        <section className="bg-gray-50 py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Pricing FAQs</h2>
            <div className="space-y-4">
              {FAQS.map((item) => (
                <details key={item.q} className="bg-white border border-gray-200 rounded-2xl group">
                  <summary className="px-5 py-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 rounded-2xl flex justify-between list-none">
                    {item.q}
                    <span className="text-gray-400 group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-gray-700 border-t border-gray-100 pt-3">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Trust signals */}
        <section className="bg-white py-12 px-4">
          <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
            {[
              { icon: <ShieldCheck className="h-5 w-5 text-green-500" />, text: "Payments secured by Razorpay" },
              { icon: <CheckCircle2 className="h-5 w-5 text-green-500" />, text: "No credit card for Free plan" },
              { icon: <CheckCircle2 className="h-5 w-5 text-green-500" />, text: "Cancel anytime — no questions" },
              { icon: <CheckCircle2 className="h-5 w-5 text-green-500" />, text: "7-day free trial on all paid plans" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                {icon}
                {text}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-orange-500 to-orange-400 py-16 px-4 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">
            Your health plan is waiting — start in 90 seconds
          </h2>
          <p className="text-orange-100 mb-6 max-w-md mx-auto">
            Free to start. No credit card. No generic diet charts. Just Indian food that works for your health condition.
          </p>
          <a
            href="https://mealcoreai.com/app/sign-up"
            className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-8 py-3.5 rounded-full text-lg hover:bg-orange-50 transition-colors"
          >
            Fix My Diet in 2 Minutes <ArrowRight className="h-5 w-5" />
          </a>
          <p className="text-orange-200 text-xs mt-4">Free forever · Takes 90 seconds</p>
        </section>
      </main>
    </>
  );
}
