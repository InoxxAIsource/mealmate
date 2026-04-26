import type { Metadata } from "next";
import ConditionPage from "@/components/ConditionPage";

export const metadata: Metadata = {
  title: "Pregnancy Meal Plan India: Trimester-wise Indian Diet Chart | MealCoreAI",
  description:
    "Personalised Indian pregnancy meal plan with trimester-specific nutrition. Iron, folate, calcium, and DHA-rich meals. Free to start — ready in 90 seconds, no credit card.",
  alternates: { canonical: "https://mealcoreai.com/pregnancy-meal-plan" },
  openGraph: {
    title: "Pregnancy Meal Plan India: Trimester-wise Indian Diet Chart | MealCoreAI",
    description:
      "Personalised Indian pregnancy meal plan with trimester-specific nutrition. Iron, folate, calcium, and DHA-rich meals. Free to start.",
    url: "https://mealcoreai.com/pregnancy-meal-plan",
    images: [{ url: "/api/og?page=pregnancy-meal-plan", width: 1200, height: 630 }],
  },
};

const medicalWebPageLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Pregnancy Meal Plan India",
  description: "Personalised Indian pregnancy meal plan with trimester-specific nutrition for iron, folate, calcium, and DHA.",
  url: "https://mealcoreai.com/pregnancy-meal-plan",
  about: { "@type": "MedicalCondition", name: "Pregnancy" },
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
      name: "What should an Indian pregnant woman eat every day?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An Indian pregnant woman's daily diet should include at least one serving of dal or legumes for folate and protein, one green leafy vegetable for iron and folate, two servings of dairy for calcium, a seasonal fruit for vitamins, and a source of healthy fat. Ragi should replace some wheat rotis for superior calcium content. Sesame seeds (til) sprinkled on food provide extraordinary calcium.",
      },
    },
    {
      "@type": "Question",
      name: "How should my diet change each trimester in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "First trimester: focus on folate (spinach, rajma, dal), vitamin B12, and managing nausea with small frequent meals. Second trimester: increase iron intake dramatically — include dark leafy vegetables, dates, and ragi daily, paired with vitamin C for better absorption. Third trimester: increase calorie intake by 300-400 kcal, prioritise calcium for fetal bone mineralisation, include DHA-rich foods, and eat smaller more frequent meals.",
      },
    },
    {
      "@type": "Question",
      name: "Which Indian foods are highest in folate for pregnancy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best Indian folate sources are rajma and all kidney beans, chana and Bengal gram, masoor dal, fresh spinach and methi, drumstick leaves (moringa), broccoli, and fresh citrus fruits. Most doctors recommend a folic acid supplement (400-800mcg daily) before conception and through the first trimester because dietary folate absorption varies.",
      },
    },
    {
      "@type": "Question",
      name: "How can an Indian pregnant woman increase haemoglobin naturally?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To increase haemoglobin naturally: eat palak or methi daily, include dates and raisins as snacks, eat ragi-based foods, include drumstick in dal weekly, soak rajma and chana overnight, always pair iron-rich foods with vitamin C sources like lemon or amla, and avoid tea or coffee within one hour of meals. If haemoglobin is below 10, supplementation is usually medically necessary.",
      },
    },
    {
      "@type": "Question",
      name: "Which Indian foods should be completely avoided during pregnancy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Avoid during pregnancy: raw or unripe papaya, raw sprouts, street food with untreated water, unpasteurised dairy, raw or undercooked eggs and meat, high-mercury fish (shark, king mackerel), excessive liver, and more than 1-2 cups of chai or coffee daily. Alcohol has no safe level during pregnancy and should be completely avoided.",
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
          {
            day: "Day 4 (First Trimester)",
            breakfast: "Poha with peanuts + raisins + 1 glass milk (no tea)",
            lunch: "Dal tadka + ragi roti + methi sabzi + curd",
            snack: "Banana + 2 dates + a handful of almonds",
            dinner: "Palak khichdi + kadhi + pomegranate seeds",
          },
          {
            day: "Day 5 (Second Trimester)",
            breakfast: "Idli (3) with sambar + coconut chutney + 1 glass milk",
            lunch: "Rajma + brown rice + mixed vegetable sabzi + curd",
            snack: "Sweet potato chaat + 1 glass buttermilk",
            dinner: "Paneer bhurji + multigrain roti + salad",
          },
          {
            day: "Day 6 (Third Trimester)",
            breakfast: "Ragi idli with sambar + 1 glass warm milk",
            lunch: "Palak rice + moong dal + curd + salad",
            snack: "Til laddoo (1) + dates (3) + glass of milk",
            dinner: "Fish curry / soya chunks + jowar roti + lauki sabzi",
          },
          {
            day: "Day 7 (Third Trimester)",
            breakfast: "Oats porridge with chia seeds + dried fruits + milk",
            lunch: "Dal + wheat roti + drumstick leaves sabzi + curd",
            snack: "Amla chutney + multigrain crackers + walnuts",
            dinner: "Egg curry (2 eggs) / paneer + bajra roti + cucumber salad",
          },
        ]}
        whyIngredients={[
          {
            name: "Ragi (Finger Millet) — for Calcium",
            claim: "Ragi has more calcium per gram than milk. That's not marketing — it's nutritional fact. 100g of ragi contains around 344mg of calcium compared to 125mg in 100ml of milk. For Indian women who are lactose intolerant or find it hard to drink the volume of milk recommended during pregnancy, ragi is a genuinely practical solution. Ragi dosas, ragi roti, ragi porridge, ragi idli — the ways to eat it are almost endless. Starting a ragi habit in the second trimester is one of the most impactful dietary choices a pregnant Indian woman can make.",
            citation: "Source: Nutritive Value of Indian Foods, National Institute of Nutrition (NIN), ICMR, 2017.",
          },
          {
            name: "Palak (Spinach) — for Folate and Iron",
            claim: "Folate from food matters more in the first 28 days of pregnancy than almost any other nutrient — often before a woman even knows she is pregnant. Spinach is India's most accessible, affordable folate source. A regular serving of palak sabzi provides around 60mcg of folate. Paired with tomatoes or amla (for vitamin C which boosts iron absorption), a daily palak habit addresses two of the biggest pregnancy nutrition gaps simultaneously: folate deficiency and iron deficiency anaemia.",
            citation: "Source: Czeizel AE, Dudás I, New England Journal of Medicine, 1992; NIN India, 2017.",
          },
          {
            name: "Dates (Khajoor) — for Iron and Labour",
            claim: "Dates are a traditional pregnancy food in Indian and Middle Eastern cultures, and there's now clinical research supporting the practice. A study found that women who consumed 6 dates daily in the last 4 weeks of pregnancy had significantly shorter first stage of labour and higher cervical dilation on admission. Beyond labour benefits, dates are one of the most iron-dense sweet foods available — two or three dates a day provide meaningful iron alongside natural sugars that won't spike blood sugar the way refined sweets do.",
            citation: "Source: Al-Kuran O et al., Journal of Obstetrics and Gynaecology, 2011.",
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
          { title: "Pregnancy Nutrition in the First Trimester", slug: "blog/pregnancy-nutrition-first-trimester" },
          { title: "Healthy Indian Tiffin Ideas for Kids", slug: "blog/kids-healthy-tiffin-ideas" },
        ]}
        relatedPlans={[
          { title: "Kids Meal Plan India", slug: "kids-meal-plan" },
          { title: "PCOS Meal Plan for Indian Women", slug: "pcos-meal-plan" },
          { title: "Diabetes Meal Plan India", slug: "diabetes-meal-plan" },
        ]}
        currentPath="/pregnancy-meal-plan"
      />
    </>
  );
}
