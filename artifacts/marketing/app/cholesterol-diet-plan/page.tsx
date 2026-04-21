import type { Metadata } from "next";
import ConditionPage from "@/components/ConditionPage";

export const metadata: Metadata = {
  title: "Cholesterol Diet Plan India — Heart-Healthy Indian Meal Plans | MealCoreAI",
  description:
    "Personalised heart-healthy Indian diet plan to lower LDL cholesterol. Omega-3 rich, low saturated fat meals from Indian cuisine. Free to start.",
  alternates: { canonical: "https://mealcoreai.com/cholesterol-diet-plan" },
  openGraph: {
    title: "Cholesterol Diet Plan India — Heart-Healthy Indian Meal Plans | MealCoreAI",
    description: "Lower LDL cholesterol with heart-healthy Indian food. Personalised meal plans.",
    url: "https://mealcoreai.com/cholesterol-diet-plan",
    images: [{ url: "/api/og?page=cholesterol-diet-plan" }],
  },
};

const medicalWebPageLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Cholesterol Diet Plan India",
  description: "Guide to managing cholesterol with heart-healthy Indian meal planning.",
  url: "https://mealcoreai.com/cholesterol-diet-plan",
  about: { "@type": "MedicalCondition", name: "Hypercholesterolemia" },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What Indian foods lower cholesterol?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Indian foods that lower cholesterol include: oats (beta-glucan lowers LDL), moong dal, amla, garlic, flaxseeds (omega-3), walnuts, turmeric, methi seeds (fenugreek), and fish like mackerel and sardines. These foods either reduce LDL cholesterol directly, increase HDL, or reduce cardiovascular inflammation.",
      },
    },
  ],
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://mealcoreai.com" },
    { "@type": "ListItem", position: 2, name: "Cholesterol Diet Plan", item: "https://mealcoreai.com/cholesterol-diet-plan" },
  ],
};

export default function CholesterolPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalWebPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ConditionPage
        condition="Cholesterol"
        emoji="❤️"
        accentColour="purple"
        h1="Cholesterol Diet Plan: Heart-Healthy Indian Food That Tastes Good"
        intro="High cholesterol is one of India's fastest-growing health concerns, yet most people believe managing it requires giving up all the delicious Indian food they love. This is a myth. The right approach to a heart-healthy Indian diet is not elimination but substitution — choosing cooking oils that support heart health over those that worsen it, including omega-3-rich foods like flaxseeds and walnuts daily, prioritising soluble fibre from oats and dal that actively lower LDL cholesterol, and reducing — not eliminating — saturated fat from ghee, coconut oil, and full-fat dairy. Indian cuisine offers extraordinary heart-protective foods: garlic, turmeric, methi, amla, and moong dal have all shown measurable cholesterol-reducing effects in clinical trials. MealCoreAI's cholesterol track creates meal plans that lower LDL naturally through food, without taking away the flavour and traditions that make Indian eating a joy."
        keyFoods={[
          { name: "Oats", benefit: "Beta-glucan soluble fibre in oats binds to LDL cholesterol in the gut and removes it before absorption. Just 3g of beta-glucan daily (1-1.5 cups cooked oats) is clinically proven to reduce LDL by up to 10%." },
          { name: "Flaxseeds (Alsi)", benefit: "The richest plant source of ALA omega-3 fatty acids. Ground flaxseeds added to dal or roti reduce LDL and triglycerides." },
          { name: "Walnuts (Akhrot)", benefit: "Six walnuts daily reduces LDL by 7-10% in 6 weeks. Rich in ALA, polyphenols, and plant sterols that block cholesterol absorption." },
          { name: "Garlic (Lehsun)", benefit: "Allicin in garlic has proven LDL-reducing effects. Two raw cloves daily reduces total cholesterol by 9-12% consistently." },
          { name: "Turmeric (Haldi)", benefit: "Curcumin reduces LDL oxidation, the process that makes LDL cholesterol form arterial plaques. Anti-inflammatory and heart protective." },
          { name: "Amla (Indian Gooseberry)", benefit: "Clinical studies show amla at 500mg twice daily is as effective as simvastatin for reducing LDL. Fresh amla or amla juice is cardioprotective." },
          { name: "Moong Dal", benefit: "Soluble fibre and plant protein in moong dal lower LDL while raising HDL. An ideal protein source for heart-healthy Indian meals." },
          { name: "Methi (Fenugreek)", benefit: "Saponins in methi seeds reduce cholesterol absorption in the gut. Soaking methi seeds overnight and eating them before meals is particularly effective." },
        ]}
        foodsToLimit={[
          { name: "Vanaspati / Dalda", reason: "Trans fats from hydrogenated vegetable oil dramatically raise LDL and lower HDL simultaneously — the worst combination for heart health." },
          { name: "Deep-Fried Foods", reason: "Regular samosas, puri, bhatura, and pakoras prepared in refined oils raise LDL and contribute to cardiovascular inflammation." },
          { name: "Full-Fat Dairy in Excess", reason: "Saturated fat from excessive full-fat milk, paneer, and ghee raises LDL. Moderate ghee use is acceptable; excess is not." },
          { name: "Coconut Oil in Large Quantities", reason: "Coconut oil is extremely high in saturated fat. While it raises HDL, it also raises LDL in large quantities." },
          { name: "Red Meat & Organ Meats", reason: "High saturated fat and dietary cholesterol content. Limit red meat to once a week; avoid organ meats entirely if cholesterol is high." },
          { name: "Biscuits & Packaged Snacks", reason: "Most Indian packaged biscuits and namkeen contain partially hydrogenated oils (trans fats) that worsen cholesterol profiles." },
        ]}
        samplePlan={[
          {
            day: "Day 1",
            breakfast: "Oats upma with vegetables + 2 raw garlic cloves + 1 amla",
            lunch: "Moong dal + jowar roti + sabzi cooked in olive oil",
            snack: "6 walnuts + methi seeds water (soaked overnight)",
            dinner: "Grilled fish (mackerel / sardines) + sautéed vegetables + brown rice",
          },
          {
            day: "Day 2",
            breakfast: "Oat porridge with flaxseeds + walnuts + cinnamon",
            lunch: "Chana dal with turmeric + bajra roti + mixed green sabzi",
            snack: "Roasted makhana + 1 amla / amla juice",
            dinner: "Tofu / paneer tikka (grilled) + palak dal + roti",
          },
          {
            day: "Day 3",
            breakfast: "Vegetable daliya with flaxseeds + 1 glass low-fat milk",
            lunch: "Rajma (olive oil tadka) + brown rice + cucumber raita",
            snack: "Flaxseed smoothie with banana + methi seeds",
            dinner: "Egg curry (2 eggs) + methi roti + salad with olive oil dressing",
          },
        ]}
        faqs={[
          {
            q: "What Indian foods naturally lower LDL cholesterol?",
            a: "Several Indian foods have clinically proven LDL-lowering effects. Oats consumed daily (providing at least 3g of beta-glucan) reduce LDL by up to 10%. Amla at therapeutic doses reduces LDL as effectively as statin medications in some studies. Garlic (2 raw cloves daily) reduces total cholesterol by 9-12%. Flaxseeds (2 tablespoons ground daily) reduce LDL through omega-3 and soluble fibre content. Methi seeds soaked overnight and eaten on an empty stomach reduce cholesterol absorption. Walnuts (6 per day) reduce LDL by 7-10% in 6 weeks. Turmeric reduces LDL oxidation — which is arguably more important than LDL levels alone for cardiovascular risk. Including all of these systematically within your daily Indian meals can produce a 15-25% reduction in LDL over 3 months.",
          },
          {
            q: "Is ghee bad for high cholesterol?",
            a: "Ghee's effect on cholesterol is nuanced and often misunderstood. Ghee is primarily saturated fat (about 64%), which does raise LDL cholesterol in large quantities. However, the butyric acid and fat-soluble vitamins in ghee (A, D, E, K) provide real health benefits. Current evidence suggests that moderate ghee consumption — 1-2 teaspoons per day as part of a meal — does not significantly worsen cholesterol in most people and may be preferable to refined vegetable oils. The problem is that many Indian households use 4-6 teaspoons or more per meal. The key is quantity: small amounts of ghee are acceptable, large amounts are not. Replacing ghee with mustard oil or olive oil for cooking while using a small amount of ghee as a condiment on rotis is a practical compromise.",
          },
          {
            q: "Which cooking oil is best for high cholesterol in India?",
            a: "For Indians with high cholesterol, the best cooking oils are those highest in monounsaturated fats (which lower LDL) and omega-3 (which reduce inflammation). Cold-pressed mustard oil is an excellent traditional choice — high in erucic acid and ALA omega-3. Extra virgin olive oil is ideal for salads and low-heat cooking. Rice bran oil has a good balance of MUFA and PUFA and is suitable for Indian cooking temperatures. Groundnut (peanut) oil is acceptable in moderation. Coconut oil and palm oil are high in saturated fat and should be limited. The absolute worst choices are vanaspati (dalda), partially hydrogenated vegetable oil, and refined corn or sunflower oil which are heavily processed and pro-inflammatory.",
          },
          {
            q: "How quickly can diet change cholesterol levels?",
            a: "Dietary changes for cholesterol show measurable results within 4-6 weeks if consistently followed, with full effects visible at 3 months. The first 4 weeks typically show a 5-10% LDL reduction from dietary fibre increases alone. Adding oats, flaxseeds, garlic, and amla consistently can produce a 15-20% LDL reduction in 3 months. Eliminating trans fats (vanaspati, packaged snacks) produces a rapid and significant improvement in both LDL and HDL ratios within 2-4 weeks. Triglycerides respond fastest to dietary changes — reducing sugar and refined carbohydrates can drop triglycerides by 30-50% within 4-6 weeks. For people on statin medication, dietary improvements are complementary and allow many patients to maintain good control with lower medication doses — always discuss with your cardiologist.",
          },
          {
            q: "Can a vegetarian Indian lower cholesterol through diet alone?",
            a: "Vegetarian Indians often have an advantage in cholesterol management because they naturally avoid the saturated fat from red meat. However, the common Indian vegetarian diet is often high in ghee, full-fat dairy, refined carbohydrates, and fried snacks — all of which worsen cholesterol profiles. A well-planned vegetarian Indian diet can effectively lower LDL through: daily oats consumption; replacing ghee and refined oil with mustard or olive oil; including flaxseeds and walnuts daily for omega-3s; eating dal at both lunch and dinner; including garlic and turmeric in cooking; substituting white rice with millets and brown rice; and eliminating vanaspati and packaged snacks entirely. Clinical studies show well-planned vegetarian diets achieve LDL reductions of 15-25% — comparable to many medications — when followed consistently for 3-6 months.",
          },
        ]}
        relatedPosts={[
          { title: "Heart-Healthy Indian Cooking: Oil Guide", slug: "blog/cooking-oils-cholesterol" },
          { title: "10 Indian Foods That Lower LDL Naturally", slug: "blog/foods-lower-ldl-india" },
          { title: "Oats Recipes for Cholesterol Management", slug: "blog/oats-cholesterol-recipes" },
        ]}
        relatedPlans={[
          { title: "Diabetes Meal Plan", slug: "diabetes-meal-plan" },
          { title: "PCOS Meal Plan", slug: "pcos-meal-plan" },
          { title: "General Wellness Plan", slug: "#" },
        ]}
        currentPath="/cholesterol-diet-plan"
      />
    </>
  );
}
