import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/lib/blog-data";
import { RelatedLinks } from "@/components/seo/RelatedLinks";

const BASE = "https://mealcoreai.com";

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
  pcos: "🌸", diabetes: "🩺", thyroid: "🦋", pregnancy: "🤱",
  kids: "👶", cholesterol: "❤️", nutrition: "🥗", general: "🍱",
};

const CONDITION_LANDING: Record<string, { href: string; anchor: string; label: string }> = {
  pcos: {
    href: "/pcos-meal-plan",
    anchor: "personalised PCOS meal plan for Indian women",
    label: "PCOS Meal Plan",
  },
  diabetes: {
    href: "/diabetes-meal-plan",
    anchor: "AI diabetes meal plan for Indians",
    label: "Diabetes Meal Plan",
  },
  thyroid: {
    href: "/thyroid-diet-plan",
    anchor: "thyroid diet plan for Indian women",
    label: "Thyroid Diet Plan",
  },
  pregnancy: {
    href: "/pregnancy-meal-plan",
    anchor: "pregnancy meal plan by trimester",
    label: "Pregnancy Meal Plan",
  },
  kids: {
    href: "/kids-meal-plan",
    anchor: "healthy Indian kids meal plan",
    label: "Kids Meal Plan",
  },
  cholesterol: {
    href: "/cholesterol-diet-plan",
    anchor: "cholesterol diet plan for Indians",
    label: "Cholesterol Diet Plan",
  },
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Not Found" };

  const canonical = `${BASE}/blog/${slug}`;
  const ogImage = `${BASE}/api/og?title=${encodeURIComponent(post.title)}&condition=${post.category}`;

  return {
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: canonical,
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const relatedPosts = post.relatedSlugs
    .map((s) => blogPosts.find((p) => p.slug === s))
    .filter(Boolean);

  const conditionLink = CONDITION_LANDING[post.category];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: `${BASE}/api/og?title=${encodeURIComponent(post.title)}&condition=${post.category}`,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: "Nutritionist",
      url: `${BASE}/about`,
    },
    datePublished: post.publishDate,
    dateModified: "2026-04-26",
    publisher: {
      "@type": "Organization",
      name: "MealCoreAI",
      logo: { "@type": "ImageObject", url: `${BASE}/logo.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE}/blog/${post.slug}` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${BASE}/blog/${post.slug}` },
    ],
  };

  const encodedUrl = encodeURIComponent(`${BASE}/blog/${post.slug}`);
  const encodedTitle = encodeURIComponent(post.title);

  const publishedDate = new Date(post.publishDate).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="min-h-screen bg-white">
        <article className="max-w-3xl mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 flex-wrap">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-orange-600">Blog</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium line-clamp-1">{post.title}</span>
          </nav>

          <div className="flex items-center gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${CATEGORY_COLORS[post.category]}`}>
              {CATEGORY_EMOJIS[post.category]} {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
            </span>
            <span className="text-sm text-gray-400">{post.readTimeMin} min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-5">
            {post.title}
          </h1>

          {/* Author bio card — top (full HTML for Google E-E-A-T) */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl shrink-0" aria-hidden="true">
              👩‍⚕️
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-gray-900">{post.author}</h3>
              <p className="text-xs text-gray-500 mt-0.5">Nutritionist &amp; Dietitian | MealCoreAI Health Team</p>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                {post.author} is a certified nutritionist specialising in Indian dietary interventions for hormonal and metabolic health, with clinical experience across PCOS, diabetes, thyroid, and pregnancy nutrition.
              </p>
              <p className="text-xs text-green-600 font-medium mt-1">
                ✓ Reviewed on{" "}
                <time dateTime={post.publishDate}>{publishedDate}</time>
              </p>
            </div>
          </div>

          {/* Date + Share row */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
            <p className="text-xs text-gray-400">
              Published{" "}
              <time dateTime={post.publishDate}>{publishedDate}</time>
            </p>
            {/* Social Share */}
            <div className="flex items-center gap-2">
              <a
                href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center text-green-700 text-sm font-bold transition-colors"
                title="Share on WhatsApp"
              >
                W
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-sky-100 hover:bg-sky-200 rounded-full flex items-center justify-center text-sky-700 text-sm font-bold transition-colors"
                title="Share on Twitter"
              >
                𝕏
              </a>
            </div>
          </div>

          {/* Article content */}
          <div
            className="prose prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-table:text-sm"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Mid-article CTA */}
          <div className="my-10 bg-orange-50 border border-orange-200 rounded-3xl p-6 text-center">
            <p className="text-lg font-bold text-gray-900 mb-2">
              Stop searching — start eating right.
            </p>
            <p className="text-sm text-gray-600 mb-4">
              MealCoreAI builds your personalised weekly meal plan based on your condition,
              region, and food preferences. Free to start.
            </p>
            <a
              href="https://mealcoreai.com/app/sign-up"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-full text-sm transition-colors"
            >
              Get My Personalised Plan →
            </a>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 my-6">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                #{tag}
              </span>
            ))}
          </div>

          {/* Condition landing page CTA block */}
          {conditionLink && (
            <div className="my-8 border-2 border-orange-300 bg-orange-50 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <div className="text-2xl shrink-0" aria-hidden="true">🥗</div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">
                    Want a personalised {conditionLink.label.toLowerCase()} using Indian food?
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    MealCoreAI creates your daily plan in 90 seconds — free to start. Real Indian meals, personalised to your region, cook time, and preferences.
                  </p>
                  <Link
                    href={conditionLink.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-700 hover:text-orange-800 underline underline-offset-2"
                  >
                    Explore the{" "}
                    <span className="font-bold">{conditionLink.anchor}</span>
                    {" →"}
                  </Link>
                  <span className="mx-3 text-gray-300">|</span>
                  <a
                    href="https://mealcoreai.com/app/sign-up"
                    className="inline-flex items-center gap-1 text-sm font-bold bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition-colors"
                  >
                    Get My {conditionLink.label} Free →
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Author bio card — bottom */}
          <div className="bg-gray-50 rounded-3xl p-6 flex items-start gap-4 my-8">
            <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center text-2xl shrink-0" aria-hidden="true">
              👩‍⚕️
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">{post.author}</h3>
              <p className="text-xs text-gray-500 mb-2">Nutritionist &amp; Dietitian | MealCoreAI Health Team</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {post.author} is a certified nutritionist specialising in Indian dietary interventions for hormonal and metabolic health conditions. With 8+ years of clinical experience, she leads MealCoreAI&apos;s evidence-based nutrition content, translating complex research into practical Indian meal guidance.
              </p>
            </div>
          </div>
        </article>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-gray-50 border-t border-gray-100 py-12 px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-6">You might also like</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedPosts.map((related) => related && (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md hover:border-orange-200 transition-all"
                  >
                    <div className="h-28 bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center text-4xl">
                      {CATEGORY_EMOJIS[related.category]}
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-orange-700 transition-colors line-clamp-2">
                        {related.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{related.readTimeMin} min read</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related pages from link graph */}
        <RelatedLinks
          currentPath={`/blog/${post.slug}`}
          heading="Related Resources"
        />

        {/* End CTA */}
        <section className="bg-gradient-to-r from-orange-500 to-orange-400 py-12 px-4 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Ready to eat right for your health?</h2>
          <p className="text-orange-100 mb-6 max-w-md mx-auto">
            Get a personalised weekly meal plan with real Indian recipes tailored to your
            condition — free to start.
          </p>
          <a
            href="https://mealcoreai.com/app/sign-up"
            className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-8 py-3.5 rounded-full text-lg hover:bg-orange-50 transition-colors"
          >
            Start Free Today
          </a>
        </section>
      </main>
    </>
  );
}
