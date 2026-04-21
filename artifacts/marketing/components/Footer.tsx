import Link from "next/link";

const APP_URL = "https://mealcoreai.com/app";

export default function Footer() {
  const links: Record<string, { label: string; href: string }[]> = {
    Product: [
      { label: "Features", href: "/#features" },
      { label: "Health Tracks", href: "/#tracks" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Pricing", href: "/#pricing" },
    ],
    "Condition Plans": [
      { label: "PCOS Meal Plan", href: "/pcos-meal-plan" },
      { label: "Diabetes Meal Plan", href: "/diabetes-meal-plan" },
      { label: "Thyroid Diet Plan", href: "/thyroid-diet-plan" },
      { label: "Pregnancy Meal Plan", href: "/pregnancy-meal-plan" },
      { label: "Kids Meal Plan", href: "/kids-meal-plan" },
      { label: "Cholesterol Diet Plan", href: "/cholesterol-diet-plan" },
    ],
    Company: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  };

  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="MealCoreAI" className="h-8 w-8" />
              <span className="font-bold text-lg text-white">
                MealCore<span className="text-orange-500">AI</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Health starts at your core. AI-powered personalised Indian meal plans built for your unique health journey.
            </p>
            <div className="flex gap-3 mt-5">
              {["𝕏", "f", "in"].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-gray-800 hover:bg-orange-500 flex items-center justify-center text-xs font-bold transition-colors"
                  aria-label="Social link"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
                {group}
              </p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm hover:text-orange-400 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">© {new Date().getFullYear()} MealCoreAI. All rights reserved.</p>
          <p className="text-xs text-center text-gray-600 max-w-md">
            MealCoreAI provides general nutrition guidance and is not a substitute for professional medical advice. Always consult your healthcare provider.
          </p>
        </div>
      </div>
    </footer>
  );
}
