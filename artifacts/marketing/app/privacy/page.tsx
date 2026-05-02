import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | MealCoreAI" },
  description: "MealCoreAI's Privacy Policy — how we collect, use, and protect your personal information when you use our AI-powered meal planning service.",
  alternates: { canonical: "https://mealcoreai.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-10">
          <Link href="/" className="hover:text-orange-600">Home</Link>
          <span>/</span>
          <span className="text-gray-800">Privacy Policy</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: 2 May 2026</p>

        <div className="prose prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-a:text-orange-600">

          <p>MealCoreAI ("we", "us", or "our") is committed to protecting your personal information. This Privacy Policy explains what data we collect, how we use it, and your rights as a user of our AI-powered meal planning service at mealcoreai.com.</p>

          <h2>1. Information We Collect</h2>
          <p>When you use MealCoreAI, we may collect the following types of information:</p>
          <ul>
            <li><strong>Account information:</strong> Your name, email address, and password when you register.</li>
            <li><strong>Health and dietary information:</strong> Your health condition (e.g. PCOS, diabetes, thyroid), dietary preferences, regional food preferences, and any other information you provide to personalise your meal plan.</li>
            <li><strong>Usage data:</strong> Pages you visit, features you use, and interactions with your meal plans.</li>
            <li><strong>Device and technical data:</strong> IP address, browser type, operating system, and referring URLs, collected automatically via server logs and analytics tools.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Generate and personalise your AI meal plans based on your health conditions and preferences.</li>
            <li>Send you transactional emails (account confirmations, password resets).</li>
            <li>Improve and develop our product by analysing usage patterns in aggregate.</li>
            <li>Comply with legal obligations.</li>
          </ul>
          <p>We do not sell your personal data to third parties. We do not use your health information for advertising purposes.</p>

          <h2>3. Data Storage and Security</h2>
          <p>Your data is stored on secure servers. We implement industry-standard security measures including encryption in transit (HTTPS/TLS) and at rest. Access to your personal data is restricted to authorised personnel only.</p>
          <p>No method of transmission over the internet is 100% secure. While we take reasonable precautions, we cannot guarantee absolute security.</p>

          <h2>4. Cookies</h2>
          <p>We use essential cookies to maintain your session and remember your preferences. We may use analytics cookies (e.g. Google Analytics) to understand how users interact with our site. You can disable cookies in your browser settings; however, some features may not function correctly without them.</p>

          <h2>5. Third-Party Services</h2>
          <p>MealCoreAI may use third-party services including:</p>
          <ul>
            <li><strong>Analytics:</strong> Google Analytics for site usage analysis.</li>
            <li><strong>Payment processing:</strong> Secure payment providers for subscription billing. We do not store card details.</li>
            <li><strong>AI infrastructure:</strong> Cloud AI providers that process your inputs to generate meal plans. These providers are bound by data processing agreements.</li>
          </ul>

          <h2>6. Your Rights</h2>
          <p>Depending on your jurisdiction, you may have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you.</li>
            <li>Request correction or deletion of your data.</li>
            <li>Object to or restrict certain processing of your data.</li>
            <li>Request a portable copy of your data.</li>
          </ul>
          <p>To exercise any of these rights, please contact us at <strong>privacy@mealcoreai.com</strong>.</p>

          <h2>7. Data Retention</h2>
          <p>We retain your account and meal plan data for as long as your account is active. If you delete your account, we will delete your personal data within 30 days, except where retention is required by law.</p>

          <h2>8. Children&apos;s Privacy</h2>
          <p>MealCoreAI is not directed at children under 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us immediately.</p>

          <h2>9. Changes to This Policy</h2>
          <p>We may update this Privacy Policy periodically. We will notify you of material changes by email or by a notice on our website. Continued use of MealCoreAI after changes take effect constitutes acceptance of the updated policy.</p>

          <h2>10. Contact Us</h2>
          <p>For privacy-related questions or to exercise your rights, contact us at:</p>
          <ul>
            <li><strong>Email:</strong> privacy@mealcoreai.com</li>
            <li><strong>Website:</strong> <Link href="/">mealcoreai.com</Link></li>
          </ul>
        </div>
      </div>
    </main>
  );
}
