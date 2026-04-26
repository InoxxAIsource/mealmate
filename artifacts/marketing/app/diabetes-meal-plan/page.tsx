import type { Metadata } from "next";
import ConditionPage from "@/components/ConditionPage";

export const metadata: Metadata = {
  title: "Diabetes Meal Plan India: 7-Day Indian Diabetic Diet Chart | MealCoreAI",
  description:
    "Personalised diabetic meal plan with low-GI Indian food for stable blood sugar. Evidence-based meals using millets, karela, and methi. Free to start — ready in 90 seconds.",
  alternates: { canonical: "https://mealcoreai.com/diabetes-meal-plan" },
  openGraph: {
    title: "Diabetes Meal Plan India: 7-Day Indian Diabetic Diet Chart | MealCoreAI",
    description:
      "Personalised diabetic meal plan with low-GI Indian food for stable blood sugar. Free to start — ready in 90 seconds.",
    url: "https://mealcoreai.com/diabetes-meal-plan",
    images: [{ url: "/api/og?page=diabetes-meal-plan", width: 1200, height: 630 }],
  },
};

const medicalWebPageLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Diabetes Meal Plan India",
  description: "Personalised diabetic meal plan with low-GI Indian food for stable blood sugar.",
  url: "https://mealcoreai.com/diabetes-meal-plan",
  about: { "@type": "MedicalCondition", name: "Diabetes Mellitus" },
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
  dateModified: "2026-04-26",
  medicalAudience: { "@type": "MedicalAudience", audienceType: "Patient" },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a good Indian diet for Type 2 Diabetes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A good Indian diet for Type 2 Diabetes centres on low-GI whole grains — ragi, jowar, bajra, and brown rice — instead of white rice and maida. Every meal should include a fibre source, a protein source, and a healthy fat. Indian vegetables like karela, methi, and palak have specific anti-diabetic properties worth including regularly.",
      },
    },
    {
      "@type": "Question",
      name: "Can a diabetic eat rice in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, a diabetic can eat rice in moderation. Choose lower-GI varieties — brown rice, red rice, or hand-pounded rice — and keep portions to a small cup. Always pair rice with dal, a protein, and plenty of vegetables rather than eating it plain.",
      },
    },
    {
      "@type": "Question",
      name: "How many rotis can a diabetic eat per day?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A diabetic can typically eat 4-6 rotis per day depending on their calorie needs and activity level. The more important factor is the type of roti — jowar, bajra, or ragi rotis have a significantly lower glycaemic impact than wheat rotis. Each roti should be paired with dal or a protein-rich sabzi.",
      },
    },
    {
      "@type": "Question",
      name: "Which Indian fruits are safe for diabetics?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Diabetics can safely eat jamun, guava, amla, papaya, apple, pear, and orange in appropriate portions. Jamun is particularly beneficial — its jamboline compound specifically reduces blood glucose. Fruits to limit include mango, grapes, chikoo, banana, and pineapple. Eat fruit as a snack between meals, never as juice.",
      },
    },
    {
      "@type": "Question",
      name: "What should a diabetic eat for breakfast in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best Indian diabetic breakfast is high in fibre and protein with minimal refined carbohydrates. Top options include ragi dosa or ragi upma with vegetables, methi paratha with curd, vegetable daliya with a boiled egg, or moong dal chilla with tomato chutney. Avoid starting the day with poha alone, white bread toast with jam, or sugary cereals.",
      },
    },
  ],
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://mealcoreai.com" },
    { "@type": "ListItem", position: 2, name: "Diabetic Meal Plan", item: "https://mealcoreai.com/diabetes-meal-plan" },
  ],
};

export default function DiabetesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalWebPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ConditionPage
        condition="Diabetes"
        emoji="💙"
        accentColour="teal"
        h1="Diabetic Meal Plan: Low-GI Indian Food for Stable Blood Sugar"
        intro="Managing diabetes with Indian food is not about restriction — it is about smart substitution. The right diabetic meal plan replaces high-GI white rice and maida with millets, legumes, and whole grains that release glucose slowly into the bloodstream. India's culinary heritage is full of diabetes-friendly ingredients: bitter gourd (karela), fenugreek (methi), cinnamon, amla, and moong dal have all shown measurable blood sugar benefits in clinical studies. The key principles are eating fibre at every meal, including protein alongside carbohydrates, choosing smaller and more frequent meals over large ones, and prioritising vegetables over starches. MealCoreAI's diabetes track generates personalised Indian meal plans that balance taste, tradition, and blood sugar control — giving you the specific dish names, portions, and timings that work for your body."
        keyFoods={[
          { name: "Ragi (Finger Millet)", benefit: "GI of 54 — far lower than rice. High in fibre and calcium. Keeps blood sugar stable for hours after eating." },
          { name: "Jowar (Sorghum)", benefit: "Complex carbohydrate with high fibre content that slows glucose absorption and improves post-meal blood sugar." },
          { name: "Bajra (Pearl Millet)", benefit: "Rich in magnesium which enhances insulin sensitivity. Traditional Indian millet perfect for rotis." },
          { name: "Karela (Bitter Gourd)", benefit: "Contains polypeptide-p and charantin that mimic insulin action and lower fasting blood glucose." },
          { name: "Methi Seeds (Fenugreek)", benefit: "Soluble fibre and galactomannan slow carbohydrate absorption. Soaking overnight maximises benefits." },
          { name: "Cinnamon (Dalchini)", benefit: "Bioactive compounds improve insulin sensitivity. Half a teaspoon daily in chai shows measurable HbA1c reduction." },
          { name: "Moong Dal", benefit: "Low-GI high-protein legume. The soluble fibre in moong stabilises blood sugar and reduces cholesterol." },
          { name: "Amla (Indian Gooseberry)", benefit: "Rich in chromium which regulates carbohydrate metabolism. Reduces post-meal glucose spikes significantly." },
        ]}
        foodsToLimit={[
          { name: "White Rice", reason: "GI of 64-72 causes rapid blood sugar spikes. Replace with brown rice, red rice, or millet-based dishes." },
          { name: "Maida Products", reason: "Refined flour in parathas, puris, and baked goods causes sharp glucose peaks and crashes." },
          { name: "Fruit Juices", reason: "Even fresh juices remove the fibre that moderates glucose absorption, causing rapid blood sugar spikes." },
          { name: "Potatoes (large portions)", reason: "High-starch vegetable with GI of 65-85. Small portions in mixed dishes are acceptable." },
          { name: "Sugar & Jaggery", reason: "Both raise blood glucose rapidly. Jaggery is slightly better than sugar but still needs strict limiting." },
          { name: "High-GI Fruits", reason: "Mangoes, grapes, chikoo, and bananas in large amounts spike blood sugar. Prefer guava, jamun, and berries." },
        ]}
        samplePlan={[
          {
            day: "Day 1",
            breakfast: "Ragi upma with vegetables + 1 boiled egg",
            lunch: "Jowar roti (2) + dal tadka + karela sabzi + curd",
            snack: "Handful of roasted chana + methi water",
            dinner: "Moong dal khichdi with spinach + cucumber raita",
          },
          {
            day: "Day 2",
            breakfast: "Methi paratha (1, whole wheat) + curd + amla chutney",
            lunch: "Brown rice (small portion) + rajma + sabzi + salad",
            snack: "Sprouts chaat with cucumber + lime",
            dinner: "Bajra roti (2) + palak paneer + onion salad",
          },
          {
            day: "Day 3",
            breakfast: "Vegetable daliya + cinnamon chai (no sugar)",
            lunch: "Multigrain roti + moong dal + mixed vegetable sabzi",
            snack: "1 guava or jamun + handful of walnuts",
            dinner: "Grilled fish / tofu + sautéed vegetables + small bowl of dal",
          },
          {
            day: "Day 4",
            breakfast: "Oats idli with sambar + cinnamon water",
            lunch: "Jowar roti (2) + dal fry + bitter gourd sabzi + curd",
            snack: "1 small guava + handful of walnuts",
            dinner: "Chana dal khichdi + methi sabzi + raita",
          },
          {
            day: "Day 5",
            breakfast: "Ragi porridge (no sugar) + 1 boiled egg",
            lunch: "Brown rice (small portion) + sambar + stir-fried beans",
            snack: "Sprouts chaat with lemon + cucumber",
            dinner: "Fish / paneer tikka + palak dal + bajra roti",
          },
          {
            day: "Day 6",
            breakfast: "Pesarattu (2) + tomato chutney + glass buttermilk",
            lunch: "Foxtail millet pongal + sambar + stir-fried okra",
            snack: "Handful of roasted chana + 1 amla",
            dinner: "Soya sabzi + jowar roti + onion salad",
          },
          {
            day: "Day 7",
            breakfast: "Methi thepla (2, whole wheat + bajra) + curd",
            lunch: "Multigrain roti + rajma (small portion) + salad",
            snack: "Cucumber + carrot sticks + peanut hummus",
            dinner: "Moong dal khichdi + stir-fried vegetables + raita",
          },
        ]}
        whyIngredients={[
          {
            name: "Karela (Bitter Gourd)",
            claim: "Bitter gourd is genuinely medicinal for diabetics — not just good for you in a general sense. It contains polypeptide-p, a plant-based compound that directly mimics insulin action in the body. It also contains charantin which activates glucose uptake in muscle cells. Eating karela sabzi twice a week consistently reduces fasting blood glucose levels. If you can tolerate the taste, a small glass of fresh karela juice 30 minutes before meals is one of the most evidence-backed dietary interventions available.",
            citation: "Source: Ahmad N et al., Phytomedicine, 1999; Grover JK, Yadav S, Pharmacological Research, 2004.",
          },
          {
            name: "Methi Seeds (Fenugreek)",
            claim: "Soak a teaspoon of methi seeds overnight in water and drink it on an empty stomach first thing in the morning. It sounds too simple to work. But this one habit — confirmed in multiple clinical trials — reduces post-meal blood sugar by 14-15% and lowers HbA1c over 3 months. The soluble fibre galactomannan in methi forms a gel in the gut that physically slows carbohydrate absorption. You can also mix methi seed powder into your roti dough.",
            citation: "Source: Raghuram TC et al., Nutrition Research, 1994.",
          },
          {
            name: "Ragi (Finger Millet)",
            claim: "White rice has a glycaemic index of 72. Ragi's is 54. That 18-point difference translates to meaningfully lower blood sugar after every meal you swap rice for ragi. And ragi isn't a compromise — it makes excellent dosas, idlis, roti, porridge, and mudde. The fibre content in ragi also slows the rate of glucose entry into the blood independently of its GI. If you can make one grain switch this month, make it ragi.",
            citation: "Source: Shobana S et al., Journal of the Science of Food and Agriculture, 2010.",
          },
        ]}
        faqs={[
          {
            q: "What is a good Indian diet for Type 2 Diabetes?",
            a: "A good Indian diet for Type 2 Diabetes centres on low-GI whole grains — ragi, jowar, bajra, and brown rice — instead of white rice and maida. Every meal should include a fibre source (vegetables, dal, or salad), a protein source (dal, paneer, eggs, or curd), and a healthy fat. Avoid eating carbohydrates alone. Indian vegetables like karela, methi, and palak have specific anti-diabetic properties worth including regularly. Eating 5-6 smaller meals instead of 3 large ones helps maintain steady glucose levels throughout the day. Regular meal timing is as important as food choice.",
          },
          {
            q: "Can a diabetic eat rice in India?",
            a: "Yes, a diabetic can eat rice in moderation with the right approach. The key is choosing lower-GI varieties — brown rice, red rice, or hand-pounded rice — and keeping portions to a small cup (uncooked: 30g). Always pair rice with dal, a protein, and plenty of vegetables rather than eating it plain. Cooling cooked rice before eating it increases resistant starch which further lowers the glycaemic impact. Many South Indian diabetics successfully manage blood sugar by eating a small portion of rice at lunch only, with millet-based dinners. If your blood sugar readings spike after rice regardless of portions, switching to millet rotis at every meal is the better choice.",
          },
          {
            q: "How many rotis can a diabetic eat per day?",
            a: "A diabetic can typically eat 4-6 rotis per day depending on their calorie needs, activity level, and how well they manage blood sugar. The more important factor is the type of roti — jowar, bajra, or ragi rotis have a significantly lower glycaemic impact than wheat rotis, and wheat rotis are far better than maida-based bread. Multigrain atta blends (wheat + ragi + jowar + flaxseeds) available in most Indian stores are an excellent practical compromise. Each roti should be paired with dal or a protein-rich sabzi, never eaten alone with just butter or pickle. Consult your doctor if you're on insulin, as portions need to match your insulin dose.",
          },
          {
            q: "Which Indian fruits are safe for diabetics?",
            a: "Diabetics can safely eat several Indian fruits in appropriate portions. Jamun (Indian blackberry) is particularly beneficial — its jamboline compound specifically reduces blood glucose. Guava has a low GI and high fibre content. Amla eaten raw or as juice significantly reduces post-meal glucose spikes. Papaya in small portions is acceptable. Apple, pear, and orange in medium portions are generally safe. Fruits to limit include mango, grapes, chikoo (sapota), banana, and pineapple which have higher sugar content. The key rule is to eat fruit as a snack between meals, never immediately after a meal, and never as juice which removes the blood-sugar-regulating fibre.",
          },
          {
            q: "What should a diabetic eat for breakfast in India?",
            a: "The best Indian diabetic breakfast is high in fibre and protein with minimal refined carbohydrates. Top options include: ragi dosa or ragi upma with vegetables; methi paratha (1-2 pieces) with a small bowl of curd; vegetable daliya (broken wheat) with a boiled egg; or moong dal chilla with tomato chutney. Avoid starting the day with poha alone, white bread toast with jam, or sugary cereals — these spike blood glucose before the day has started. Adding cinnamon to your morning chai (without sugar) and drinking a glass of methi water are two evidence-backed additions for morning blood sugar management. If you must have tea with milk, use skim milk and stevia or no sweetener.",
          },
        ]}
        relatedPosts={[
          { title: "Best Indian Breakfast Ideas for Diabetics", slug: "blog/diabetic-indian-breakfast-ideas" },
          { title: "Ragi Benefits for Diabetes Management", slug: "blog/ragi-benefits-diabetes" },
        ]}
        relatedPlans={[
          { title: "Cholesterol Diet Plan for Indians", slug: "cholesterol-diet-plan" },
          { title: "PCOS Meal Plan for Indian Women", slug: "pcos-meal-plan" },
          { title: "Thyroid Diet Plan India", slug: "thyroid-diet-plan" },
        ]}
        currentPath="/diabetes-meal-plan"
      />
    </>
  );
}
