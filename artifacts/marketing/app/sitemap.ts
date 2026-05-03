import { MetadataRoute } from "next";
import { conditions, regions, mealTypes, buildSlug } from "@/lib/seo-data";
import { blogPosts } from "@/lib/blog-data";

const BASE = "https://mealcoreai.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date("2026-04-22"), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE}/how-it-works`, lastModified: new Date("2026-04-10"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/pricing`, lastModified: new Date("2026-04-15"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: new Date("2026-04-22"), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/faq`, lastModified: new Date("2026-04-10"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/about`, lastModified: new Date("2026-04-10"), changeFrequency: "monthly", priority: 0.6 },
  ];

  const conditionPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/pcos-meal-plan`, lastModified: new Date("2026-05-02"), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/diabetes-meal-plan`, lastModified: new Date("2026-05-02"), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/thyroid-diet-plan`, lastModified: new Date("2026-05-02"), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/pregnancy-meal-plan`, lastModified: new Date("2026-05-02"), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/kids-meal-plan`, lastModified: new Date("2026-05-02"), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/cholesterol-diet-plan`, lastModified: new Date("2026-05-02"), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/weight-loss-meal-plan`, lastModified: new Date("2026-05-03"), changeFrequency: "weekly", priority: 0.9 },
  ];

  const prioritySlugs = [
    // SEO audit Task 14 — high-value regional pages
    "pcos-weekly-meal-plan-south-indian",
    "pcos-weekly-meal-plan-bengali",
    "pcos-weekly-meal-plan-punjabi",
    "pcos-weekly-meal-plan-maharashtrian",
    "diabetes-7-day-meal-plan-south-indian",
    "diabetes-7-day-meal-plan-punjabi",
    "diabetes-7-day-meal-plan-bengali",
    "thyroid-diet-plan-south-indian",
    "thyroid-diet-plan-north-indian",
    "weight-loss-meal-plan-south-indian",
    "weight-loss-meal-plan-north-indian",
    "pregnancy-meal-plan-south-indian",
    "pregnancy-meal-plan-north-indian",
    "kids-meal-plan-south-indian",
    "kids-meal-plan-north-indian",
    // Broken internal links from condition pages — urgent fix
    "cholesterol-weekly-meal-plan-south-indian",
    "cholesterol-weekly-meal-plan-north-indian",
    "cholesterol-weekly-meal-plan-gujarati",
    "thyroid-weekly-meal-plan-south-indian",
    "thyroid-weekly-meal-plan-north-indian",
    "thyroid-weekly-meal-plan-gujarati",
    "kids-weekly-meal-plan-south-indian",
    "kids-weekly-meal-plan-north-indian",
    "kids-weekly-meal-plan-gujarati",
    "kids-lunch-ideas-north-indian",
    "pregnancy-weekly-meal-plan-south-indian",
    "pregnancy-weekly-meal-plan-north-indian",
    "pregnancy-weekly-meal-plan-gujarati",
    "pregnancy-7-day-meal-plan-north-indian",
  ];

  const seen = new Set(prioritySlugs);
  const programmaticSlugs: string[] = [...prioritySlugs];
  for (const condition of conditions) {
    for (const mealType of mealTypes) {
      for (const region of regions) {
        if (programmaticSlugs.length >= 265) break;
        const slug = buildSlug(condition.id, mealType.id, region.id);
        if (!seen.has(slug)) {
          seen.add(slug);
          programmaticSlugs.push(slug);
        }
      }
      if (programmaticSlugs.length >= 265) break;
    }
    if (programmaticSlugs.length >= 265) break;
  }

  const PROGRAMMATIC_DATE = new Date("2026-04-22");
  const programmaticPages: MetadataRoute.Sitemap = programmaticSlugs.map((slug) => ({
    url: `${BASE}/meal-plans/${slug}`,
    lastModified: PROGRAMMATIC_DATE,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.publishDate),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...conditionPages, ...programmaticPages, ...blogPages];
}
