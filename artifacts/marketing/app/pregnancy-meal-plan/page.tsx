import type { Metadata } from "next";
import ConditionPage from "@/components/ConditionPage";

export const metadata: Metadata = {
  title: "Pregnancy Meal Plan India — Trimester-wise Indian Nutrition | MealCoreAI",
  description:
    "Personalised Indian pregnancy meal plan with trimester-specific nutrition. Iron, folate, calcium, and DHA-rich Indian meals. Safe food list included. Free to start.",
  alternates: { canonical: "https://mealcoreai.com/pregnancy-meal-plan" },
  openGraph: {
    title: "Pregnancy Meal Plan India — Trimester-wise Nutrition | MealCoreAI",
    description: "Trimester-wise Indian pregnancy nutrition. Safe, delicious, and personalised.",
    url: "https://mealcoreai.com/pregnancy-meal-plan",
    images: [{ url: "/api/og?page=pregnancy-meal-plan" }],
  },
};

const medicalWebPageLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Pregnancy Meal Plan India",
  description: "Trimester-wise Indian meal planning guide for healthy pregnancy nutrition.",
  url: "https://mealcoreai.com/pregnancy-meal-plan",
  about: { "@type": "MedicalCondition", name: "Pregnancy" },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What should an Indian pregnant woman eat daily?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An Indian pregnant woman should eat dal daily for protein and folate, a green leafy vegetable (spinach or methi) for iron, dairy (milk or curd) for calcium, ragi or sesame for calcium, and a seasonal fruit for vitamins. Include ghee in moderation for fat-soluble vitamins. Avoid papaya, raw sprouts, and excessive caffeine.",
      },
    },
  ],
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://mealcoreai.com" },
    { "@type": "ListItem", position: 2, name: "Pregnancy Meal Plan", item: "https://mealcoreai.com/pregnancy-meal-plan" },
  ],
};

export default function PregnancyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalWebPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ConditionPage
        condition="Pregnancy"
        emoji="🤰"
        accentColour="orange"
        h1="Pregnancy Meal Plan: Trimester-wise Indian Nutrition Guide"
        intro="Pregnancy is one of the most nutritionally demanding periods of a woman's life — and one where Indian food, prepared thoughtfully, provides almost everything mother and baby need. The three critical nutrients most Indian pregnant women fall short on are iron, folate, and calcium. Anaemia affects over 50% of pregnant Indian women and is strongly associated with low birth weight. Folate in the first trimester is essential for neural tube development. Calcium from dairy, ragi, and til supports fetal bone development throughout pregnancy. DHA from fish (or walnuts and flaxseeds for vegetarians) supports fetal brain development. MealCoreAI's pregnancy track creates trimester-aware meal plans that adjust your nutrition focus as your pregnancy progresses — prioritising folate in the first trimester, iron and protein in the second, and energy density and calcium in the third — using Indian food you already love and trust."
        keyFoods={[
          { name: "Palak (Spinach)", benefit: "One of India's best sources of folate, iron, and calcium. Eat daily in sabzis, soups, or parathas." },
          { name: "Ragi (Finger Millet)", benefit: "Contains more calcium than milk per gram. Essential for fetal bone development and managing pregnancy anaemia." },
          { name: "Dates (Khajoor)", benefit: "Rich in iron and natural sugars for energy. Regular consumption in the third trimester is associated with shorter labour." },
          { name: "Rajma (Kidney Beans)", benefit: "High in folate, protein, and iron. One of the best plant-based folate sources in Indian cuisine." },
          { name: "Curd (Yogurt)", benefit: "Calcium, probiotics, and protein. Daily curd consumption supports gut health and calcium absorption during pregnancy." },
          { name: "Paneer", benefit: "High-protein, calcium-rich dairy that provides essential amino acids for fetal tissue development." },
          { name: "Til (Sesame Seeds)", benefit: "Extraordinary calcium density — 1 tablespoon of white sesame seeds contains more calcium than a glass of milk." },
          { name: "Sweet Potato", benefit: "Rich in beta-carotene (vitamin A precursor), potassium, and B6 — addresses the increased vitamin A needs of pregnancy." },
        ]}
        foodsToLimit={[
          { name: "Raw Papaya", reason: "Unripe papaya contains latex that can cause uterine contractions. Ripe papaya in small amounts is generally considered safe after the first trimester." },
          { name: "Raw Sprouts", reason: "Uncooked sprouts can harbour Listeria and Salmonella that pose serious pregnancy risks. Cook them thoroughly." },
          { name: "Excess Vitamin A (liver)", reason: "Very high preformed vitamin A (liver, liver pate) is teratogenic in large amounts. Indian gooseberry-based vitamin A is safe." },
          { name: "High-Mercury Fish", reason: "Large fish like shark and king mackerel accumulate mercury harmful to fetal brain development. Choose smaller fish." },
          { name: "Excess Caffeine", reason: "More than 200mg caffeine daily (about 2 cups of coffee) is associated with increased miscarriage risk. Limit chai frequency." },
          { name: "Unpasteurised Dairy", reason: "Raw milk and unaged soft cheeses may contain Listeria. Always use pasteurised dairy during pregnancy." },
        ]}
        samplePlan={[
          {
            day: "Day 1 (Second Trimester)",
            breakfast: "Palak paratha (2) + curd + 1 glass milk",
            lunch: "Brown rice + rajma + palak sabzi + salad",
            snack: "2 dates + walnuts (5) + 1 glass buttermilk",
            dinner: "Ragi roti + dal + drumstick sabzi + curd",
          },
          {
            day: "Day 2 (Second Trimester)",
            breakfast: "Ragi porridge with dates + milk",
            lunch: "Wheat roti + chana dal + methi sabzi + curd",
            snack: "Sweet potato chaat + sesame til laddoo (1)",
            dinner: "Paneer bhurji + multigrain roti + salad",
          },
          {
            day: "Day 3 (Third Trimester)",
            breakfast: "Egg bhurji (2 eggs) + multigrain toast + 1 glass milk",
            lunch: "Vegetable khichdi + kadhi + curd",
            snack: "Fruit chaat (banana + pomegranate) + a handful of pumpkin seeds",
            dinner: "Grilled fish / tofu + palak dal + roti",
          },
        ]}
        faqs={[
          {
            q: "What should an Indian pregnant woman eat every day?",
            a: "An Indian pregnant woman's daily diet should include: at least one serving of dal or legumes for folate and protein; one green leafy vegetable (palak, methi, or moringa) for iron and folate; two servings of dairy for calcium; a seasonal fruit for vitamins; and a source of healthy fat like ghee, walnuts, or coconut. Ragi should replace some wheat rotis for its superior calcium content. Sesame seeds (til) sprinkled on food provide extraordinary calcium. Eggs (if non-vegetarian) are ideal — they provide iodine, choline, protein, and DHA in one food. Moringa leaves, dried or fresh, are an underutilised pregnancy superfood rich in iron, calcium, and protein that deserves a daily place in Indian pregnancy diets.",
          },
          {
            q: "How should my diet change each trimester in India?",
            a: "In the first trimester (weeks 1-12), focus on folate (spinach, rajma, dal, lemon), vitamin B12 (dairy, eggs), and managing nausea with small frequent meals. Ginger chai, buttermilk, and bland foods like rice kanji work well. In the second trimester (weeks 13-26), increase iron intake dramatically — include dark leafy vegetables, dates, and ragi daily. Pair iron foods with vitamin C (amla, lemon, guava) for better absorption. Avoid tea and coffee within an hour of meals as they block iron absorption. In the third trimester (weeks 27-40), increase calorie intake by 300-400 kcal, prioritise calcium for fetal bone mineralisation (which accelerates), include DHA-rich foods (fish or walnuts), and eat smaller more frequent meals as the baby presses on the stomach.",
          },
          {
            q: "Which Indian foods are highest in folate for pregnancy?",
            a: "Folate is most critical in the first 28 days of pregnancy (often before a woman even knows she is pregnant), making it important for all women of reproductive age to eat folate-rich Indian foods regularly. The best Indian folate sources are: rajma and all kidney beans; chana and Bengal gram; masoor dal; fresh spinach and methi; drumstick leaves (moringa); broccoli and asparagus; and fresh orange and citrus fruits. Many of these are everyday Indian foods, making adequate folate intake achievable through diet. However, most doctors recommend a folic acid supplement (400-800mcg daily) before conception and through the first trimester because dietary folate absorption varies and the stakes are high.",
          },
          {
            q: "How can an Indian pregnant woman increase haemoglobin naturally?",
            a: "Iron deficiency anaemia affects more than half of Indian pregnant women and is the most common nutritional deficiency in Indian pregnancy. To increase haemoglobin naturally through Indian food: eat palak (spinach) or methi daily in sabzis; include dates and raisins as snacks; eat ragi-based foods regularly (ragi is iron-rich among grains); include drumstick in dal or sabzi weekly; soak rajma and chana overnight before cooking (reduces anti-nutrients that block iron absorption); always pair iron-rich foods with vitamin C sources like lemon, amla, or guava; cook in iron kadhai or pressure cooker (leaches beneficial iron into food); and strictly avoid drinking tea or coffee within one hour of meals. If haemoglobin is below 10, dietary changes alone are usually insufficient and iron supplementation is medically necessary.",
          },
          {
            q: "Which Indian foods should be completely avoided during pregnancy?",
            a: "The foods most important to avoid during Indian pregnancy are: raw or unripe papaya (contains latex that can stimulate contractions); raw sprouts of any kind (Listeria risk — cook them thoroughly); street food made with raw water or untreated ingredients (infection risk); unpasteurised dairy or unaged soft cheeses; raw or undercooked eggs and meat; high-mercury fish like shark, king mackerel, and swordfish; excessive liver consumption (too much preformed vitamin A); and more than 1-2 cups of chai or coffee daily. Pineapple in large quantities is sometimes advised against in early pregnancy (bromelain content), though moderate consumption of ripe pineapple is generally considered safe. Alcohol has no safe level during pregnancy and should be completely avoided.",
          },
        ]}
        relatedPosts={[
          { title: "Iron-Rich Indian Foods for Pregnancy Anaemia", slug: "blog/iron-foods-pregnancy" },
          { title: "Folate in Indian Food: A Complete Guide", slug: "blog/folate-indian-food-pregnancy" },
          { title: "First Trimester Nausea: Indian Remedies That Work", slug: "blog/morning-sickness-indian" },
        ]}
        relatedPlans={[
          { title: "Kids Meal Plan", slug: "kids-meal-plan" },
          { title: "General Wellness Plan", slug: "#" },
          { title: "PCOS Meal Plan", slug: "pcos-meal-plan" },
        ]}
        currentPath="/pregnancy-meal-plan"
      />
    </>
  );
}
