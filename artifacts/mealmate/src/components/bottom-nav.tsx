import { Link, useLocation } from "wouter";
import { Home, Calendar, ShoppingCart, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Week", href: "/dashboard/week", icon: Calendar },
    { name: "Grocery", href: "/dashboard/grocery", icon: ShoppingCart },
    { name: "Profile", href: "/dashboard/profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border pb-safe">
      <div className="max-w-md mx-auto flex items-center justify-around h-16 px-4">
        {navItems.map((item) => {
          const isActive = location === item.href || (item.href !== "/dashboard" && location.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
              data-testid={`nav-${item.name.toLowerCase()}`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
