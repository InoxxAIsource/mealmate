import { Link, useLocation } from "wouter";
import { Home, Calendar, ShoppingCart, User, Sandwich, Dumbbell } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetMyProfile } from "@workspace/api-client-react";
import { useLanguage } from "@/hooks/use-language";
import { t } from "@/lib/i18n";

export function BottomNav() {
  const [location] = useLocation();
  const { data: profile } = useGetMyProfile();
  const { lang } = useLanguage();
  const tx = t[lang];

  const track = profile?.primaryTrack;

  const BASE_ITEMS = [
    { name: tx.nav.home,    href: "/dashboard",          icon: Home },
    { name: tx.nav.week,    href: "/dashboard/week",     icon: Calendar },
    { name: tx.nav.grocery, href: "/dashboard/grocery",  icon: ShoppingCart },
    { name: tx.nav.profile, href: "/dashboard/profile",  icon: User },
  ];

  const KIDS_ITEMS = [
    { name: tx.nav.home,     href: "/dashboard",          icon: Home },
    { name: tx.nav.week,     href: "/dashboard/week",     icon: Calendar },
    { name: tx.nav.lunchBox, href: "/dashboard/lunchbox", icon: Sandwich },
    { name: tx.nav.grocery,  href: "/dashboard/grocery",  icon: ShoppingCart },
    { name: tx.nav.profile,  href: "/dashboard/profile",  icon: User },
  ];

  const FITNESS_ITEMS = [
    { name: tx.nav.home,    href: "/dashboard",          icon: Home },
    { name: tx.nav.week,    href: "/dashboard/week",     icon: Calendar },
    { name: tx.nav.fitness, href: "/dashboard/fitness",  icon: Dumbbell },
    { name: tx.nav.grocery, href: "/dashboard/grocery",  icon: ShoppingCart },
    { name: tx.nav.profile, href: "/dashboard/profile",  icon: User },
  ];

  const navItems = track === "kids" ? KIDS_ITEMS : track === "fitness" ? FITNESS_ITEMS : BASE_ITEMS;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border pb-safe">
      <div className="max-w-md mx-auto flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive =
            location === item.href ||
            (item.href !== "/dashboard" && location.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
              data-testid={`nav-${item.href.split("/").pop()}`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[9px] font-medium leading-none">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
