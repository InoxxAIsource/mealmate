import type { Metadata } from "next";
import Link from "next/link";
import {
  MessageSquare,
  Sparkles,
  Clock,
  ShieldCheck,
  Zap,
  Brain,
  ChevronRight,
  CheckCircle2,
  HeartPulse,
  Baby,
  Droplets,
  Apple,
  Dumbbell,
  Flame,
  Star,
} from "lucide-react";

const BASE = "https://mealcoreai.com";
const APP_URL = `${BASE}/app`;

export const metadata: Metadata = {
  title: "AI Nutritionist Chat India – Free Diet Advice for PCOS, Diabetes & Thyroid",
  description:
    "Chat with MealCoreAI's AI nutritionist for instant, personalised Indian diet advice. Get answers for PCOS, diabetes, thyroid, pregnancy, kids nutrition — 24/7, free to start.",
  openGraph: {
    title: "AI Nutritionist Chat India – Free Personalised Diet Advice | MealCoreAI",
    description:
      "Ask anything about Indian food, health conditions, and nutrition. MealCoreAI's AI nutritionist gives personalised advice for PCOS, diabetes, thyroid, pregnancy, and more.",
    url: `${BASE}/ai-nutritionist`,
    type: "website",
    siteName: "MealCoreAI",
    locale: "en_IN",
    images: [{ url: `${BASE}/api/og?page=ai-nutritionist`, width: 1200, height: 630 }],
  },
  alternates: {
    canonical: `${BASE}/ai-nutritionist`,
    languages: {
      "en-IN": `${BASE}/ai-nutritionist`,
      "x-default": `${BASE}/ai-nutritionist`,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Nutritionist Chat India – Free Diet Advice | MealCoreAI",
    description:
      "Get personalised Indian nutrition advice for PCOS, diabetes, thyroid, pregnancy and more. Chat free with MealCoreAI.",
    images: [`${BASE}/api/og?page=ai-nutritionist`],
  },
};

const softwareAppLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MealCoreAI – AI Nutritionist Chat",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web, Android, iOS",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  description:
    "AI-powered nutritionist chat for personalised Indian diet advice covering PCOS, diabetes, thyroid, pregnancy, and children's nutrition.",
  url: `${BASE}/ai-nutritionist`,
  creator: { "@type": "Organization", name: "MealCoreAI", url: BASE },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is MealCoreAI's AI nutritionist free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The AI nutritionist chat is free to use after signing up. No credit card required.",
      },
    },
    {
      "@type": "Question",
      name: "Can I ask questions in Hindi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, MealCoreAI understands Hinglish and common Indian food names like methi, karela, ragi, and moong dal.",
      },
    },
    {
      "@type": "Question",
      name: "Is this a replacement for a human dietitian?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MealCoreAI's AI nutritionist provides personalised guidance based on your health condition and regional food preferences. For medical treatment decisions, always consult your doctor.",
      },
    },
    {
      "@type": "Question",
      name: "Which health conditions does the AI nutritionist cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PCOS, type 2 diabetes, hypothyroidism, pregnancy nutrition, children's nutrition, cholesterol, weight loss, and general fitness.",
      },
    },
    {
      "@type": "Question",
      name: "Does the AI know Indian regional foods?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The AI nutritionist is trained on North Indian, South Indian, Bengali, Gujarati, Punjabi, Maharashtrian, and 10+ other regional food traditions.",
      },
    },
    {
      "@type": "Question",
      name: "Can I ask about home remedies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. MealCoreAI covers traditional Indian home remedies and Ayurvedic food wisdom alongside modern nutrition science.",
      },
    },
  ],
};

const conditions = [
  {
    icon: Droplets,
    name: "PCOS",
    color: "bg-pink-50 border-pink-200",
    iconColor: "text-pink-500",
    sample: "What foods help balance PCOS hormones naturally?",
    answer:
      "For PCOS, focus on low-GI foods: ragi roti over maida, moong dal over chana dal, and adding methi seeds to your diet. Methi helps regulate insulin, which reduces androgen levels. Avoid refined sugar and processed foods…",
  },
  {
    icon: HeartPulse,
    name: "Diabetes",
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
    sample: "Which dal is best for diabetics?",
    answer:
      "Moong dal has the lowest glycaemic index of all dals (GI ~38). Masoor dal is also good. Both are high in protein and fibre, slowing glucose absorption. Avoid urad dal in large amounts as it has higher carbs…",
  },
  {
    icon: Brain,
    name: "Thyroid",
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-500",
    sample: "Can I eat soya if I have hypothyroidism?",
    answer:
      "Soya contains goitrogens that can interfere with thyroid hormone absorption. You can eat soya but avoid it within 4 hours of taking your levothyroxine. Fermented soy like miso is safer. Prioritise selenium-rich foods like sunflower seeds and Brazil nuts…",
  },
  {
    icon: Baby,
    name: "Pregnancy",
    color: "bg-yellow-50 border-yellow-200",
    iconColor: "text-yellow-600",
    sample: "Iron-rich vegetarian foods for second trimester?",
    answer:
      "Top iron sources: spinach (palak), horse gram (kulthi), rajma, black sesame (til), and moringa (drumstick leaves). Always eat them with vitamin C sources like lemon or amla to boost absorption. Avoid tea immediately after meals…",
  },
  {
    icon: Apple,
    name: "Kids Nutrition",
    color: "bg-orange-50 border-orange-200",
    iconColor: "text-orange-500",
    sample: "Healthy tiffin ideas for a 7-year-old picky eater?",
    answer:
      "Try mini besan cheela with hidden veggies, ragi laddoos for snack, or multigrain thepla with curd dip. Make it colourful — kids eat with their eyes. Avoid ultra-processed snacks and replace with roasted makhana or chikki…",
  },
  {
    icon: Flame,
    name: "Weight Loss",
    color: "bg-red-50 border-red-200",
    iconColor: "text-red-500",
    sample: "How to lose weight without giving up roti?",
    answer:
      "Switch to jowar, bajra, or ragi roti — all lower in calories and higher in fibre than wheat. Reduce portion to 2 rotis per meal and add a bowl of dal or sabzi. Eat your largest meal at lunch, not dinner…",
  },
];

const steps = [
  {
    num: "01",
    title: "Sign up free",
    desc: "Create your account in under a minute. No credit card needed.",
  },
  {
    num: "02",
    title: "Tell us your health track",
    desc: "Choose your condition — PCOS, diabetes, thyroid, pregnancy, or general health.",
  },
  {
    num: "03",
    title: "Start chatting",
    desc: "Ask anything about food, nutrition, home remedies, or your health condition. Get an instant personalised answer.",
  },
];

const features = [
  {
    icon: Clock,
    title: "Available 24/7",
    desc: "Ask at midnight about what to eat before a blood test. No waiting for appointments.",
  },
  {
    icon: Sparkles,
    title: "Knows Indian food deeply",
    desc: "Understands ragi, karela, methi, ashwagandha, and 500+ regional Indian ingredients.",
  },
  {
    icon: ShieldCheck,
    title: "Condition-specific answers",
    desc: "Not generic advice. Answers tailored to your PCOS, diabetes, thyroid, or pregnancy profile.",
  },
  {
    icon: Zap,
    title: "Instant responses",
    desc: "No waiting. No scheduling. Get a detailed, personalised answer in seconds.",
  },
  {
    icon: MessageSquare,
    title: "Hinglish-friendly",
    desc: "Ask in English, Hindi, or Hinglish. 'Kya methi thyroid ke liye achhi hai?' — we understand.",
  },
  {
    icon: Star,
    title: "Backed by nutrition science",
    desc: "Combines Ayurvedic wisdom with modern research. Evidence-based, culturally relevant.",
  },
];

const faqs = [
  {
    q: "Is MealCoreAI's AI nutritionist free?",
    a: "Yes. The AI nutritionist chat is completely free after signing up. No credit card required. Premium features like auto-generated weekly meal plans are available on paid plans.",
  },
  {
    q: "Can I ask questions in Hindi or Hinglish?",
    a: "Absolutely. MealCoreAI understands Hinglish and all common Indian food names — karela, methi, ragi, moong dal, ashwagandha, and more. Ask naturally.",
  },
  {
    q: "Is this a replacement for a human dietitian?",
    a: "MealCoreAI gives personalised guidance based on your condition and regional food preferences. For clinical treatment decisions or complex medical cases, always work with your doctor or registered dietitian.",
  },
  {
    q: "Which health conditions does the AI cover?",
    a: "PCOS, type 2 diabetes, hypothyroidism, pregnancy nutrition, children's nutrition, high cholesterol, weight management, and general fitness and immunity.",
  },
  {
    q: "Does the AI know my local regional foods?",
    a: "Yes. MealCoreAI is trained on North Indian, South Indian, Bengali, Gujarati, Punjabi, Maharashtrian, Rajasthani, Andhra, Kerala, and Tamil food traditions. It recommends foods you actually have in your kitchen.",
  },
  {
    q: "Can I ask about home remedies and Ayurveda?",
    a: "Yes. MealCoreAI covers traditional Indian home remedies and Ayurvedic food wisdom alongside modern nutrition science — giving you the best of both worlds.",
  },
];

export default function AINutritionistPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <main className="bg-white">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-white pt-28 pb-20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-orange-100/60 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-amber-100/50 blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Free AI Nutritionist · No Appointment Needed
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
              Your Personal AI Nutritionist
              <br />
              <span className="text-orange-500">for Indian Health</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Ask anything about PCOS, diabetes, thyroid, pregnancy, or kids nutrition — and get
              instant, personalised Indian diet advice. Available 24/7, completely free.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`${APP_URL}/sign-up`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-base shadow-lg shadow-orange-200 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                Chat with AI Nutritionist — Free
              </a>
              <a
                href={`${APP_URL}/sign-in`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-gray-200 text-gray-700 hover:border-orange-300 hover:text-orange-600 font-semibold text-base transition-all"
              >
                Already have an account? Sign in
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-gray-400 mt-4">No credit card · No app download · Works in browser</p>
          </div>
        </section>

        {/* Sample chat preview */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 -mt-8 mb-20">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-100 px-5 py-3 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <span className="ml-3 text-xs text-gray-400 font-medium">MealCoreAI – AI Nutritionist Chat</span>
            </div>
            <div className="px-5 py-5 space-y-4">
              <div className="flex justify-end">
                <div className="bg-orange-500 text-white text-sm rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-xs">
                  Is karela juice actually effective for diabetes?
                </div>
              </div>
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                </div>
                <div className="bg-gray-50 border border-gray-100 text-gray-700 text-sm rounded-2xl rounded-tl-sm px-4 py-3 max-w-sm">
                  <p className="font-semibold text-gray-800 mb-1">Yes — but with caveats.</p>
                  <p>Karela contains charantin and polypeptide-p, which mimic insulin and help lower blood sugar. Studies show 50–100 ml of fresh juice daily can reduce fasting glucose by 12–18%.</p>
                  <p className="mt-2 text-orange-600 font-medium">💡 Best time: 30 minutes before breakfast on an empty stomach.</p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-orange-500 text-white text-sm rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-xs">
                  What foods should I avoid completely?
                </div>
              </div>
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                </div>
                <div className="bg-gray-50 border border-gray-100 text-gray-700 text-sm rounded-2xl rounded-tl-sm px-4 py-3 max-w-sm">
                  For diabetes, avoid white rice, maida, sugary chai, packaged biscuits, and fruit juices. Swap to jowar roti, brown rice, and whole fruits instead…
                </div>
              </div>
            </div>
            <div className="border-t border-gray-100 px-5 py-3 flex items-center gap-3">
              <div className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-sm text-gray-400">
                Ask about your health condition…
              </div>
              <button className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-3">
              Start in 3 steps
            </h2>
            <p className="text-gray-500 text-center mb-12">
              No app download. No waiting room. Ready in under 2 minutes.
            </p>
            <div className="grid sm:grid-cols-3 gap-8">
              {steps.map((s) => (
                <div key={s.num} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 font-bold text-lg flex items-center justify-center mx-auto mb-4">
                    {s.num}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-500">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Condition-specific sample chats */}
        <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-3">
            Personalised answers for every condition
          </h2>
          <p className="text-gray-500 text-center mb-12">
            The AI nutritionist tailors every answer to your specific health track.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {conditions.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.name}
                  className={`rounded-2xl border p-5 flex flex-col gap-3 ${c.color}`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center ${c.iconColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-gray-900 text-sm">{c.name}</span>
                  </div>
                  <div className="bg-white/70 rounded-xl px-3 py-2.5 text-xs text-gray-600 font-medium italic">
                    "{c.sample}"
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{c.answer}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Features */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-3">
              Why MealCoreAI's AI nutritionist is different
            </h2>
            <p className="text-gray-500 text-center mb-12">
              Built specifically for Indian health conditions and Indian kitchens.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="bg-white rounded-xl p-5 border border-gray-100">
                    <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-orange-500" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1.5 text-sm">{f.title}</h3>
                    <p className="text-sm text-gray-500">{f.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* AI vs Dietitian comparison */}
        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-12">
            AI nutritionist vs traditional dietitian
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-6 py-4 font-semibold text-gray-600 w-2/5">Feature</th>
                  <th className="px-6 py-4 font-bold text-orange-600">MealCoreAI</th>
                  <th className="px-6 py-4 font-semibold text-gray-500">Traditional Dietitian</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Available", "24/7, instant", "By appointment"],
                  ["Cost", "Free to start", "₹500–₹2,000/session"],
                  ["Indian food knowledge", "Deep — 500+ regional ingredients", "Varies"],
                  ["Response time", "Under 5 seconds", "Hours to days"],
                  ["Condition coverage", "PCOS, diabetes, thyroid + more", "Often specialised"],
                  ["Language", "English + Hinglish", "Depends on practitioner"],
                  ["Medical treatment", "Not a substitute", "Clinical expertise"],
                ].map(([feature, ai, human], i) => (
                  <tr
                    key={feature}
                    className={`border-b border-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                  >
                    <td className="px-6 py-3.5 font-medium text-gray-700">{feature}</td>
                    <td className="px-6 py-3.5 text-center">
                      <span className="inline-flex items-center gap-1 text-orange-600 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        {ai}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-center text-gray-500">{human}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-12">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="bg-white rounded-xl border border-gray-100 p-5">
                  <h3 className="font-bold text-gray-900 mb-2 text-sm">{faq.q}</h3>
                  <p className="text-sm text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related links */}
        <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-base font-semibold text-gray-700 mb-4">Explore condition-specific meal plans</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "PCOS Meal Plan", href: "/pcos-meal-plan" },
              { label: "Diabetes Meal Plan", href: "/diabetes-meal-plan" },
              { label: "Thyroid Diet Plan", href: "/thyroid-diet-plan" },
              { label: "Pregnancy Meal Plan", href: "/pregnancy-meal-plan" },
              { label: "Kids Meal Plan", href: "/kids-meal-plan" },
              { label: "Weight Loss Meal Plan", href: "/weight-loss-meal-plan" },
              { label: "How It Works", href: "/how-it-works" },
              { label: "All Meal Plans", href: "/meal-plans" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-br from-orange-500 to-orange-600 py-20 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Chat with your AI nutritionist now
            </h2>
            <p className="text-orange-100 mb-8">
              Free to start. Personalised for your condition. Ready in 2 minutes.
            </p>
            <a
              href={`${APP_URL}/sign-up`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-orange-600 font-bold text-base hover:bg-orange-50 shadow-lg transition-all"
            >
              <MessageSquare className="w-5 h-5" />
              Start free — no credit card
            </a>
            <p className="text-orange-200 text-xs mt-4">
              Already have an account?{" "}
              <a href={`${APP_URL}/sign-in`} className="underline hover:text-white">
                Sign in
              </a>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
