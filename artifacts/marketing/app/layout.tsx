import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://mealcoreai.com"),
  title: {
    default: "MealCoreAI — AI Meal Planning for PCOS, Diabetes, Thyroid, Pregnancy & Kids",
    template: "%s | MealCoreAI",
  },
  description:
    "Control PCOS, Diabetes & Thyroid with a personalised daily Indian diet plan — built around your body, routine, and food preferences. Free to start in 90 seconds.",
  openGraph: {
    siteName: "MealCoreAI",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    site: "@MealCoreAI",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <Analytics />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
