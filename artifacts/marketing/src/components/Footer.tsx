const APP_URL = import.meta.env.VITE_APP_URL ?? "/mealmate/";

export default function Footer() {
  const links = {
    Product: [
      { label: "Features", href: "#features" },
      { label: "Health Tracks", href: "#tracks" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Get Started", href: APP_URL },
    ],
    Company: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
    "Health Tracks": [
      { label: "PCOS", href: "#tracks" },
      { label: "Diabetes", href: "#tracks" },
      { label: "Thyroid", href: "#tracks" },
      { label: "Pregnancy", href: "#tracks" },
    ],
  };

  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          <div className="md:col-span-2">
            <a href="#" className="inline-flex items-center gap-2.5 mb-4">
              <img src="./logo.svg" alt="MealCoreAI" className="h-8 w-8" />
              <span className="font-bold text-lg text-white">
                MealCore<span className="text-orange-500">AI</span>
              </span>
            </a>
            <p className="text-sm leading-relaxed max-w-xs">
              Health starts at your core. AI-powered personalised Indian meal plans built for your unique health journey.
            </p>
            <div className="flex gap-3 mt-5">
              {["🐦", "📘", "📸"].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-gray-800 hover:bg-orange-500 flex items-center justify-center text-sm transition-colors"
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
                    <a
                      href={item.href}
                      className="text-sm hover:text-orange-400 transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            © {new Date().getFullYear()} MealCoreAI. All rights reserved.
          </p>
          <p className="text-xs text-center text-gray-600 max-w-md">
            MealCoreAI provides general nutrition guidance and is not a substitute for professional medical advice. Always consult your healthcare provider before making dietary changes.
          </p>
        </div>
      </div>
    </footer>
  );
}
