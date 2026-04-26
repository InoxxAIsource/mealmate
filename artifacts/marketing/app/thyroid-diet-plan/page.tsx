import type { Metadata } from "next";
import ConditionPage from "@/components/ConditionPage";

export const metadata: Metadata = {
  title: "Thyroid Diet Plan India: Hypothyroid Meal Plan for Indian Women | MealCoreAI",
  description:
    "Personalised thyroid diet plan with selenium, iodine, and zinc-rich Indian meals for hypothyroidism support. Free to start — your plan is ready in 90 seconds, no credit card.",
  alternates: { canonical: "https://mealcoreai.com/thyroid-diet-plan" },
  openGraph: {
    title: "Thyroid Diet Plan India: Hypothyroid Meal Plan for Indian Women | MealCoreAI",
    description:
      "Personalised thyroid diet plan with selenium, iodine, and zinc-rich Indian meals for hypothyroidism support. Free to start.",
    url: "https://mealcoreai.com/thyroid-diet-plan",
    images: [{ url: "/api/og?page=thyroid-diet-plan", width: 1200, height: 630 }],
  },
};

const medicalWebPageLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Thyroid Diet Plan India",
  description: "Personalised thyroid diet plan with selenium, iodine, and zinc-rich Indian meals for hypothyroidism support.",
  url: "https://mealcoreai.com/thyroid-diet-plan",
  about: { "@type": "MedicalCondition", name: "Thyroid Disorder" },
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
      name: "What foods are good for hypothyroidism in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For hypothyroidism, the most important dietary change is ensuring sufficient selenium, iodine, and zinc intake. In Indian meals this means including eggs regularly, using only iodised salt, eating dairy daily, including moong and masoor dal regularly for zinc, and adding a small handful of sunflower or pumpkin seeds daily. Anti-inflammatory spices like turmeric and ginger support thyroid health by reducing systemic inflammation.",
      },
    },
    {
      "@type": "Question",
      name: "Should hypothyroid patients avoid cabbage and cauliflower?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This is one of the most common thyroid diet myths in India. Raw cabbage and cauliflower contain goitrogens that can theoretically interfere with iodine uptake, but cooking destroys approximately 95% of goitrogenic compounds. This means a sabzi or stir-fry of these vegetables poses virtually no thyroid risk.",
      },
    },
    {
      "@type": "Question",
      name: "Does diet affect TSH levels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Diet alone does not directly control TSH levels the same way medication does, but nutritional deficiencies significantly worsen thyroid function. Selenium deficiency impairs T4 to T3 conversion. Iodine deficiency directly reduces thyroid hormone production. Zinc deficiency impairs hormone synthesis. Addressing these through food can measurably improve thyroid function markers over 3-6 months.",
      },
    },
    {
      "@type": "Question",
      name: "Can I eat rice if I have thyroid issues?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, rice is generally safe for thyroid patients. Thyroid disorders are not primarily about glycaemic control. The more important consideration is ensuring sufficient thyroid-supporting micronutrients. If you have hypothyroid-associated diabetes or insulin resistance, then the diabetic guidelines for rice apply. Otherwise, 1-2 cups of cooked rice per meal within an overall balanced diet is perfectly acceptable.",
      },
    },
    {
      "@type": "Question",
      name: "What Indian breakfast is best for thyroid patients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best thyroid breakfasts in India combine thyroid-supporting micronutrients. Egg-based breakfasts are ideal — egg bhurji or boiled eggs provide iodine, selenium, and zinc. Ragi or oats-based upma or porridge with milk provides calcium and energy. Adding sunflower seeds or pumpkin seeds to any breakfast significantly boosts selenium and zinc. The most important thyroid breakfast habit is taking levothyroxine first thing, at least 30-60 minutes before eating.",
      },
    },
  ],
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://mealcoreai.com" },
    { "@type": "ListItem", position: 2, name: "Thyroid Diet Plan", item: "https://mealcoreai.com/thyroid-diet-plan" },
  ],
};

export default function ThyroidPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalWebPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ConditionPage
        condition="Thyroid"
        emoji="🦋"
        accentColour="emerald"
        h1="Thyroid Diet Plan: Indian Foods That Support Thyroid Function"
        intro="The thyroid gland depends on specific micronutrients — selenium, iodine, zinc, and iron — to produce hormones effectively. Many Indians with thyroid disorders unknowingly eat diets deficient in these critical nutrients. The good news is that Indian cuisine, eaten the right way, can provide all of them. Selenium from sunflower seeds and eggs, iodine from iodised salt and dairy, and zinc from dals and pumpkin seeds are all accessible and affordable in Indian kitchens. The most common dietary concern — avoiding goitrogens (foods that can interfere with thyroid function, like raw cauliflower or unfermented soy) — is often overstated. Cooking neutralises most goitrogenic compounds. MealCoreAI's thyroid track prioritises nutrient sufficiency over unnecessary restriction, creating Indian meal plans that nourish the thyroid rather than just avoiding foods."
        keyFoods={[
          { name: "Brazil Nuts", benefit: "Just 2 Brazil nuts provide the entire daily requirement of selenium, the most important thyroid-protective mineral." },
          { name: "Sunflower Seeds", benefit: "Excellent Indian-accessible source of selenium and vitamin E that protects thyroid cells from oxidative damage." },
          { name: "Eggs", benefit: "Complete source of iodine, selenium, and zinc — the three minerals most critical for thyroid hormone synthesis." },
          { name: "Dairy (Milk & Curd)", benefit: "One of India's best iodine sources. Also provides calcium and vitamin D that thyroid patients commonly lack." },
          { name: "Moong & Masoor Dal", benefit: "Zinc-rich legumes that support thyroid hormone conversion from T4 to the active T3 form." },
          { name: "Iodised Salt", benefit: "The simplest way to ensure adequate iodine. Critical — switching to rock salt or sea salt can worsen deficiency." },
          { name: "Mushrooms", benefit: "Good source of selenium and vitamin D, commonly deficient in Indian thyroid patients." },
          { name: "Pumpkin Seeds", benefit: "Rich in zinc and iron — pumpkin seeds are one of the best plant-based thyroid-supportive snacks." },
        ]}
        foodsToLimit={[
          { name: "Raw Cruciferous Vegetables", reason: "Raw cabbage, cauliflower, and broccoli contain goitrogens that can interfere with iodine absorption when eaten in very large raw quantities. Cooking eliminates most of this concern." },
          { name: "Unfermented Soy Products", reason: "Large amounts of soy can interfere with thyroid hormone absorption — especially important to note if taking levothyroxine." },
          { name: "Excess Coffee", reason: "High caffeine intake may interfere with thyroid medication absorption. Take medication 60 minutes before coffee." },
          { name: "Gluten (if Hashimoto's)", reason: "For Hashimoto's thyroiditis specifically, a gluten-free trial may reduce antibody levels in some patients." },
          { name: "Highly Processed Foods", reason: "Processed foods high in fluoride and chlorine (from additives) may compete with iodine absorption." },
          { name: "Excess Millet (if Hypothyroid)", reason: "Large quantities of millets like jowar can have mild goitrogenic effects in iodine-deficient individuals when eaten as the sole grain." },
        ]}
        samplePlan={[
          {
            day: "Day 1",
            breakfast: "Egg bhurji (2 eggs) + multigrain toast + 1 glass milk",
            lunch: "Moong dal + jowar roti + sabzi + curd with pumpkin seeds",
            snack: "2 Brazil nuts + sunflower seed trail mix",
            dinner: "Grilled fish / paneer tikka + palak sabzi + brown rice",
          },
          {
            day: "Day 2",
            breakfast: "Vegetable oats upma with mushrooms + 1 boiled egg",
            lunch: "Masoor dal + wheat roti + mixed vegetable sabzi",
            snack: "Curd with flaxseeds + seasonal fruit",
            dinner: "Egg curry / rajma + rice (small portion) + salad",
          },
          {
            day: "Day 3",
            breakfast: "Ragi dosa + sambar + coconut chutney + 1 glass milk",
            lunch: "Chana dal + bajra roti + lauki sabzi + curd",
            snack: "Roasted pumpkin seeds + 1 amla",
            dinner: "Chicken / tofu curry + sautéed vegetables + quinoa",
          },
          {
            day: "Day 4",
            breakfast: "Omelette (2 eggs) + multigrain toast + 1 glass milk",
            lunch: "Ragi roti + chana dal + mixed vegetable sabzi + curd",
            snack: "Sunflower seed trail mix + seasonal fruit",
            dinner: "Grilled chicken / tofu + palak stir-fry + brown rice",
          },
          {
            day: "Day 5",
            breakfast: "Daliya upma with mushrooms + 1 glass milk",
            lunch: "Jowar roti + masoor dal + lauki sabzi + curd with pumpkin seeds",
            snack: "2 Brazil nuts + dates (2)",
            dinner: "Fish curry / rajma + basmati rice + salad",
          },
          {
            day: "Day 6",
            breakfast: "Moong dal chilla (2) + tomato chutney + 1 boiled egg",
            lunch: "Wheat roti + egg curry + stir-fried cabbage (well cooked)",
            snack: "Curd with flaxseeds + banana",
            dinner: "Dal makhani (low fat) + ragi roti + cucumber salad",
          },
          {
            day: "Day 7",
            breakfast: "Ragi dosa + sambar + coconut chutney + 1 glass milk",
            lunch: "Brown rice + moong dal + drumstick sabzi + curd",
            snack: "Handful of pumpkin seeds + 1 small guava",
            dinner: "Paneer curry + bajra roti + steamed vegetables",
          },
        ]}
        whyIngredients={[
          {
            name: "Selenium — Brazil Nuts and Sunflower Seeds",
            claim: "Selenium is the single most important mineral for thyroid function — and most Indians don't get enough of it. The thyroid gland contains more selenium per gram than any other tissue in the body, and without it, the enzyme that converts inactive T4 into active T3 hormone simply cannot work properly. Two Brazil nuts a day is all you need. If Brazil nuts aren't accessible, a small handful of sunflower seeds daily provides a meaningful selenium dose. This is not a supplement you need — it's a food habit.",
            citation: "Source: Köhrle J, European Journal of Endocrinology, 2015.",
          },
          {
            name: "Iodine — Iodised Salt and Dairy",
            claim: "India has one of the highest rates of iodine deficiency globally, and the thyroid literally cannot make hormones without it. Iodised salt is the simplest, cheapest, and most reliable way to ensure daily iodine intake — which is why the switch many health-conscious Indians make to pink salt, rock salt, or black salt is actually harmful for thyroid patients. These salts contain no iodine. One glass of milk provides 50-80mcg of iodine, roughly half your daily needs. Keep dairy consistent and never swap iodised salt.",
            citation: "Source: WHO Global Database on Iodine Deficiency, 2004.",
          },
          {
            name: "Zinc — Dal and Pumpkin Seeds",
            claim: "Zinc deficiency is found in a significant proportion of hypothyroid patients, and it creates a self-reinforcing problem: low thyroid function reduces zinc absorption, and low zinc reduces thyroid function. Moong and masoor dal are accessible daily sources of dietary zinc. A tablespoon of pumpkin seeds added to curd, poha, or salad provides additional zinc in a convenient form. Unlike selenium and iodine, zinc can be obtained easily through a dal-forward Indian diet — the traditional way of eating is already doing some of the work.",
            citation: "Source: Nishiyama S et al., Journal of the American College of Nutrition, 1994.",
          },
        ]}
        faqs={[
          {
            q: "What foods are good for hypothyroidism in India?",
            a: "For hypothyroidism, the most important dietary change is ensuring sufficient selenium, iodine, and zinc intake. In Indian meals, this means including eggs regularly (iodine + selenium), using only iodised salt (not rock salt or pink salt), eating dairy daily (milk or curd), including moong and masoor dal regularly (zinc), and adding a small handful of sunflower or pumpkin seeds to daily meals. Anti-inflammatory spices like turmeric and ginger support thyroid health by reducing systemic inflammation that worsens hypothyroid symptoms. Vitamin D deficiency is extremely common in Indian hypothyroid patients — regular sun exposure and dairy consumption helps, but supplementation is often needed.",
          },
          {
            q: "Should hypothyroid patients avoid cabbage and cauliflower?",
            a: "This is one of the most common thyroid diet myths in India. Raw cabbage and cauliflower contain goitrogens that can theoretically interfere with iodine uptake, but cooking destroys approximately 95% of goitrogenic compounds. This means a sabzi or stir-fry of these vegetables poses virtually no thyroid risk. The concern applies mainly to people who eat very large amounts of raw cruciferous vegetables daily while also being iodine deficient — an uncommon scenario for most Indians. If you are eating normal portions of cooked sabzis that include these vegetables, there is no need to avoid them. Focus your energy on ensuring adequate iodine from iodised salt and dairy instead.",
          },
          {
            q: "Does diet affect TSH levels?",
            a: "Diet alone does not directly control TSH levels in the same way medication does, but nutritional deficiencies significantly worsen thyroid function and can raise TSH. Selenium deficiency impairs the conversion of T4 to active T3 — the form your cells actually use. Iodine deficiency directly reduces thyroid hormone production. Zinc deficiency impairs hormone synthesis. Iron deficiency anaemia reduces thyroid hormone production efficiency. Addressing these deficiencies through food can measurably improve thyroid function markers over 3-6 months and may allow medication doses to be optimised. However, dietary changes should always complement — never replace — prescribed thyroid medication.",
          },
          {
            q: "Can I eat rice if I have thyroid issues?",
            a: "Yes, rice is generally safe for thyroid patients. Thyroid disorders are not primarily about glycaemic control the way diabetes is, so the type of grain matters less than ensuring you get sufficient thyroid-supporting micronutrients. The more important consideration is that people with hypothyroidism often have a slower metabolism and may gain weight easily, making portion control of all refined carbs including white rice sensible. Choosing brown rice over white adds fibre and more micronutrients. If you have hypothyroid-associated diabetes or insulin resistance, then following the diabetic guidelines for rice applies. Otherwise, 1-2 cups of cooked rice per meal within an overall balanced diet is perfectly acceptable.",
          },
          {
            q: "What Indian breakfast is best for thyroid patients?",
            a: "The best thyroid breakfasts in India combine thyroid-supporting micronutrients with satisfying nutrition. Egg-based breakfasts are ideal — egg bhurji or boiled eggs provide iodine, selenium, and zinc in one shot. Ragi or oats-based upma or porridge with milk provides calcium and energy. Including a glass of milk at breakfast gives consistent iodine intake. For vegetarians, a breakfast of idli-sambar with curd on the side provides protein and iodine. Adding sunflower seeds or pumpkin seeds to any breakfast significantly boosts selenium and zinc. The most important thyroid breakfast habit is taking your levothyroxine or thyroid medication first thing in the morning, at least 30-60 minutes before eating or drinking anything except water.",
          },
        ]}
        relatedPosts={[
          { title: "Thyroid Foods to Avoid in India", slug: "blog/thyroid-foods-avoid-india" },
          { title: "Millet Benefits for PCOS Management", slug: "blog/millet-benefits-pcos" },
        ]}
        relatedPlans={[
          { title: "PCOS Meal Plan for Indian Women", slug: "pcos-meal-plan" },
          { title: "Cholesterol Diet Plan for Indians", slug: "cholesterol-diet-plan" },
          { title: "Diabetes Meal Plan India", slug: "diabetes-meal-plan" },
        ]}
        currentPath="/thyroid-diet-plan"
      />
    </>
  );
}
