import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getRelatedLinks } from "@/lib/internal-links";

interface RelatedLinksProps {
  currentPath: string;
  heading?: string;
}

export function RelatedLinks({
  currentPath,
  heading = "Related Pages",
}: RelatedLinksProps) {
  const links = getRelatedLinks(currentPath);
  if (links.length === 0) return null;

  return (
    <section className="py-14 bg-orange-50/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-7">
          {heading}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className="group flex flex-col gap-2 p-5 bg-white border border-orange-100 rounded-2xl hover:border-orange-300 hover:shadow-md transition-all"
            >
              {link.title && (
                <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide">
                  {link.title}
                </span>
              )}
              <span className="text-sm font-medium text-gray-800 leading-snug group-hover:text-orange-700 transition-colors">
                {link.anchor}
              </span>
              <span className="flex items-center gap-1 text-orange-400 text-xs font-semibold mt-auto pt-1">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
