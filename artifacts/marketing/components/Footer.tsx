import Link from "next/link";

const APP_URL = "https://mealcoreai.com/app";

export default function Footer() {
  const links: Record<string, { label: string; href: string }[]> = {
    Product: [
      { label: "Features", href: "/#features" },
      { label: "Health Tracks", href: "/#tracks" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
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
              <a
                href="https://twitter.com/MealCoreAI"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow MealCoreAI on X (Twitter)"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-orange-500 flex items-center justify-center text-xs font-bold transition-colors"
              >
                𝕏
              </a>
              <a
                href="https://www.instagram.com/mealcoreai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow MealCoreAI on Instagram"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-orange-500 flex items-center justify-center text-xs font-bold transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
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
