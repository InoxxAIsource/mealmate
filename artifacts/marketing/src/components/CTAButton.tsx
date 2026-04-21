import { type ReactNode } from "react";

interface CTAButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

export default function CTAButton({
  children,
  href = "/mealmate/",
  variant = "primary",
  size = "md",
  className = "",
  onClick,
}: CTAButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variantClasses = {
    primary:
      "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-200 hover:shadow-orange-300",
    outline:
      "border-2 border-orange-500 text-orange-500 hover:bg-orange-50",
    ghost: "text-orange-500 hover:bg-orange-50",
  };

  const base = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (onClick) {
    return (
      <button className={base} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <a href={href} className={base}>
      {children}
    </a>
  );
}
