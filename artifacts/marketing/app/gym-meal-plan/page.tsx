import type { Metadata } from "next";
import ConditionPage from "@/components/ConditionPage";

export const metadata: Metadata = {
  title: { absolute: "Gym Diet Plan India: 7-Day Indian Meal Plan for Muscle Gain & Fat Loss" },
  description:
    "Personalised gym diet plan using Indian food. Build muscle, lose fat, and fuel workouts with dal, paneer, eggs, and whole grains. Free 7-day Indian gym meal plan.",
  openGraph: {
    title: "Gym Diet Plan India: 7-Day Indian Meal Plan for Muscle Gain & Fat Loss",
    description:
      "Personalised gym diet plan using Indian food. Build muscle, lose fat, and fuel workouts with dal, paneer, eggs, and whole grains. Free 7-day Indian gym meal plan.",
    url: "https://mealcoreai.com/gym-meal-plan",
    type: "website",
    siteName: "MealCoreAI",
    locale: "en_IN",
    images: [{ url: "/api/og?page=gym-meal-plan", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://mealcoreai.com/gym-meal-plan",
    languages: {
      "en-IN": "https://mealcoreai.com/gym-meal-plan",
      "x-default": "https://mealcoreai.com/gym-meal-plan",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Gym Diet Plan India: 7-Day Indian Meal Plan for Muscle Gain & Fat Loss",
    description:
      "Personalised gym diet plan using Indian food. Build muscle, lose fat, and fuel workouts with dal, paneer, eggs, and whole grains. Free 7-day Indian gym meal plan.",
    images: ["/api/og?page=gym-meal-plan"],
  },
};

const webPageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Gym Diet Plan India: 7-Day Indian Meal Plan for Muscle Gain & Fat Loss",
  description:
    "Personalised gym diet plan for Indians using high-protein Indian food — dal, paneer, eggs, chicken — to build muscle and fuel workouts without giving up traditional meals.",
  url: "https://mealcoreai.com/gym-meal-plan",
  author: {
    "@type": "Person",
    name: "Dr. Priya Sharma",
    jobTitle: "Sports Nutritionist",
    url: "https://mealcoreai.com/about",
  },
  reviewedBy: {
    "@type": "Person",
    name: "Dr. Priya Sharma",
    jobTitle: "Sports Nutritionist",
  },
  dateModified: "2026-05-04",
  audience: { "@type": "Audience", audienceType: "Fitness Enthusiasts" },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much protein do I need per day for gym in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For muscle building, target 1.6–2.2 g of protein per kg of bodyweight per day. For a 70 kg Indian gym-goer that means 112–154 g protein daily. Indian food sources like chicken breast (31g/100g), paneer (18g/100g), moong dal (24g/100g dry), eggs (6g/egg), and soya chunks (52g/100g dry) make reaching this target achievable without supplements. Spread protein across 4–5 meals for best muscle protein synthesis.",
      },
    },
    {
      "@type": "Question",
      name: "Can I build muscle on a vegetarian Indian diet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. A vegetarian Indian gym diet can fully support muscle building when you combine complementary proteins and hit your daily protein target. Key sources: paneer, curd, low-fat milk, soya chunks, tofu, moong dal, rajma, chana, and eggs if you are eggetarian. Using a combination of dal + roti + curd at each meal provides a complete amino acid profile comparable to animal protein.",
      },
    },
    {
      "@type": "Question",
      name: "What should I eat before and after gym in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pre-workout (45–60 min before): 1 banana + 1 glass low-fat milk, or 2 jowar rotis + egg whites, or a small bowl of oats with curd. Post-workout (within 30 min): 2–3 boiled eggs + 1 banana, or paneer bhurji (100g) + 1 roti, or a glass of milk with a handful of roasted chana. The key is fast carbs + protein immediately after training to kickstart muscle recovery.",
      },
    },
    {
      "@type": "Question",
      name: "Is rice good or bad for gym?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rice is excellent fuel for gym-goers. White rice digests quickly and replenishes muscle glycogen effectively — making it an ideal post-workout carbohydrate. Eating rice with dal, chicken, or paneer after a workout provides both carbohydrates for glycogen and protein for muscle repair. The idea that rice is bad for gym is a myth — it is one of the most efficient training carbs available.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need protein powder on an Indian gym diet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not necessarily. Most Indian gym-goers can meet their protein targets with whole food if they plan correctly. Eating 4–5 high-protein meals using chicken, eggs, paneer, dal, and soya chunks covers 120–150 g protein without supplements. Protein powder is a convenient top-up when whole food is not practical — it is not a requirement. Start with optimising whole food first before adding supplements.",
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
      name: "Gym Diet Plan India",
      item: "https://mealcoreai.com/gym-meal-plan",
    },
  ],
};

export default function GymMealPlanPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ConditionPage
        condition="Gym & Fitness"
        emoji="💪"
        accentColour="violet"
        h1="Indian Gym Diet Plan: 7-Day Meal Plan for Muscle Gain & Fat Loss"
        intro="An Indian gym diet plan is not about giving up dal and roti — it is about making them work harder for your fitness goals. Traditional Indian ingredients are naturally rich in the protein, complex carbohydrates, and micronutrients that fuel training and muscle recovery. The problem is that most gym-goers either undereat protein or rely on expensive supplements when affordable whole-food options are sitting in their kitchen. MealCoreAI builds a personalised Indian gym meal plan around your track — whether you are bulking, cutting, or recomping — so every meal earns its place in your training programme."
        directAnswer="An Indian gym diet plan for muscle gain needs 1.6–2.2 g protein per kg bodyweight daily, spread across 4–5 meals. Key Indian protein sources: eggs (6g each), chicken breast (31g/100g), paneer (18g/100g), soya chunks (52g/100g dry), moong dal, and low-fat curd. Pair protein with complex carbs from jowar roti, brown rice, or oats before training and fast carbs from white rice or banana immediately after training for best results."
        keyFoods={[
          {
            name: "Eggs",
            benefit: "The most bioavailable protein source at 93% — 6g protein per egg, all essential amino acids, inexpensive, and fast to prepare for pre- or post-workout meals.",
          },
          {
            name: "Paneer (Low-Fat)",
            benefit: "18g protein and high calcium per 100g — slow-digesting casein protein ideal before sleep to support overnight muscle recovery.",
          },
          {
            name: "Soya Chunks",
            benefit: "52g protein per 100g dry weight — the highest plant protein available in Indian cooking. Cheap, versatile, and complete amino acid profile comparable to meat.",
          },
          {
            name: "Moong Dal and Chana",
            benefit: "24g protein per 100g dry, plus slow-digesting complex carbs that sustain energy through long training sessions without blood sugar crashes.",
          },
          {
            name: "Brown Rice or White Rice (Post-Workout)",
            benefit: "Rapidly replenishes muscle glycogen after training. White rice post-workout is ideal — fast-digesting carbs accelerate protein uptake into muscle tissue.",
          },
          {
            name: "Chicken Breast",
            benefit: "31g protein per 100g, extremely low fat — the gold-standard lean protein for muscle building. Easily paired with any Indian spice profile.",
          },
        ]}
        foodsToLimit={[
          {
            name: "Skipping Post-Workout Nutrition",
            reason: "The 30-minute window after training is when muscle protein synthesis is highest — skipping food here wastes the training stimulus.",
          },
          {
            name: "High-Fat Pre-Workout Meals",
            reason: "Fat slows gastric emptying, leaving you sluggish mid-workout. Keep pre-workout meals lean — protein + carbs, minimal fat.",
          },
          {
            name: "Excessive Cardio Without Extra Calories",
            reason: "Long cardio sessions without calorie compensation burns muscle alongside fat — counterproductive for gym-goers trying to maintain or build muscle.",
          },
          {
            name: "Deep-Fried Snacks Between Meals",
            reason: "Empty calories that displace protein in your daily target. Replace samosas and biscuits with boiled eggs, roasted chana, or curd.",
          },
          {
            name: "Training Fasted (Without Any Fuel)",
            reason: "True fasted training accelerates muscle protein breakdown — have at least a banana and a glass of milk before morning sessions.",
          },
          {
            name: "Relying Solely on Protein Supplements",
            reason: "Whole food protein sources carry fibre, micronutrients, and creatine (in meat) that isolated supplements lack. Build your diet around whole foods first.",
          },
        ]}
        samplePlan={[
          {
            day: "Day 1 — Push Day",
            breakfast: "4 egg whites + 1 whole egg scramble + 2 jowar rotis + green tea",
            lunch: "Chicken breast (150g) curry + brown rice (1 cup) + cucumber salad",
            snack: "1 banana + 1 glass low-fat milk (pre-workout fuel)",
            dinner: "Paneer bhurji (150g low-fat) + 2 multigrain rotis + mixed vegetable sabzi + curd",
          },
          {
            day: "Day 2 — Pull Day",
            breakfast: "Moong dal chilla (4) with mint chutney + 2 boiled eggs",
            lunch: "Soya chunk curry + jowar roti (2) + rajma dal + raita",
            snack: "Roasted chana (50g) + 1 apple (post-workout recovery)",
            dinner: "Grilled fish (150g) or paneer tikka + brown rice + palak sabzi",
          },
          {
            day: "Day 3 — Leg Day",
            breakfast: "Oats porridge with low-fat milk + 2 boiled eggs + 1 banana",
            lunch: "Chicken keema (150g) + 2 rotis + dal tadka + curd",
            snack: "Peanut butter (1 tbsp) + 1 banana (pre-leg session carb load)",
            dinner: "Rajma (large bowl) + brown rice + cucumber-tomato salad",
          },
          {
            day: "Day 4 — Rest Day",
            breakfast: "Besan cheela (3) + curd + green tea",
            lunch: "Chana masala + jowar roti (2) + mixed sabzi + buttermilk",
            snack: "Low-fat curd with honey + 10 almonds",
            dinner: "Moong dal khichdi + roasted papad + salad",
          },
          {
            day: "Day 5 — Push Day",
            breakfast: "3 boiled eggs + 2 jowar rotis + tomato slices",
            lunch: "Tofu or paneer stir-fry + brown rice + dal soup",
            snack: "1 banana + handful of roasted peanuts (pre-workout)",
            dinner: "Egg curry (3 eggs) + 2 rotis + bhindi sabzi + curd",
          },
          {
            day: "Day 6 — Pull Day",
            breakfast: "Daliya (broken wheat) upma with vegetables + 2 eggs + milk",
            lunch: "Chicken breast (180g) + dal makhani (small portion) + roti (2)",
            snack: "Sprouts chaat + lemon + 1 boiled egg (post-workout)",
            dinner: "Soya chunk pulao + raita + mixed salad",
          },
          {
            day: "Day 7 — Active Recovery",
            breakfast: "Ragi porridge with cinnamon + low-fat milk + 10 almonds",
            lunch: "Paneer palak + jowar roti (2) + cucumber raita",
            snack: "Low-fat curd (200g) with flaxseeds",
            dinner: "Moong dal soup + 1 roti + grilled vegetables + small curd bowl",
          },
        ]}
        whyIngredients={[
          {
            name: "Eggs — Complete Protein for Indian Gym-Goers",
            claim: "Eggs score 100 on the Protein Digestibility-Corrected Amino Acid Score (PDCAAS) — the highest rating a food can achieve. One egg provides all 9 essential amino acids needed for muscle protein synthesis. At Rs 6–8 per egg in India, they are the most cost-effective complete protein available — significantly cheaper per gram of protein than any supplement. Research consistently shows that whole egg consumption after resistance training produces 40% greater muscle protein synthesis than equivalent egg white consumption, meaning the yolk's leucine and micronutrients actively contribute to muscle building beyond just the protein content.",
            citation: "Source: Volek JS et al., Journal of the American College of Nutrition, 2013.",
            citationUrl: "https://pubmed.ncbi.nlm.nih.gov/23451843/",
          },
          {
            name: "Soya Chunks — The Vegetarian Muscle Builder",
            claim: "Soya chunks (meal maker) contain 52g protein per 100g dry weight — comparable to lean chicken breast. More importantly, soy protein is the only plant protein with a PDCAAS of 1.0 (equivalent to meat and eggs), meaning it contains all essential amino acids in sufficient quantities for muscle building. Research on resistance-trained vegetarians shows that soy protein supplementation produces equivalent lean mass gains to whey protein when total protein intake is matched. At Rs 80–120 per kg, soya chunks are the most affordable complete plant protein in the Indian market.",
            citation: "Source: Tang JE et al., Journal of Applied Physiology, 2009.",
            citationUrl: "https://pubmed.ncbi.nlm.nih.gov/19589961/",
          },
          {
            name: "Carbohydrate Timing Around Training",
            claim: "Muscle glycogen — the stored form of carbohydrate — is the primary fuel for resistance training above moderate intensity. Studies show that training with depleted glycogen reduces total workout volume by 15–25%, directly limiting muscle-building stimulus. Consuming 1g of carbohydrate per kg bodyweight (fast-digesting: banana, white rice, or roti) within 30 minutes after training accelerates glycogen resynthesis by 300% compared to fasted recovery. For a 70 kg Indian gym-goer, that is 70g carbs post-workout — roughly 1 cup white rice + 1 banana — the exact post-workout meal structure used in MealCoreAI's gym track.",
            citation: "Source: Ivy JL et al., Journal of Applied Physiology, 1988.",
            citationUrl: "https://pubmed.ncbi.nlm.nih.gov/3132449/",
          },
        ]}
        faqs={[
          {
            q: "How much protein do I need per day for gym in India?",
            a: "For muscle building, target 1.6–2.2 g of protein per kg of bodyweight per day. For a 70 kg Indian gym-goer that means 112–154 g protein daily. Indian food sources like chicken breast (31g/100g), paneer (18g/100g), moong dal (24g/100g dry), eggs (6g/egg), and soya chunks (52g/100g dry) make reaching this target achievable without supplements. Spread protein across 4–5 meals for best muscle protein synthesis.",
          },
          {
            q: "Can I build muscle on a vegetarian Indian diet?",
            a: "Yes. A vegetarian Indian gym diet can fully support muscle building when you combine complementary proteins and hit your daily protein target. Key sources: paneer, curd, low-fat milk, soya chunks, tofu, moong dal, rajma, chana, and eggs if you are eggetarian. Using a combination of dal + roti + curd at each meal provides a complete amino acid profile comparable to animal protein.",
          },
          {
            q: "What should I eat before and after gym in India?",
            a: "Pre-workout (45–60 min before): 1 banana + 1 glass low-fat milk, or 2 jowar rotis + egg whites, or a small bowl of oats with curd. Post-workout (within 30 min): 2–3 boiled eggs + 1 banana, or paneer bhurji (100g) + 1 roti, or a glass of milk with a handful of roasted chana. The key is fast carbs + protein immediately after training to kickstart muscle recovery.",
          },
          {
            q: "Is rice good or bad for gym?",
            a: "Rice is excellent fuel for gym-goers. White rice digests quickly and replenishes muscle glycogen effectively — making it an ideal post-workout carbohydrate. Eating rice with dal, chicken, or paneer after a workout provides both carbohydrates for glycogen and protein for muscle repair. The idea that rice is bad for gym is a myth — it is one of the most efficient training carbs available.",
          },
          {
            q: "Do I need protein powder on an Indian gym diet?",
            a: "Not necessarily. Most Indian gym-goers can meet their protein targets with whole food if they plan correctly. Eating 4–5 high-protein meals using chicken, eggs, paneer, dal, and soya chunks covers 120–150 g protein without supplements. Protein powder is a convenient top-up when whole food is not practical — it is not a requirement. Start with optimising whole food first before adding supplements.",
          },
        ]}
        relatedPosts={[
          { title: "High-Protein Indian Breakfasts for Gym-Goers", slug: "blog/pcos-diet-plan-india" },
          { title: "Best Indian Foods for Muscle Gain", slug: "blog/indian-breakfast-weight-loss" },
          { title: "How to Track Protein on Indian Food", slug: "blog/calorie-deficit-indian-diet" },
        ]}
        relatedPlans={[
          { title: "Weight Loss Meal Plan for Indians", slug: "weight-loss-meal-plan" },
          { title: "Diabetes Meal Plan for Indians", slug: "diabetes-meal-plan" },
          { title: "Thyroid Diet Plan", slug: "thyroid-diet-plan" },
        ]}
        regionalPlans={{
          heading: "Indian Gym Meal Plans by Region",
          links: [
            { label: "South Indian Gym Diet Plan", href: "/meal-plans/fitness-meal-plan-south-indian" },
            { label: "North Indian Gym Diet Plan", href: "/meal-plans/fitness-meal-plan-north-indian" },
            { label: "Punjabi Gym Diet Plan", href: "/meal-plans/fitness-meal-plan-punjabi" },
          ],
        }}
        currentPath="/gym-meal-plan"
      />
    </>
  );
}
