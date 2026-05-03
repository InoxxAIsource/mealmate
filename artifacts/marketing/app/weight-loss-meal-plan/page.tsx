import type { Metadata } from "next";
import ConditionPage from "@/components/ConditionPage";

export const metadata: Metadata = {
  title: { absolute: "Weight Loss Meal Plan for Indians: 7-Day Fat Loss Indian Diet" },
  description:
    "Personalised Indian weight loss meal plan using low-calorie, high-fibre Indian food. Lose weight without giving up roti, dal, and rice. Free 7-day plan.",
  alternates: { canonical: "https://mealcoreai.com/weight-loss-meal-plan" },
  openGraph: {
    title: "Weight Loss Meal Plan for Indians: 7-Day Fat Loss Diet with Indian Food",
    description:
      "Personalised Indian weight loss meal plan using low-calorie, high-fibre Indian food. Lose weight without giving up roti, dal, and rice. Free 7-day plan.",
    url: "https://mealcoreai.com/weight-loss-meal-plan",
    type: "website",
    images: [{ url: "/api/og?page=weight-loss-meal-plan", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Weight Loss Meal Plan for Indians: 7-Day Fat Loss Diet with Indian Food",
    description:
      "Personalised Indian weight loss meal plan using low-calorie, high-fibre Indian food. Lose weight without giving up roti, dal, and rice. Free 7-day plan.",
    images: ["/api/og?page=weight-loss-meal-plan"],
  },
};

const medicalWebPageLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Weight Loss Meal Plan for Indians",
  description:
    "Personalised Indian weight loss meal plan using low-calorie, high-fibre Indian food to achieve sustainable fat loss without eliminating traditional dishes.",
  url: "https://mealcoreai.com/weight-loss-meal-plan",
  about: { "@type": "MedicalCondition", name: "Obesity and Weight Management" },
  author: {
    "@type": "Person",
    name: "Dr. Priya Sharma",
    jobTitle: "Nutritionist",
    url: "https://mealcoreai.com/about",
  },
  reviewedBy: {
    "@type": "Person",
    name: "Dr. Priya Sharma",
    jobTitle: "Nutritionist",
  },
  dateModified: "2026-05-03",
  medicalAudience: { "@type": "MedicalAudience", audienceType: "Patient" },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can I lose weight eating Indian food?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Traditional Indian food — dal, sabzi, roti, curd — is naturally weight-loss-friendly when portions are managed correctly. The issue is not the cuisine but the quantity of grains, the timing of meals, and the addition of refined foods like maida and packaged snacks. A structured Indian weight loss meal plan maintains cultural food while creating a calorie deficit.",
      },
    },
    {
      "@type": "Question",
      name: "How many rotis should I eat per day to lose weight?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most Indian adults targeting weight loss, 2-3 small jowar or bajra rotis per meal is appropriate. The more important change is the ratio — make dal and sabzi the largest portion of your plate and reduce the grain portion. Eating dal and vegetables first before your roti naturally reduces how much grain you consume.",
      },
    },
    {
      "@type": "Question",
      name: "Should I give up rice to lose weight?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not necessarily. Rice can be included in an Indian weight loss plan if portion size is controlled and it is eaten with protein and fibre. Eating a small portion of rice after dal and sabzi — rather than rice as the main component — keeps blood sugar stable and total calorie intake lower. Brown rice or hand-pound rice provides more fibre.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best Indian breakfast for weight loss?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "High-protein, low-GI breakfasts work best for Indian weight loss. Besan cheela with mint chutney, moong dal chilla with curd, ragi dosa with sambar, or two boiled eggs with one jowar roti are all effective options. Eating breakfast within 30-45 minutes of waking prevents cortisol spikes that drive fat storage.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to lose weight on an Indian diet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With a consistent Indian weight loss meal plan — calorie deficit of 300-500 calories per day — most people lose 0.5-1 kg per week. Results are visible in 3-4 weeks. The advantage of using Indian food is sustainability — you are eating food you already know and enjoy, which makes long-term consistency far more achievable than Western diet plans.",
      },
    },
  ],
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://mealcoreai.com" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Weight Loss Meal Plan",
      item: "https://mealcoreai.com/weight-loss-meal-plan",
    },
  ],
};

export default function WeightLossPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalWebPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ConditionPage
        condition="Weight Loss"
        emoji="⚖️"
        accentColour="emerald"
        h1="Indian Weight Loss Meal Plan: Lose Weight Without Giving Up Indian Food"
        intro="Weight loss through Indian food focuses on calorie deficit without cultural food sacrifice. Traditional Indian ingredients — ragi, jowar, bajra, moong dal, leafy greens, and curd — are naturally weight-loss-friendly. The problem is portion size and meal timing, not the cuisine itself. MealCoreAI builds personalised weight loss meal plans around the Indian food you already eat, making fat loss sustainable rather than a temporary sacrifice."
        directAnswer="A weight loss meal plan for Indians works by reducing total calorie intake while keeping meals satisfying using high-fibre foods like dal, sabzi, and whole grains. The key is portion control — not eliminating roti or rice entirely. Replacing maida with jowar or bajra roti, eating dal before rice, and having dinner before 8 PM are the three changes that make the biggest difference."
        keyFoods={[
          {
            name: "Ragi and Jowar Rotis",
            benefit: "Fewer calories than wheat roti, significantly more fibre — keeps you full 30-40% longer and prevents mid-meal hunger.",
          },
          {
            name: "Moong Dal",
            benefit: "High protein, low calorie — reduces appetite between meals and supports muscle retention during fat loss.",
          },
          {
            name: "Sabzi-First Eating",
            benefit: "Eat vegetables and dal before your grain to naturally reduce total grain consumption without willpower.",
          },
          {
            name: "Curd and Chaas",
            benefit: "Probiotic, filling, and low calorie — supports gut health and reduces bloating common during calorie restriction.",
          },
          {
            name: "Methi Seeds (Soaked Overnight)",
            benefit: "Reduces appetite and stabilises blood sugar, cutting cravings between meals significantly.",
          },
          {
            name: "Green Tea or Jeera Water",
            benefit: "Replaces sugary chai — saves 100-150 calories per cup and supports metabolism naturally.",
          },
        ]}
        foodsToLimit={[
          {
            name: "Skipping Meals",
            reason: "Causes muscle loss and slows metabolism — the opposite of sustainable fat loss.",
          },
          {
            name: "Fruit Juice",
            reason: "Removes fibre, spikes blood sugar, and adds empty calories — whole fruit is always the better choice.",
          },
          {
            name: "Late Dinners (after 9 PM)",
            reason: "Insulin sensitivity is lowest at night — more calories get stored as fat when eaten late.",
          },
          {
            name: "Eliminating All Carbs",
            reason: "Unsustainable and culturally impractical — portion control is more effective and easier to maintain long-term.",
          },
          {
            name: "Maida-Based Foods",
            reason: "White flour rotis, naan, and bread digest rapidly, spike blood sugar, and contribute no satiety.",
          },
          {
            name: "Packaged Low-Fat Snacks",
            reason: "Often high in sugar to compensate for fat removal — read labels carefully before trusting health claims.",
          },
        ]}
        samplePlan={[
          {
            day: "Day 1",
            breakfast: "Moong dal chilla (3) with mint chutney + jeera water",
            lunch: "Jowar roti (2) + dal palak + cucumber raita",
            snack: "1 small apple + 10 roasted almonds",
            dinner: "Vegetable khichdi (moong dal + broken wheat) + steamed salad",
          },
          {
            day: "Day 2",
            breakfast: "Ragi dosa (2) with sambar + green tea",
            lunch: "Brown rice (small bowl) + rajma + mixed sabzi",
            snack: "Chaas (200ml) + 5 walnuts",
            dinner: "Bajra roti (2) + palak sabzi + curd",
          },
          {
            day: "Day 3",
            breakfast: "Besan cheela (3) with tomato chutney + methi seed water",
            lunch: "Bajra roti (2) + chana masala + lauki sabzi",
            snack: "Sprouts chaat with lemon + cucumber",
            dinner: "Moong dal soup + 1 jowar roti + sautéed greens",
          },
          {
            day: "Day 4",
            breakfast: "Daliya upma with vegetables + 2 boiled eggs",
            lunch: "Jowar roti (2) + dal tadka + bhindi sabzi + curd",
            snack: "Green tea + roasted makhana (small handful)",
            dinner: "Vegetable soup + paneer bhurji (low-oil) + salad",
          },
          {
            day: "Day 5",
            breakfast: "Poha with lots of vegetables + peanuts + lemon + jeera water",
            lunch: "Brown rice (small bowl) + sambar + beans poriyal + buttermilk",
            snack: "1 guava or seasonal fruit + 8 roasted chana",
            dinner: "Bajra khichdi + raita + cucumber-tomato salad",
          },
          {
            day: "Day 6",
            breakfast: "2 boiled eggs + 1 jowar roti + tomato slices",
            lunch: "Foxtail millet rice + moong dal + mixed vegetable sabzi",
            snack: "Chaas + soaked methi seeds water",
            dinner: "Palak soup + ragi roti (1) + curd",
          },
          {
            day: "Day 7",
            breakfast: "Ragi porridge with cinnamon + 5 almonds",
            lunch: "Bajra roti (2) + soya chunk curry + salad",
            snack: "Green tea + handful of roasted pumpkin seeds",
            dinner: "Moong dal soup + steamed vegetables + small curd bowl",
          },
        ]}
        whyIngredients={[
          {
            name: "Moong Dal",
            claim: "Moong dal is one of the best weight-loss proteins in the Indian kitchen. It is low in calories (roughly 100 kcal per 100g cooked), high in protein (7g per 100g), and digests slowly enough to keep you full for 3-4 hours. Studies show that increasing dietary protein by 25-30% of total calories reduces overall food intake by approximately 400 calories per day without conscious restriction. For Indian weight loss, replacing one high-carb meal with a moong dal-based meal is the single easiest calorie reduction.",
            citation: "Source: Weigle DS et al., American Journal of Clinical Nutrition, 2005.",
            citationUrl: "https://pubmed.ncbi.nlm.nih.gov/16002798/",
          },
          {
            name: "Jowar and Bajra Rotis",
            claim: "Jowar (sorghum) and bajra (pearl millet) rotis are 15-20% lower in calories than equivalent wheat rotis and contain significantly more fibre. A jowar roti provides roughly 60-65 kcal compared to 80-85 kcal for a standard wheat roti. More importantly, their higher fibre content slows gastric emptying — you feel full longer, eat less at the next meal, and reduce total daily calorie intake without tracking. Switching from wheat to millet rotis is the lowest-friction calorie reduction available in Indian cooking.",
            citation: "Source: National Institute of Nutrition (NIN), ICMR, Nutritive Value of Indian Foods, 2017.",
            citationUrl: "https://www.nin.res.in",
          },
          {
            name: "Curd (Dahi)",
            claim: "Curd is a near-perfect weight loss food for Indians. It is high in protein, low in calories, probiotic, and genuinely filling. Research shows that dietary calcium — abundant in curd — directly reduces fat cell synthesis and increases fat breakdown. A meta-analysis of dairy and weight loss found that high dairy consumption during calorie restriction led to 1.5x more fat loss than calorie restriction alone. Including 150-200g of curd with lunch and dinner satisfies dairy calcium needs while naturally reducing appetite.",
            citation: "Source: Zemel MB et al., Obesity Research, 2004.",
            citationUrl: "https://pubmed.ncbi.nlm.nih.gov/15090625/",
          },
        ]}
        faqs={[
          {
            q: "Can I lose weight eating Indian food?",
            a: "Yes. Traditional Indian food — dal, sabzi, roti, curd — is naturally weight-loss-friendly when portions are managed correctly. The issue is not the cuisine but the quantity of grains, the timing of meals, and the addition of refined foods like maida and packaged snacks. A structured Indian weight loss meal plan maintains cultural food while creating a calorie deficit.",
          },
          {
            q: "How many rotis should I eat per day to lose weight?",
            a: "For most Indian adults targeting weight loss, 2-3 small jowar or bajra rotis per meal is appropriate. The more important change is the ratio — make dal and sabzi the largest portion of your plate and reduce the grain portion. Eating dal and vegetables first before your roti naturally reduces how much grain you consume.",
          },
          {
            q: "Should I give up rice to lose weight?",
            a: "Not necessarily. Rice can be included in an Indian weight loss plan if portion size is controlled and it is eaten with protein and fibre. Eating a small portion of rice after dal and sabzi — rather than rice as the main component — keeps blood sugar stable and total calorie intake lower. Brown rice or hand-pound rice provides more fibre.",
          },
          {
            q: "What is the best Indian breakfast for weight loss?",
            a: "High-protein, low-GI breakfasts work best for Indian weight loss. Besan cheela with mint chutney, moong dal chilla with curd, ragi dosa with sambar, or two boiled eggs with one jowar roti are all effective options. Eating breakfast within 30-45 minutes of waking prevents cortisol spikes that drive fat storage.",
          },
          {
            q: "How long does it take to lose weight on an Indian diet?",
            a: "With a consistent Indian weight loss meal plan — calorie deficit of 300-500 calories per day — most people lose 0.5-1 kg per week. Results are visible in 3-4 weeks. The advantage of using Indian food is sustainability — you are eating food you already know and enjoy, which makes long-term consistency far more achievable than Western diet plans.",
          },
        ]}
        relatedPosts={[
          { title: "Best Indian Breakfast for Weight Loss", slug: "blog/indian-breakfast-weight-loss" },
          { title: "Calorie Deficit on Indian Food: A Practical Guide", slug: "blog/calorie-deficit-indian-diet" },
          { title: "Millet Benefits for Weight Management", slug: "blog/millet-benefits-pcos" },
        ]}
        relatedPlans={[
          { title: "Diabetes Meal Plan for Indians", slug: "diabetes-meal-plan" },
          { title: "Cholesterol Diet Plan", slug: "cholesterol-diet-plan" },
          { title: "PCOS Meal Plan for Indian Women", slug: "pcos-meal-plan" },
        ]}
        regionalPlans={{
          heading: "Weight Loss Meal Plans by Region",
          links: [
            { label: "South Indian Weight Loss Meal Plan", href: "/meal-plans/weight-loss-meal-plan-south-indian" },
            { label: "North Indian Weight Loss Meal Plan", href: "/meal-plans/weight-loss-meal-plan-north-indian" },
          ],
        }}
        currentPath="/weight-loss-meal-plan"
      />
    </>
  );
}
