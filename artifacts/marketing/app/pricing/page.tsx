import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing — Free & Pro Plans | MealCoreAI",
  description:
    "MealCoreAI is free to start. Pro plan at ₹499/month unlocks unlimited meal plans, nutrition tracking, family profiles, and all 8 health condition tracks.",
};

const FREE_FEATURES = [
  "1 personalised meal plan per week",
  "All 8 health condition tracks",
  "5 regional cuisines",
  "Grocery list generation",
  "3 meal swaps per day",
  "Push notification reminders",
  "Basic nutrition info",
];

const PRO_FEATURES = [
  "Unlimited meal plans",
  "All 17 regional cuisines",
  "Unlimited meal swaps",
  "Detailed nutrition tracking",
  "Family profiles (up to 4)",
  "AI chat for personalised advice",
  "No ads, priority support",
  "Early access to new features",
  "Downloadable grocery list (PDF)",
  "Calorie & macro tracking",
];

const priceSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "MealCoreAI Pro",
  description: "Unlimited personalised Indian meal plans for your health condition",
  offers: [
    {
      "@type": "Offer",
      name: "Monthly",
      price: "499",
      priceCurrency: "INR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "499",
        priceCurrency: "INR",
        billingDuration: "P1M",
      },
    },
    {
      "@type": "Offer",
      name: "Yearly",
      price: "2999",
      priceCurrency: "INR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "2999",
        priceCurrency: "INR",
        billingDuration: "P1Y",
      },
    },
  ],
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(priceSchema) }}
      />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-orange-50 to-white py-20 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Simple, honest pricing
            </h1>
            <p className="text-lg text-gray-600">
              Free to start. Upgrade when you&apos;re ready for more.
            </p>
          </div>
        </section>

        {/* Pricing cards */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Free */}
            <div className="border-2 border-gray-200 rounded-3xl p-8">
              <div className="mb-6">
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Free</div>
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-extrabold text-gray-900">₹0</span>
                  <span className="text-gray-500 mb-1">/month</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">Forever free. No credit card needed.</p>
              </div>

              <a
                href="https://app.mealcoreai.com/sign-up"
                className="block w-full text-center border-2 border-orange-600 text-orange-600 hover:bg-orange-50 font-bold py-3 rounded-2xl text-sm transition-colors mb-6"
              >
                Get Started Free
              </a>

              <ul className="space-y-3">
                {FREE_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro */}
            <div className="border-2 border-orange-500 rounded-3xl p-8 relative bg-orange-50">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                MOST POPULAR
              </div>
              <div className="mb-6">
                <div className="text-sm font-semibold text-orange-600 uppercase tracking-wide mb-2">Pro</div>
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-extrabold text-gray-900">₹499</span>
                  <span className="text-gray-500 mb-1">/month</span>
                </div>
                <div className="mt-2 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full inline-block">
                  ₹2,999/year — save ₹2,989
                </div>
              </div>

              <a
                href="https://app.mealcoreai.com/sign-up"
                className="block w-full text-center bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-2xl text-sm transition-colors mb-6 shadow-lg"
              >
                Start Pro — 7 Days Free
              </a>

              <ul className="space-y-3">
                {PRO_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-800 font-medium">
                    <span className="text-orange-500 mt-0.5 shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-gray-50 py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Pricing FAQs</h2>
            <div className="space-y-4">
              {[
                { q: "Is the free plan really free?", a: "Yes — always. No credit card required. You get 1 personalised meal plan per week, grocery list, and meal reminders forever." },
                { q: "What happens after the 7-day Pro trial?", a: "You'll be charged ₹499/month or ₹2,999/year depending on the plan you chose. You can cancel before the trial ends with no charge." },
                { q: "Can I cancel anytime?", a: "Yes, cancel anytime from your account settings. If you cancel, you keep Pro access until the end of your billing period." },
                { q: "Is my payment secure?", a: "Yes. Payments are processed through Razorpay (PCI-DSS Level 1 certified). We never store your card details." },
                { q: "Do you offer student or family discounts?", a: "The Pro family plan already includes up to 4 family profiles. Student discounts are coming soon — email us at hello@mealcoreai.com." },
              ].map((item) => (
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

        {/* CTA */}
        <section className="bg-gradient-to-r from-orange-500 to-orange-400 py-14 px-4 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Start eating right today — it&apos;s free</h2>
          <p className="text-orange-100 mb-6 max-w-md mx-auto">
            Join thousands of Indian families managing their health with personalised meal plans.
          </p>
          <a
            href="https://app.mealcoreai.com/sign-up"
            className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-8 py-3.5 rounded-full text-lg hover:bg-orange-50 transition-colors"
          >
            Get Started Free →
          </a>
        </section>
      </main>
    </>
  );
}
