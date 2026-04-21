import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  CalendarDays,
  ShoppingCart,
  Bell,
  MessageSquare,
  RefreshCw,
  BarChart3,
  Globe,
  Lock,
  CheckCircle2,
  ArrowRight,
  Star,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "MealCoreAI — AI Meal Planning for PCOS, Diabetes, Thyroid, Pregnancy & Kids",
  description:
    "MealCoreAI builds your personalised weekly meal plan based on your health condition, region, and food preferences. Know what to cook every day — free to start.",
  alternates: { canonical: "https://mealcoreai.com" },
  openGraph: {
    title: "MealCoreAI — AI Meal Planning for PCOS, Diabetes, Thyroid, Pregnancy & Kids",
    description:
      "Personalised 7-day Indian meal plans powered by AI. Built for 8 health conditions — free to start.",
    url: "https://mealcoreai.com",
    images: [{ url: "/api/og?page=home" }],
  },
};

const APP_URL = "https://mealcoreai.com/app";

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MealCoreAI",
  url: "https://mealcoreai.com",
  logo: "https://mealcoreai.com/logo.png",
  sameAs: [
    "https://twitter.com/MealCoreAI",
    "https://www.instagram.com/mealcoreai",
  ],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "MealCoreAI",
  url: "https://mealcoreai.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://mealcoreai.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const softwareAppLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MealCoreAI",
  applicationCategory: "HealthApplication",
  operatingSystem: "iOS, Android, Web",
  description:
    "AI-powered personalised Indian meal planner for PCOS, Diabetes, Thyroid, Pregnancy, Kids, and more.",
  offers: [
    { "@type": "Offer", price: "0", priceCurrency: "INR", name: "Free" },
    { "@type": "Offer", price: "499", priceCurrency: "INR", name: "Pro Monthly" },
  ],
};

const TRACKS = [
  {
    emoji: "🌸",
    name: "PCOS",
    benefit: "Hormone-friendly, low-GI Indian meals that reduce insulin resistance",
    href: "/pcos-meal-plan",
    color: "rose",
  },
  {
    emoji: "💙",
    name: "Diabetes",
    benefit: "Low-GI, high-fibre meals for stable blood sugar all day",
    href: "/diabetes-meal-plan",
    color: "teal",
  },
  {
    emoji: "🦋",
    name: "Thyroid",
    benefit: "Selenium and iodine-rich Indian food for thyroid support",
    href: "/thyroid-diet-plan",
    color: "emerald",
  },
  {
    emoji: "🤰",
    name: "Pregnancy",
    benefit: "Trimester-wise nutrition with iron, folate, and calcium",
    href: "/pregnancy-meal-plan",
    color: "orange",
  },
  {
    emoji: "🧒",
    name: "Kids",
    benefit: "Nutrient-dense tiffin and dinner ideas for ages 2–12",
    href: "/kids-meal-plan",
    color: "yellow",
  },
  {
    emoji: "❤️",
    name: "Cholesterol",
    benefit: "Heart-healthy, low-saturated-fat Indian meals rich in omega-3",
    href: "/cholesterol-diet-plan",
    color: "purple",
  },
];

const FEATURES = [
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "AI-Generated Weekly Plan",
    desc: "Get a personalised 7-day plan in seconds — breakfast, lunch, snack, and dinner — tuned by GPT-4 for your exact health needs.",
    color: "text-orange-500 bg-orange-50",
  },
  {
    icon: <Bell className="h-6 w-6" />,
    title: "Daily Meal Reminders",
    desc: "Push notifications at breakfast, lunch, and dinner — with your actual dish name so you never forget to cook.",
    color: "text-rose-500 bg-rose-50",
  },
  {
    icon: <ShoppingCart className="h-6 w-6" />,
    title: "Grocery List",
    desc: "One tap turns your meal plan into an organised grocery list with exact quantities — ready to share on WhatsApp.",
    color: "text-emerald-500 bg-emerald-50",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Nutrition Tracking",
    desc: "See calories, protein, calcium, and fibre for every meal with a real-time daily progress bar — no manual entry.",
    color: "text-blue-500 bg-blue-50",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Regional Cuisine",
    desc: "North Indian, South Indian, Maharashtrian, Bengali, Gujarati — your region, your flavours, every single week.",
    color: "text-purple-500 bg-purple-50",
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Swap and Lock",
    desc: "Love today's dal? Lock it in. Want something different? Swap any meal instantly — the AI adapts around your choices.",
    color: "text-teal-500 bg-teal-50",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya S.",
    location: "Bangalore",
    track: "PCOS",
    trackEmoji: "🌸",
    trackColor: "text-rose-600 bg-rose-50",
    text: "I've had PCOS for 4 years and tried every diet. MealCoreAI finally gave me a plan that makes sense — South Indian food I already love, but properly balanced for my hormones. My cycles are more regular after 3 months.",
    rating: 5,
  },
  {
    name: "Ramesh K.",
    location: "Chennai",
    track: "Diabetes",
    trackEmoji: "💙",
    trackColor: "text-teal-700 bg-teal-50",
    text: "My HbA1c dropped from 8.2 to 6.9 in four months. The app generates low-GI South Indian meals that fit my routine exactly. The grocery list saves my wife an hour every Sunday.",
    rating: 5,
  },
  {
    name: "Anita M.",
    location: "Mumbai",
    track: "Pregnancy",
    trackEmoji: "🤰",
    trackColor: "text-orange-700 bg-orange-50",
    text: "My gynaecologist was impressed with my haemoglobin levels at week 28. MealCoreAI made sure I got iron and folate every day through food I actually enjoyed. Highly recommend for expecting mothers.",
    rating: 5,
  },
];

const STEPS = [
  {
    n: "1",
    icon: "⚡",
    title: "Tell us about yourself",
    desc: "A 90-second onboarding covers your health condition, region, diet type, family size, and how much time you have to cook each day.",
  },
  {
    n: "2",
    icon: "🤖",
    title: "Get your AI-powered weekly plan",
    desc: "Our GPT-4 powered engine instantly generates a 7-day Indian meal plan — personalised to your health track, preferences, and schedule.",
  },
  {
    n: "3",
    icon: "✅",
    title: "Cook with confidence — swap, lock, repeat",
    desc: "Follow your plan, lock meals you love, swap ones you don't. Regenerate each week. Your plan improves the more you use it.",
  },
];

const trackColorMap: Record<string, string> = {
  rose: "bg-rose-50 border-rose-200 text-rose-700",
  teal: "bg-teal-50 border-teal-200 text-teal-700",
  emerald: "bg-emerald-50 border-emerald-200 text-emerald-700",
  orange: "bg-orange-50 border-orange-200 text-orange-700",
  yellow: "bg-yellow-50 border-yellow-200 text-yellow-700",
  purple: "bg-purple-50 border-purple-200 text-purple-700",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppLd) }}
      />

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-50 via-white to-rose-50" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-100/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold uppercase tracking-wide mb-8">
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered Indian Meal Planning
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tight mb-6">
              Never Ask "What to Cook?" Again
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
              MealCoreAI builds your personalised weekly meal plan for{" "}
              <strong className="text-gray-800">PCOS, Diabetes, Thyroid, Pregnancy</strong>, or your Kids — based on
              your region, health conditions, and favourite foods.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
              <a
                href={`${APP_URL}/sign-up`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-base transition-colors shadow-lg shadow-orange-200"
              >
                Get My Free Meal Plan <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-semibold text-base transition-colors"
              >
                See How It Works
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {TRACKS.map((t) => (
                <Link
                  key={t.name}
                  href={t.href}
                  className={`track-badge ${trackColorMap[t.color]} hover:opacity-80 transition-opacity`}
                >
                  {t.emoji} {t.name}
                </Link>
              ))}
            </div>
          </div>

          {/* App preview card */}
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl shadow-orange-100 border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-rose-500 px-6 py-4 flex items-center gap-3">
                <img src="/logo.svg" alt="" className="h-7 w-7" aria-hidden="true" />
                <div>
                  <div className="text-white font-bold text-sm">MealCoreAI</div>
                  <div className="text-orange-100 text-xs">Today's meal plan — PCOS track</div>
                </div>
              </div>
              <div className="p-6 grid grid-cols-2 gap-3">
                {[
                  { meal: "Breakfast", dish: "Ragi Dosa + Coconut Chutney", cal: "285 kcal", time: "20 min", icon: "🌅" },
                  { meal: "Lunch", dish: "Moong Dal + Bajra Roti + Salad", cal: "410 kcal", time: "30 min", icon: "☀️" },
                  { meal: "Snack", dish: "Walnuts + Amla Juice", cal: "115 kcal", time: "2 min", icon: "🥜" },
                  { meal: "Dinner", dish: "Palak Paneer + Jowar Roti", cal: "390 kcal", time: "25 min", icon: "🌙" },
                ].map(({ meal, dish, cal, time, icon }) => (
                  <div key={meal} className="bg-gray-50 rounded-2xl p-4">
                    <div className="text-xl mb-2">{icon}</div>
                    <div className="text-xs font-semibold text-orange-500 uppercase tracking-wide mb-1">{meal}</div>
                    <div className="text-sm font-bold text-gray-800 leading-tight mb-2">{dish}</div>
                    <div className="flex gap-2 text-xs text-gray-500">
                      <span>🔥 {cal}</span>
                      <span>⏱ {time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 pb-5">
                <div className="bg-orange-50 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-700">Today's nutrition</span>
                    <span className="text-xs text-orange-600 font-bold">1,200 / 1,500 kcal</span>
                  </div>
                  <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-orange-400 to-rose-400 rounded-full w-4/5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ──────────────────────────────────────── */}
      <section className="bg-gray-950 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center sm:text-left">
            {[
              { icon: "🍽️", text: "10,000+ meal plans generated" },
              { icon: "👩‍⚕️", text: "Reviewed by certified dietitians" },
              { icon: "🏥", text: "PCOS · Diabetes · Thyroid · Pregnancy · Kids" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <span className="text-2xl">{icon}</span>
                <span className="text-gray-300 text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ──────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              From Sign-Up to Meal Plan in 2 Minutes
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Three simple steps. No guesswork. No dietitian appointment needed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-0.5 bg-gradient-to-r from-orange-200 via-orange-300 to-orange-200" />
            {STEPS.map(({ n, icon, title, desc }) => (
              <div key={n} className="relative text-center">
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-orange-50 border-2 border-orange-100 mb-5 text-3xl mx-auto">
                  {icon}
                  <span className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-orange-500 text-white text-xs font-black flex items-center justify-center">
                    {n}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HEALTH TRACKS ─────────────────────────────────────── */}
      <section id="tracks" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Built for Your Specific Health Condition
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              MealCoreAI understands the dietary requirements of each condition — so every meal works for your body, not against it.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRACKS.map((t) => (
              <div
                key={t.name}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="text-4xl mb-4">{t.emoji}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{t.benefit}</p>
                <Link
                  href={t.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-500 hover:text-orange-600"
                >
                  See {t.name} Plans <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ──────────────────────────────────────────── */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Everything You Need to Eat Well Every Day
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              From AI meal generation to grocery lists and push reminders — every tool you need in one app.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon, title, desc, color }) => (
              <div
                key={title}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4 ${color}`}>
                  {icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ──────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-orange-50 to-rose-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Real People, Real Results
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, location, track, trackEmoji, trackColor, text, rating }) => (
              <div key={name} className="bg-white rounded-2xl p-6 shadow-sm border border-orange-50 flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-5">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-sm font-bold text-orange-600">
                    {name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{name}</div>
                    <div className="text-xs text-gray-400">{location}</div>
                  </div>
                  <span className={`ml-auto text-xs font-medium px-2.5 py-1 rounded-full border ${trackColor}`}>
                    {trackEmoji} {track}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ───────────────────────────────────────────── */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Simple, Honest Pricing
            </h2>
            <p className="text-lg text-gray-500">Start free. Upgrade when you're ready.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free */}
            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8">
              <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Free</div>
              <div className="text-4xl font-black text-gray-900 mb-1">₹0</div>
              <div className="text-gray-400 text-sm mb-6">Forever free</div>
              <ul className="space-y-3 mb-8">
                {[
                  "7-day AI meal plan (regenerate weekly)",
                  "Grocery list generation",
                  "Nutrition tracking",
                  "1 health track",
                  "AI nutrition chat (10 messages/day)",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={`${APP_URL}/sign-up`}
                className="block text-center py-3 px-6 rounded-full border-2 border-orange-500 text-orange-600 font-semibold hover:bg-orange-50 transition-colors"
              >
                Start Free — No Credit Card Needed
              </a>
            </div>

            {/* Pro */}
            <div className="bg-gray-950 border border-orange-500/30 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </div>
              <div className="text-sm font-semibold text-orange-400 uppercase tracking-wide mb-2">Pro</div>
              <div className="text-4xl font-black text-white mb-1">₹499<span className="text-lg font-medium text-gray-400">/mo</span></div>
              <div className="text-gray-400 text-sm mb-6">or ₹2,999/year (save 50%)</div>
              <ul className="space-y-3 mb-8">
                {[
                  "Everything in Free",
                  "All 8 health tracks",
                  "Unlimited AI chat",
                  "Multiple family profiles",
                  "WhatsApp grocery sharing",
                  "Meal history & analytics",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle2 className="h-4 w-4 text-orange-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={`${APP_URL}/sign-up`}
                className="block text-center py-3 px-6 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors"
              >
                Start Free Trial
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ──────────────────────────────────────────── */}
      <section className="py-24 bg-gray-950 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-6">🍛</div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-5">
            Your Health Starts at Your Core
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
            Join thousands of Indians taking control of their health — one personalised meal at a time.
          </p>
          <a
            href={`${APP_URL}/sign-up`}
            className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg transition-colors shadow-xl shadow-orange-900/30"
          >
            Get My Personalised Meal Plan <ArrowRight className="h-5 w-5" />
          </a>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            {["✓ Free forever", "✓ 8 health tracks", "✓ 500+ Indian dishes", "✓ Daily reminders"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
