"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const APP_URL = "https://mealcoreai.com/app";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "/#features" },
    { label: "Health Tracks", href: "/#tracks" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Pricing", href: "/#pricing" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-white/95 backdrop-blur shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="MealCoreAI" className="h-8 w-8" />
            <span className="font-bold text-lg text-gray-900">
              MealCore<span className="text-orange-500">AI</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={`${APP_URL}/sign-in`}
              className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
            >
              Sign in
            </a>
            <a
              href={`${APP_URL}/sign-up`}
              className="inline-flex items-center px-4 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors shadow-sm"
            >
              Get started free
            </a>
          </div>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-orange-500"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2 px-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600"
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-3 flex flex-col gap-2 border-t border-gray-100 mt-3">
            <a
              href={`${APP_URL}/sign-in`}
              className="block text-center py-2.5 px-4 rounded-full border border-orange-200 text-orange-600 font-semibold text-sm"
            >
              Sign in
            </a>
            <a
              href={`${APP_URL}/sign-up`}
              className="block text-center py-2.5 px-4 rounded-full bg-orange-500 text-white font-semibold text-sm"
            >
              Get started free
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
