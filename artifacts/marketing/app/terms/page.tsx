import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Terms of Service | MealCoreAI" },
  description: "MealCoreAI's Terms of Service — the rules and conditions governing your use of our AI-powered Indian meal planning service.",
  alternates: { canonical: "https://mealcoreai.com/terms" },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-10">
          <Link href="/" className="hover:text-orange-600">Home</Link>
          <span>/</span>
          <span className="text-gray-800">Terms of Service</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: 2 May 2026</p>

        <div className="prose prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-a:text-orange-600">

          <p>These Terms of Service ("Terms") govern your access to and use of MealCoreAI ("Service"), operated by MealCoreAI ("we", "us", or "our"). By accessing or using MealCoreAI, you agree to be bound by these Terms.</p>

          <h2>1. Description of Service</h2>
          <p>MealCoreAI is an AI-powered meal planning platform that generates personalised Indian meal plans based on your health conditions, dietary preferences, and regional food preferences. The Service is provided for informational and educational purposes.</p>

          <div className="border border-amber-200 bg-amber-50 rounded-xl p-4 text-sm text-amber-800">
            <strong>Medical Disclaimer:</strong> MealCoreAI provides general nutrition guidance only. The meal plans and content on this platform are not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional or registered dietitian before making significant changes to your diet, especially if you have a diagnosed medical condition or are on medication.
          </div>

          <h2>2. Eligibility</h2>
          <p>You must be at least 18 years of age to create an account and use MealCoreAI. By using the Service, you represent that you are 18 or older and have the legal capacity to enter into these Terms.</p>

          <h2>3. Account Registration</h2>
          <p>To access personalised features, you must create an account. You agree to:</p>
          <ul>
            <li>Provide accurate, current, and complete information during registration.</li>
            <li>Keep your login credentials confidential and not share them with third parties.</li>
            <li>Notify us immediately of any unauthorised use of your account.</li>
          </ul>
          <p>You are responsible for all activity that occurs under your account.</p>

          <h2>4. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Service for any unlawful purpose or in violation of these Terms.</li>
            <li>Attempt to reverse-engineer, scrape, or extract data from the Service without permission.</li>
            <li>Submit false, misleading, or harmful content through the Service.</li>
            <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity.</li>
            <li>Use the Service in any way that could damage, disable, or impair it.</li>
          </ul>

          <h2>5. Subscription and Payment</h2>
          <p>MealCoreAI offers both free and paid subscription tiers. Paid subscriptions are billed on the cycle stated at the time of purchase (monthly or annual). By subscribing:</p>
          <ul>
            <li>You authorise us to charge your payment method on a recurring basis.</li>
            <li>You may cancel your subscription at any time; cancellation takes effect at the end of the current billing period.</li>
            <li>Refunds are handled in accordance with our refund policy available on request.</li>
          </ul>

          <h2>6. Intellectual Property</h2>
          <p>All content, features, and functionality on MealCoreAI — including text, graphics, meal plans, algorithms, and software — are owned by or licensed to MealCoreAI and protected by applicable intellectual property laws.</p>
          <p>You may use meal plans generated for you for personal, non-commercial purposes. You may not reproduce, distribute, or create derivative works from our content without written permission.</p>

          <h2>7. User Content</h2>
          <p>By submitting health information or preferences to generate meal plans, you grant MealCoreAI a limited, non-exclusive licence to process that information solely to provide the Service. We do not claim ownership of your personal health data.</p>

          <h2>8. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, MealCoreAI and its officers, employees, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Service, including but not limited to:</p>
          <ul>
            <li>Any health outcomes resulting from following meal plans generated by the Service.</li>
            <li>Loss of data, revenue, or profits.</li>
            <li>Any errors or inaccuracies in the content provided.</li>
          </ul>

          <h2>9. Termination</h2>
          <p>We may suspend or terminate your access to MealCoreAI at any time, with or without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason at our sole discretion.</p>
          <p>You may delete your account at any time. Upon termination, your right to use the Service ceases immediately.</p>

          <h2>10. Changes to Terms</h2>
          <p>We may update these Terms from time to time. We will notify you of material changes by email or by posting a notice on our website. Your continued use of the Service after changes take effect constitutes acceptance of the revised Terms.</p>

          <h2>11. Governing Law</h2>
          <p>These Terms are governed by the laws of India. Any disputes arising from these Terms or your use of the Service shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra, India.</p>

          <h2>12. Contact Us</h2>
          <p>For questions about these Terms, contact us at:</p>
          <ul>
            <li><strong>Contact form:</strong> <Link href="/about">mealcoreai.com/about</Link></li>
            <li><strong>In-app support:</strong> Available after signing in at <Link href="/app/sign-in">mealcoreai.com/app</Link></li>
          </ul>
        </div>
      </div>
    </main>
  );
}
