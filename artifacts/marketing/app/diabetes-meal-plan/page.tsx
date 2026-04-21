import type { Metadata } from "next";
import ConditionPage from "@/components/ConditionPage";

export const metadata: Metadata = {
  title: "Diabetic Meal Plan India — Low-GI Personalised Indian Plans | MealCoreAI",
  description:
    "Personalised Indian diabetic meal plan with low-GI foods for stable blood sugar. Includes sample plan, key foods, and AI-generated weekly menus. Free to start.",
  alternates: { canonical: "https://mealcoreai.com/diabetes-meal-plan" },
  openGraph: {
    title: "Diabetic Meal Plan India — Low-GI Indian Plans | MealCoreAI",
    description: "Low-GI Indian meal plans for Type 2 Diabetes. Stable blood sugar, delicious food.",
    url: "https://mealcoreai.com/diabetes-meal-plan",
    images: [{ url: "/api/og?page=diabetes-meal-plan" }],
  },
};

const medicalWebPageLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Diabetic Meal Plan India",
  description: "Evidence-based Indian meal planning guide for Type 1 and Type 2 Diabetes management.",
  url: "https://mealcoreai.com/diabetes-meal-plan",
  about: { "@type": "MedicalCondition", name: "Diabetes Mellitus" },
  audience: { "@type": "MedicalAudience", audienceType: "Patient" },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a good Indian diet for diabetes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A good Indian diet for diabetes prioritises low-GI whole grains like ragi, jowar, and bajra over white rice and maida. Include plenty of fibre from vegetables, legumes, and salads. Eat protein with every meal — dal, eggs, paneer, or curd — to slow glucose absorption. Limit sugar, fruit juices, and refined carbs.",
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
          { title: "Low-GI Indian Recipes for Diabetics", slug: "blog/low-gi-indian-recipes" },
          { title: "Indian Millets: The Diabetic's Best Friend", slug: "blog/millets-for-diabetes" },
          { title: "Managing HbA1c with Indian Food", slug: "blog/hba1c-indian-diet" },
        ]}
        relatedPlans={[
          { title: "Cholesterol Diet Plan", slug: "cholesterol-diet-plan" },
          { title: "PCOS Meal Plan", slug: "pcos-meal-plan" },
          { title: "General Wellness Plan", slug: "#" },
        ]}
      />
    </>
  );
}
