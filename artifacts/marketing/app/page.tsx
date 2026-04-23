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
  ClipboardList,
  Wand2,
  ChefHat,
  Activity,
  Droplets,
  Zap,
  Heart,
  Baby,
  HeartPulse,
  UtensilsCrossed,
  ShieldCheck,
  Stethoscope,
  Sunrise,
  Sun,
  Apple,
  Moon,
  Flame,
  Clock,
  X,
  TrendingDown,
  AlertTriangle,
  CheckCheck,
} from "lucide-react";

export const metadata: Metadata = {
  description:
    "Control PCOS, Diabetes & Thyroid with a daily AI diet plan that adapts to your body — personalised Indian meals, no generic diet charts. Free to start.",
  alternates: { canonical: "https://mealcoreai.com" },
  openGraph: {
    title: "MealCoreAI — Control PCOS, Diabetes & Thyroid With Your Diet",
    description:
      "Unlike one-time diet charts, MealCoreAI gives you a daily Indian meal plan that adapts to your condition, routine, and what you actually eat. Free to start.",
    url: "https://mealcoreai.com",
    images: [{ url: "/api/og?page=home", width: 1200, height: 630 }],
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
};

const softwareAppLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MealCoreAI",
  applicationCategory: "HealthApplication",
  operatingSystem: "iOS, Android, Web",
  description:
    "Personalised Indian meal plans for PCOS, Diabetes, Thyroid, Pregnancy, and weight loss — powered by AI.",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "3",
    bestRating: "5",
    worstRating: "1",
  },
  offers: [
    { "@type": "Offer", price: "0", priceCurrency: "INR", name: "Free" },
    { "@type": "Offer", price: "199", priceCurrency: "INR", name: "Starter" },
    { "@type": "Offer", price: "499", priceCurrency: "INR", name: "Core" },
    { "@type": "Offer", price: "999", priceCurrency: "INR", name: "Premium" },
  ],
};

const TRACKS = [
  {
    icon: <Activity className="h-6 w-6" />,
    iconColor: "text-rose-500 bg-rose-50",
    badgeColor: "bg-rose-50 border-rose-200 text-rose-700",
    name: "PCOS",
    outcome: "Regular cycles in 8–12 weeks",
    benefit: "Low-GI, hormone-balancing Indian meals that lower insulin resistance and reduce inflammation — without giving up your regional cuisine.",
    href: "/pcos-meal-plan",
    color: "rose",
  },
  {
    icon: <Droplets className="h-6 w-6" />,
    iconColor: "text-teal-500 bg-teal-50",
    badgeColor: "bg-teal-50 border-teal-200 text-teal-700",
    name: "Diabetes",
    outcome: "Stable blood sugar all day",
    benefit: "High-fibre, low-GI Indian meals that keep your blood sugar steady — so you can reduce medicine dependency over time.",
    href: "/diabetes-meal-plan",
    color: "teal",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    iconColor: "text-emerald-500 bg-emerald-50",
    badgeColor: "bg-emerald-50 border-emerald-200 text-emerald-700",
    name: "Thyroid",
    outcome: "More energy, less fatigue",
    benefit: "Selenium, iodine, and zinc-rich Indian foods that support thyroid function — avoiding goitrogens at the right times.",
    href: "/thyroid-diet-plan",
    color: "emerald",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    iconColor: "text-orange-500 bg-orange-50",
    badgeColor: "bg-orange-50 border-orange-200 text-orange-700",
    name: "Weight Loss",
    outcome: "Lose 3–5 kg per month",
    benefit: "Calorie-controlled Indian meals with high satiety — you eat full portions of food you love while consistently losing weight.",
    href: "/meal-plans/weight-loss",
    color: "orange",
  },
  {
    icon: <Baby className="h-6 w-6" />,
    iconColor: "text-yellow-500 bg-yellow-50",
    badgeColor: "bg-yellow-50 border-yellow-200 text-yellow-700",
    name: "Pregnancy",
    outcome: "Better haemoglobin & baby weight",
    benefit: "Trimester-specific iron, folate, and calcium from Indian food — so your doctor is impressed at every check-up.",
    href: "/pregnancy-meal-plan",
    color: "yellow",
  },
  {
    icon: <HeartPulse className="h-6 w-6" />,
    iconColor: "text-purple-500 bg-purple-50",
    badgeColor: "bg-purple-50 border-purple-200 text-purple-700",
    name: "Cholesterol",
    outcome: "Lower LDL in 60 days",
    benefit: "Heart-healthy, low-saturated-fat Indian meals rich in omega-3 and soluble fibre — designed to improve your lipid profile.",
    href: "/cholesterol-diet-plan",
    color: "purple",
  },
];

const FEATURES = [
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Your 7-day plan, ready in 90 seconds",
    desc: "Stop spending weekends planning meals. Answer a few questions about your health and preferences — get a full week of breakfast, lunch, snack, and dinner instantly.",
    color: "text-orange-500 bg-orange-50",
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Ask anything, get a real answer",
    desc: "Not sure if methi is safe for your thyroid? Wondering if poha is okay for diabetes? Ask your AI diet assistant — answers in seconds, not appointments.",
    color: "text-blue-500 bg-blue-50",
  },
  {
    icon: <ShoppingCart className="h-6 w-6" />,
    title: "Never forget an ingredient again",
    desc: "One tap turns your weekly plan into a grocery list with exact quantities. Share it on WhatsApp — no more double-trips to the sabzi mandi.",
    color: "text-emerald-500 bg-emerald-50",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "See your progress — no manual entry",
    desc: "Track calories, protein, calcium, and fibre for every meal automatically. Watch your daily nutrition score improve week over week.",
    color: "text-violet-500 bg-violet-50",
  },
  {
    icon: <Bell className="h-6 w-6" />,
    title: "Personalised reminders — with your dish name",
    desc: "Get a push notification at 8 AM saying \u201cToday\u2019s breakfast: Ragi Dosa\u201d \u2014 not a generic \u2018time to eat\u2019 alert. Never miss a meal again.",
    color: "text-rose-500 bg-rose-50",
  },
  {
    icon: <RefreshCw className="h-6 w-6" />,
    title: "Bored of a dish? Swap it in one tap",
    desc: "Don't like today's lunch? Swap it instantly for something else that fits your health plan. Love it? Lock it so it keeps appearing in your plan.",
    color: "text-teal-500 bg-teal-50",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya S.",
    location: "Bangalore",
    track: "PCOS",
    trackColor: "text-rose-600 bg-rose-50 border-rose-200",
    result: "Cycles regular after 3 months",
    text: "I've had PCOS for 4 years and tried every diet. MealCoreAI finally gave me a plan that makes sense — South Indian food I already love, balanced for my hormones. My periods are more regular after 3 months, and my dermatologist noticed my skin improving too.",
    rating: 5,
  },
  {
    name: "Ramesh K.",
    location: "Chennai",
    track: "Diabetes",
    trackColor: "text-teal-700 bg-teal-50 border-teal-200",
    result: "HbA1c: 8.2 → 6.9 in 4 months",
    text: "My HbA1c dropped from 8.2 to 6.9 in four months. The app generates low-GI South Indian meals that fit my routine — idli with sambar, but the right portions. My doctor reduced my medication last visit. The grocery list saves my wife an hour every Sunday.",
    rating: 5,
  },
  {
    name: "Anita M.",
    location: "Mumbai",
    track: "Pregnancy",
    trackColor: "text-orange-700 bg-orange-50 border-orange-200",
    result: "Haemoglobin 11.2 → 12.8 g/dL",
    text: "My gynaecologist was impressed with my haemoglobin at week 28 — it went from 11.2 to 12.8 g/dL without any extra supplements. MealCoreAI made sure I got iron and folate every day through food I actually enjoyed. I recommend this to every pregnant woman I know.",
    rating: 5,
  },
];

const STEPS = [
  {
    n: "1",
    icon: <ClipboardList className="h-8 w-8 text-orange-500" />,
    title: "Tell us your health condition",
    outcome: "Takes 90 seconds",
    desc: "Answer a short questionnaire — your condition (PCOS, Diabetes, Thyroid, etc.), your region, diet type, family size, and how much time you have to cook.",
  },
  {
    n: "2",
    icon: <Wand2 className="h-8 w-8 text-orange-500" />,
    title: "Get your personalised 7-day plan",
    outcome: "Instant — no waiting",
    desc: "Your plan is built specifically for your health condition and regional cuisine. Every meal — breakfast, lunch, snack, dinner — is nutritionally balanced for your body.",
  },
  {
    n: "3",
    icon: <ChefHat className="h-8 w-8 text-orange-500" />,
    title: "Cook, track, and improve every week",
    outcome: "See results in weeks, not months",
    desc: "Follow your plan, swap meals you don't like, lock the ones you love. Get a fresh plan every week — your results compound over time.",
  },
];

const MEAL_TIMES = [
  { meal: "Breakfast", dish: "Ragi Dosa + Coconut Chutney", cal: "285 kcal", time: "20 min", icon: <Sunrise className="h-5 w-5 text-orange-400" /> },
  { meal: "Lunch", dish: "Moong Dal + Bajra Roti + Salad", cal: "410 kcal", time: "30 min", icon: <Sun className="h-5 w-5 text-yellow-500" /> },
  { meal: "Snack", dish: "Walnuts + Amla Juice", cal: "115 kcal", time: "2 min", icon: <Apple className="h-5 w-5 text-green-500" /> },
  { meal: "Dinner", dish: "Palak Paneer + Jowar Roti", cal: "390 kcal", time: "25 min", icon: <Moon className="h-5 w-5 text-indigo-400" /> },
];

const SOCIAL_PROOF = [
  { icon: <UtensilsCrossed className="h-5 w-5 text-orange-400" />, text: "12,000+ health plans created" },
  { icon: <Stethoscope className="h-5 w-5 text-orange-400" />, text: "Dietitian-reviewed meal database" },
  { icon: <ShieldCheck className="h-5 w-5 text-orange-400" />, text: "PCOS · Diabetes · Thyroid · Pregnancy · Weight Loss" },
];

const PRICING_TIERS = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    tagline: "Start here — no card needed",
    highlight: false,
    cta: "Get Started Free",
    ctaStyle: "border-2 border-orange-500 text-orange-600 hover:bg-orange-50",
    upgradeReason: null,
    features: [
      "7-day personalised meal plan",
      "1 health condition track",
      "Grocery list",
      "3 meal swaps per day",
      "Push reminders with dish names",
      "Basic nutrition info",
      "AI chat (5 messages/day)",
    ],
    locked: ["Regional cuisine selection", "Family profiles", "Unlimited swaps", "Full nutrition tracking"],
  },
  {
    name: "Starter",
    price: "₹199",
    period: "/month",
    tagline: "For consistent daily tracking",
    highlight: false,
    cta: "Start Starter Plan",
    ctaStyle: "border-2 border-gray-700 text-gray-900 hover:bg-gray-50",
    upgradeReason: "Unlock regional food + more AI chat",
    features: [
      "Everything in Free",
      "Choose your regional cuisine",
      "10 meal swaps per day",
      "AI chat (25 messages/day)",
      "Detailed nutrition breakdown",
    ],
    locked: ["Family profiles", "Unlimited swaps", "Meal history & analytics"],
  },
  {
    name: "Core",
    price: "₹499",
    period: "/month",
    tagline: "Most popular — best value",
    highlight: true,
    cta: "Start Core — 7 Days Free",
    ctaStyle: "bg-orange-500 hover:bg-orange-600 text-white",
    upgradeReason: "Unlimited everything — the plan that actually gets results",
    features: [
      "Everything in Starter",
      "All 8 health condition tracks",
      "Unlimited meal swaps",
      "Unlimited AI diet chat",
      "Full calorie & macro tracking",
      "2 family profiles",
      "WhatsApp grocery sharing",
    ],
    locked: ["4 family profiles", "Meal history & analytics"],
  },
  {
    name: "Premium",
    price: "₹999",
    period: "/month",
    tagline: "For the whole family",
    highlight: false,
    cta: "Start Premium — 7 Days Free",
    ctaStyle: "bg-gray-950 hover:bg-gray-800 text-white",
    upgradeReason: "Manage health for your entire family in one place",
    features: [
      "Everything in Core",
      "4 family profiles (each personalised)",
      "Meal history & progress analytics",
      "Priority support",
      "Early access to new features",
      "Downloadable PDF grocery list",
    ],
    locked: [],
  },
];

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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold uppercase tracking-wide mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Trusted by 12,000+ Indian families &bull; Dietitian-reviewed
            </div>

            <p className="text-sm text-gray-500 italic mb-6">
              Still following the same diet chart for weeks? Your body isn&rsquo;t static &mdash; your diet shouldn&rsquo;t be either.
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tight mb-6">
              Control PCOS, Diabetes &amp; Thyroid &mdash;{" "}
              <span className="text-orange-500">Starting With Tonight&rsquo;s Dinner</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-4 max-w-2xl mx-auto">
              Unlike one-time diet charts or expensive consultations, get a{" "}
              <strong className="text-gray-800">daily AI diet plan</strong> that adapts to your body, your routine, and what you actually eat.
            </p>

            <p className="text-sm font-medium text-orange-600 mb-10">
              Start today &mdash; see real changes in your energy, cravings, and symptoms within weeks.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              <a
                href={`${APP_URL}/sign-up`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-base transition-colors shadow-lg shadow-orange-200"
              >
                Fix My Diet in 2 Minutes <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-semibold text-base transition-colors"
              >
                See How It Works
              </Link>
            </div>

            <p className="text-xs text-gray-400 mb-10">
              Free to start &bull; No credit card &bull; Your plan is ready in 90 seconds
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {TRACKS.map((t) => (
                <Link
                  key={t.name}
                  href={t.href}
                  className={`track-badge ${t.badgeColor} hover:opacity-80 transition-opacity`}
                >
                  {t.name}
                </Link>
              ))}
            </div>
          </div>

          {/* App preview card */}
          <div className="mt-16 max-w-2xl mx-auto" role="img" aria-label="MealCoreAI app showing a personalised PCOS meal plan with Indian meals">
            <div className="bg-white rounded-3xl shadow-2xl shadow-orange-100 border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-rose-500 px-6 py-4 flex items-center gap-3">
                <img src="/logo.svg" alt="" className="h-7 w-7" aria-hidden="true" />
                <div>
                  <div className="text-white font-bold text-sm">MealCoreAI</div>
                  <div className="text-orange-100 text-xs">Today's plan — PCOS · South Indian</div>
                </div>
                <div className="ml-auto bg-white/20 text-white text-xs px-2.5 py-1 rounded-full font-medium">
                  Day 3 of 7
                </div>
              </div>
              <div className="p-6 grid grid-cols-2 gap-3">
                {MEAL_TIMES.map(({ meal, dish, cal, time, icon }) => (
                  <div key={meal} className="bg-gray-50 rounded-2xl p-4">
                    <div className="mb-2">{icon}</div>
                    <div className="text-xs font-semibold text-orange-500 uppercase tracking-wide mb-1">{meal}</div>
                    <div className="text-sm font-bold text-gray-800 leading-tight mb-2">{dish}</div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Flame className="h-3 w-3 text-orange-400" />{cal}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{time}</span>
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

      {/* ─── SOCIAL PROOF BAR ──────────────────────────────────── */}
      <section className="bg-gray-950 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center sm:text-left">
            {SOCIAL_PROOF.map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                {icon}
                <span className="text-gray-300 text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROBLEM SECTION ───────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              You Know You Should Eat Healthy.<br className="hidden sm:block" />
              But No One Agrees on What That Means.
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              You've gotten advice from every direction — and still don't know what to cook tonight.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: <AlertTriangle className="h-5 w-5 text-red-400" />,
                bg: "bg-red-50 border-red-100",
                text: "Your doctor said 'low sugar, low oil' — but gave you no actual meal plan to follow.",
              },
              {
                icon: <AlertTriangle className="h-5 w-5 text-red-400" />,
                bg: "bg-red-50 border-red-100",
                text: "Google gives you 50 conflicting results. One says avoid rice. Another says rice is fine in moderation.",
              },
              {
                icon: <AlertTriangle className="h-5 w-5 text-red-400" />,
                bg: "bg-red-50 border-red-100",
                text: "Instagram influencers recommend keto and intermittent fasting — neither designed for Indian food or your lifestyle.",
              },
              {
                icon: <AlertTriangle className="h-5 w-5 text-red-400" />,
                bg: "bg-red-50 border-red-100",
                text: "A dietitian costs ₹3,000 for a single visit — and the chart they give you doesn't account for your region or budget.",
              },
              {
                icon: <AlertTriangle className="h-5 w-5 text-red-400" />,
                bg: "bg-red-50 border-red-100",
                text: "You start a diet on Monday. By Wednesday, you're back to ordering from outside — because there was no real plan.",
              },
              {
                icon: <AlertTriangle className="h-5 w-5 text-red-400" />,
                bg: "bg-red-50 border-red-100",
                text: "You don't know if the dosa you made for the family is helping or hurting your PCOS. Every meal feels like a guess.",
              },
            ].map((item, i) => (
              <div key={i} className={`${item.bg} border rounded-2xl p-5 flex items-start gap-3`}>
                <div className="shrink-0 mt-0.5">{item.icon}</div>
                <p className="text-sm text-gray-700 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-xl font-bold text-gray-900 mb-2">
              This confusion is exhausting — and it's hurting your health.
            </p>
            <p className="text-gray-500">
              The good news? It doesn't have to be this hard.
            </p>
          </div>
        </div>
      </section>

      {/* ─── SOLUTION / BEFORE-AFTER ───────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-orange-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              MealCoreAI Ends the Guesswork — for Good
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Instead of generic advice, you get a personalised plan for your exact health condition —
              using Indian food your family already eats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before */}
            <div className="bg-white border-2 border-red-100 rounded-3xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <X className="h-4 w-4 text-red-500" />
                </div>
                <span className="font-bold text-red-600 text-lg">Before MealCoreAI</span>
              </div>
              <ul className="space-y-4">
                {[
                  "Googling 'PCOS diet Indian' every week",
                  "Skipping meals because you're unsure what's safe",
                  "Spending ₹3,000+ on a dietitian for a generic chart",
                  "Starting diets that last 3 days before giving up",
                  "HbA1c rising despite 'trying to eat right'",
                  "Cooking different food for yourself and the family",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <X className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* After */}
            <div className="bg-white border-2 border-green-100 rounded-3xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCheck className="h-4 w-4 text-green-600" />
                </div>
                <span className="font-bold text-green-700 text-lg">With MealCoreAI</span>
              </div>
              <ul className="space-y-4">
                {[
                  "7-day plan built for your condition — ready in 90 seconds",
                  "Know exactly what to cook every meal, every day",
                  "Free to start — a fraction of the cost of a single dietitian visit",
                  "Stay consistent because the plan does the thinking for you",
                  "Track nutrition and see your health numbers improve",
                  "Family-friendly meals everyone eats — adapted for your needs",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-800 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mt-10">
            <a
              href={`${APP_URL}/sign-up`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-base transition-colors shadow-lg shadow-orange-200"
            >
              Start for Free — See the Difference <ArrowRight className="h-4 w-4" />
            </a>
            <p className="text-xs text-gray-400 mt-3">No credit card · Takes 90 seconds</p>
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
            {STEPS.map(({ n, icon, title, outcome, desc }) => (
              <div key={n} className="relative text-center">
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-orange-50 border-2 border-orange-100 mb-5 mx-auto">
                  {icon}
                  <span className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-orange-500 text-white text-xs font-black flex items-center justify-center">
                    {n}
                  </span>
                </div>
                <div className="inline-block bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {outcome}
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
              Built Around Your Health Condition
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Not a generic diet. Every meal in your plan is chosen specifically for your body's needs — and the results are measurable.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRACKS.map((t) => (
              <div
                key={t.name}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4 ${t.iconColor}`}>
                  {t.icon}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{t.name}</h3>
                  <span className="text-xs font-semibold bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-100">
                    {t.outcome}
                  </span>
                </div>
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

      {/* ─── FEATURES → BENEFITS ───────────────────────────────── */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Everything You Need to Eat Well — Every Single Day
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              MealCoreAI is not just a meal planner. It's the daily structure that keeps your health on track when life gets busy.
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
              Real People. Measured Results.
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Not before-after photos. Actual numbers from people managing real health conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, location, track, trackColor, result, text, rating }) => (
              <div key={name} className="bg-white rounded-2xl p-6 shadow-sm border border-orange-50 flex flex-col">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                {/* Result callout */}
                <div className="bg-green-50 border border-green-100 rounded-xl px-3 py-2 mb-4 flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-green-600 shrink-0" />
                  <span className="text-xs font-bold text-green-700">{result}</span>
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
                    {track}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ───────────────────────────────────────────── */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Start Free. Upgrade When You're Ready.
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Every plan includes a personalised 7-day meal plan. No credit card required to start.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-3xl p-7 flex flex-col ${
                  tier.highlight
                    ? "bg-gray-950 border-2 border-orange-500 text-white shadow-2xl shadow-orange-900/20"
                    : "bg-gray-50 border border-gray-200"
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                    MOST POPULAR
                  </div>
                )}

                <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${tier.highlight ? "text-orange-400" : "text-gray-400"}`}>
                  {tier.name}
                </div>
                <div className={`text-4xl font-black mb-0.5 ${tier.highlight ? "text-white" : "text-gray-900"}`}>
                  {tier.price}
                  <span className={`text-base font-medium ${tier.highlight ? "text-gray-400" : "text-gray-400"}`}>{tier.period}</span>
                </div>
                <div className={`text-xs mb-6 ${tier.highlight ? "text-gray-400" : "text-gray-500"}`}>{tier.tagline}</div>

                {tier.upgradeReason && (
                  <div className="bg-orange-500/10 border border-orange-400/20 rounded-xl px-3 py-2 mb-5">
                    <p className={`text-xs font-semibold ${tier.highlight ? "text-orange-300" : "text-orange-600"}`}>
                      {tier.upgradeReason}
                    </p>
                  </div>
                )}

                <a
                  href={`${APP_URL}/sign-up`}
                  className={`block text-center py-3 px-4 rounded-xl font-bold text-sm transition-colors mb-6 ${tier.ctaStyle}`}
                >
                  {tier.cta}
                </a>

                <ul className="space-y-2.5 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-xs leading-relaxed ${tier.highlight ? "text-gray-300" : "text-gray-600"}`}>
                      <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${tier.highlight ? "text-orange-400" : "text-green-500"}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                {tier.locked.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200/20">
                    {tier.locked.map((f) => (
                      <div key={f} className="flex items-start gap-2 text-xs text-gray-400 mb-2 opacity-50">
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
            All paid plans include a 7-day free trial · Cancel anytime · Payments secured by Razorpay
          </p>
        </div>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────────── */}
      <section className="py-24 bg-gray-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wide mb-8">
            <Sparkles className="h-3.5 w-3.5" />
            Start free · No credit card needed
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Your Personalised Indian Meal Plan Is One Click Away
          </h2>

          <p className="text-lg text-gray-400 mb-4">
            Stop wondering what to cook. Stop Googling conflicting diet advice.
            Start eating food that actually works for your health — tonight.
          </p>

          <p className="text-sm text-gray-500 mb-10">
            Thousands of people with PCOS, Diabetes, and Thyroid are already eating better.
            Your plan is waiting.
          </p>

          <a
            href={`${APP_URL}/sign-up`}
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg transition-colors shadow-lg shadow-orange-900/30"
          >
            Fix My Diet in 2 Minutes <ArrowRight className="h-5 w-5" />
          </a>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
            {[
              "Free to start",
              "No credit card required",
              "90 seconds to your first plan",
              "Cancel anytime",
            ].map((t) => (
              <div key={t} className="flex items-center gap-2 text-xs text-gray-500">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
