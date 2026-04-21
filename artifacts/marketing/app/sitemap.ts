import { MetadataRoute } from "next";
import { conditions, regions, mealTypes, buildSlug } from "@/lib/seo-data";
import { blogPosts } from "@/lib/blog-data";

const BASE = "https://mealcoreai.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE}/how-it-works`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  const conditionPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/pcos-meal-plan`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/diabetes-meal-plan`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/thyroid-diet-plan`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/pregnancy-meal-plan`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/kids-meal-plan`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/cholesterol-diet-plan`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  ];

  // Top 250 programmatic pages
  const programmaticSlugs: string[] = [];
  for (const condition of conditions) {
    for (const mealType of mealTypes) {
      for (const region of regions) {
        if (programmaticSlugs.length >= 250) break;
        programmaticSlugs.push(buildSlug(condition.id, mealType.id, region.id));
      }
      if (programmaticSlugs.length >= 250) break;
    }
    if (programmaticSlugs.length >= 250) break;
  }

  const programmaticPages: MetadataRoute.Sitemap = programmaticSlugs.map((slug) => ({
    url: `${BASE}/meal-plans/${slug}`,
    lastModified: new Date(),
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
