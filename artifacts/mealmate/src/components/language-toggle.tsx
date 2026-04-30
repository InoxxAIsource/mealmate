import { useLanguage } from "@/hooks/use-language";

export function LanguageToggle() {
  const { lang, toggle } = useLanguage();

  return (
    <button
      onClick={toggle}
      aria-label={lang === "en" ? "Switch to Hindi" : "Switch to English"}
      className="flex items-center gap-0.5 bg-muted hover:bg-muted/80 border border-border rounded-full px-2.5 py-1 transition-colors active:scale-95"
    >
      <span
        className={`text-xs font-bold transition-colors ${
          lang === "en" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        EN
      </span>
      <span className="text-xs text-muted-foreground mx-0.5">/</span>
      <span
        className={`text-xs font-bold transition-colors ${
          lang === "hi" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        हि
      </span>
    </button>
  );
}
