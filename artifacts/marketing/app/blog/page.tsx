import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Health & Nutrition Blog for Indian Families | MealCoreAI",
  description:
    "Expert articles on PCOS, diabetes, thyroid, pregnancy nutrition, and kids' meals for Indian families. Evidence-based advice in Indian food context.",
  openGraph: {
    title: "Health & Nutrition Blog | MealCoreAI",
    images: [{ url: "https://mealcoreai.com/api/og?title=Nutrition+Blog&condition=general&accent=16a34a", width: 1200, height: 630 }],
  },
};

const CATEGORY_LABELS: Record<string, string> = {
  pcos: "PCOS",
  diabetes: "Diabetes",
  thyroid: "Thyroid",
  pregnancy: "Pregnancy",
  kids: "Kids",
  cholesterol: "Cholesterol",
  nutrition: "Nutrition",
  general: "General",
};

const CATEGORY_COLORS: Record<string, string> = {
  pcos: "bg-pink-100 text-pink-700",
  diabetes: "bg-blue-100 text-blue-700",
  thyroid: "bg-purple-100 text-purple-700",
  pregnancy: "bg-rose-100 text-rose-700",
  kids: "bg-amber-100 text-amber-700",
  cholesterol: "bg-red-100 text-red-700",
  nutrition: "bg-green-100 text-green-700",
  general: "bg-gray-100 text-gray-700",
};

const CATEGORY_EMOJIS: Record<string, string> = {
  pcos: "🌸",
  diabetes: "🩺",
  thyroid: "🦋",
  pregnancy: "🤱",
  kids: "👶",
  cholesterol: "❤️",
  nutrition: "🥗",
  general: "🍱",
};

export default function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const allCategories = Array.from(new Set(blogPosts.map((p) => p.category)));
  const pageSize = 12;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-50 to-white py-16 px-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Health & Nutrition Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Evidence-based nutrition advice for PCOS, diabetes, thyroid, pregnancy, and kids —
            all in the context of Indian food and culture.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          <Link
            href="/blog"
            className="shrink-0 px-4 py-1.5 rounded-full text-sm font-medium bg-orange-600 text-white"
          >
            All
          </Link>
          {allCategories.map((cat) => (
            <Link
              key={cat}
              href={`/blog?category=${cat}`}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border border-gray-200 hover:bg-orange-50 hover:border-orange-300 transition-colors ${CATEGORY_COLORS[cat]}`}
            >
              {CATEGORY_EMOJIS[cat]} {CATEGORY_LABELS[cat]}
            </Link>
          ))}
        </div>
      </section>

      {/* Posts grid */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-lg hover:border-orange-200 transition-all"
            >
              {/* Image placeholder with emoji */}
              <div className="h-44 bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center text-6xl">
                {CATEGORY_EMOJIS[post.category]}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${CATEGORY_COLORS[post.category]}`}
                  >
                    {CATEGORY_LABELS[post.category]}
                  </span>
                  <span className="text-xs text-gray-400">{post.readTimeMin} min read</span>
                </div>
                <h2 className="font-bold text-gray-900 text-lg leading-snug group-hover:text-orange-700 transition-colors mb-2 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-400">{post.author.split(",")[0]}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(post.publishDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-orange-50 border-t border-orange-100 py-12 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Ready for a plan built around your health?
        </h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          MealCoreAI translates this nutrition advice into a personalised weekly meal plan —
          with real Indian dish names and a grocery list.
        </p>
        <a
          href="https://mealcoreai.com/app/sign-up"
          className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-3.5 rounded-full text-lg transition-colors"
        >
          Start Free Today
        </a>
      </section>
    </main>
  );
}
