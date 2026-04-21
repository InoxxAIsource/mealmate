import type { Metadata } from "next";
import ConditionPage from "@/components/ConditionPage";

export const metadata: Metadata = {
  title: "Kids Meal Plan India — Healthy Indian Tiffin and Dinner Ideas | MealCoreAI",
  description:
    "Healthy Indian meal plan for kids aged 2-12. Nutrient-dense tiffin, lunch, and dinner ideas. Age-appropriate portions. AI-personalised. Free to start.",
  alternates: { canonical: "https://mealcoreai.com/kids-meal-plan" },
  openGraph: {
    title: "Kids Meal Plan India — Healthy Indian Tiffin & Dinner Ideas | MealCoreAI",
    description: "Healthy, delicious Indian tiffin and dinner ideas for kids. AI-personalised.",
    url: "https://mealcoreai.com/kids-meal-plan",
    images: [{ url: "/api/og?page=kids-meal-plan" }],
  },
};

const medicalWebPageLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Kids Meal Plan India",
  description: "Healthy Indian meal planning guide for children aged 2-12.",
  url: "https://mealcoreai.com/kids-meal-plan",
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a healthy tiffin for Indian kids?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Healthy Indian tiffins for kids include mini idli with sambar, ragi or multigrain rotis with dal stuffing, paneer paratha (small), vegetable uthappam, or sprouts chaat. Include a fruit and a small sweet like jaggery laddoo. Avoid maida-based options, store-bought biscuits, and sugary drinks.",
      },
    },
  ],
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://mealcoreai.com" },
    { "@type": "ListItem", position: 2, name: "Kids Meal Plan", item: "https://mealcoreai.com/kids-meal-plan" },
  ],
};

export default function KidsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalWebPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ConditionPage
        condition="Kids"
        emoji="🧒"
        accentColour="yellow"
        h1="Kids Meal Plan: Healthy Indian Tiffin and Dinner Ideas"
        intro="Getting children to eat nutritious Indian food is one of the most common challenges for Indian parents. The foods children need most — dals, green vegetables, millets, and whole grains — are often the ones they resist most. The solution isn't force-feeding nutritious foods but making them delicious, fun, and familiar. Ragi can be made into laddoos and cookies they love. Dal can be hidden in parathas and uttapam. Paneer satisfies protein needs while being a crowd favourite. MealCoreAI's kids track plans meals around the nutrients most critical for healthy development — calcium and vitamin D for bone growth, iron and zinc for brain development, protein for muscle and height, and fibre for gut health — while generating dishes that children between ages 2 and 12 actually enjoy eating. Tiffin ideas, dinner plans, and after-school snacks are all covered."
        keyFoods={[
          { name: "Ragi (Finger Millet)", benefit: "The highest calcium food in Indian grains — critical for growing bones. Can be made into delicious laddoos, dosas, and porridges kids love." },
          { name: "Curd (Yogurt)", benefit: "Calcium, probiotics, and protein. Children who eat curd daily have better bone density and stronger gut immunity." },
          { name: "Paneer", benefit: "India's best complete protein for vegetarian kids. High calcium and fat-soluble vitamins support healthy growth." },
          { name: "Dal (All varieties)", benefit: "Protein, iron, zinc, and B vitamins in one food. Children eating dal twice daily rarely show protein or iron deficiency." },
          { name: "Eggs", benefit: "Choline from eggs is critical for brain development. One egg per day dramatically improves height and cognitive development in young children." },
          { name: "Banana", benefit: "Quick energy, potassium, and vitamin B6. A practical after-school snack that supports active children's energy needs." },
          { name: "Sweet Potato", benefit: "Beta-carotene (eye health), fibre, and natural sweetness that children enjoy. Easier to eat than most vegetables." },
          { name: "Peanuts", benefit: "Affordable, protein and fat-dense snack. Peanut butter on multigrain bread or roasted peanuts are excellent for growing children." },
        ]}
        foodsToLimit={[
          { name: "Ultra-Processed Snacks", reason: "Chips, packaged biscuits, and instant noodles crowd out nutritious foods and habituate children to excessive salt and artificial flavours." },
          { name: "Sugary Drinks", reason: "Soft drinks, packaged juices, and flavoured milk replace nutritious beverages and are a primary cause of childhood obesity." },
          { name: "Maida-Based Foods", reason: "White bread, naan, and puri provide calories without the fibre, iron, and B vitamins whole grains provide." },
          { name: "Excessive Sugar", reason: "Excess sugar displaces nutrient-dense foods, causes dental cavities, and establishes unhealthy taste preferences early." },
          { name: "Fried Snacks Daily", reason: "Regular deep-fried snacks establish inflammatory eating habits and contribute to childhood overweight without nutritional benefit." },
          { name: "Skipping Meals", reason: "Children who regularly skip breakfast or meals show lower concentration, poorer memory, and slower growth rates." },
        ]}
        samplePlan={[
          {
            day: "Day 1 (School Day)",
            breakfast: "Ragi dosa with tomato chutney + 1 glass milk",
            lunch: "Tiffin: Mini idli (6) + sambar + fruit (banana)",
            snack: "Ragi laddoo (1-2) + 1 glass buttermilk",
            dinner: "Dal tadka + wheat roti + mixed vegetables + curd",
          },
          {
            day: "Day 2 (School Day)",
            breakfast: "Egg scramble + multigrain toast + orange juice (fresh)",
            lunch: "Tiffin: Paneer paratha (1) + curd + seasonal fruit",
            snack: "Peanut butter on multigrain bread + 1 glass milk",
            dinner: "Moong dal khichdi + ghee + salad + curd",
          },
          {
            day: "Day 3 (Weekend)",
            breakfast: "Sweet potato poha + peanuts + 1 boiled egg",
            lunch: "Rajma (or chicken curry) + brown rice + salad",
            snack: "Fruit chaat (banana, pomegranate, apple) + handful of peanuts",
            dinner: "Palak paneer + roti + curd + small portion of jaggery dessert",
          },
        ]}
        faqs={[
          {
            q: "What are the best Indian foods for a child's brain development?",
            a: "Brain development in children depends heavily on adequate intake of DHA (omega-3), choline, iron, zinc, and iodine. In Indian food: eggs are the single most powerful brain food for children — one egg daily significantly improves cognitive scores in studies. Fish like rohu and mackerel provide DHA critical for myelin (brain insulation) development. Walnuts provide plant-based omega-3s. Dal provides zinc which is critical for neurotransmitter function. Iodised salt ensures iodine for brain development — never substitute with rock salt for young children. Palak and methi sabzis provide iron which directly supports haemoglobin levels and oxygen delivery to the brain. Children with iron deficiency consistently score lower on attention and learning tests.",
          },
          {
            q: "What should a school tiffin contain for maximum nutrition?",
            a: "A nutritious Indian school tiffin should have three components: a complex carbohydrate for sustained energy (multigrain roti, idli, brown rice, or ragi-based item), a protein source (dal stuffing, paneer, egg, or curd), and a fruit or vegetable for vitamins and fibre. Some examples: ragi roti with palak paneer stuffing and a banana; mini idli with sambar and a small box of grapes; moong dal cheela with green chutney and an apple; poha with peanuts and pomegranate seeds. Avoid sending plain white bread sandwiches, maida items like puri or bhatura, packaged biscuits, or sugary juice boxes. Include a water bottle — many children are chronically mildly dehydrated at school which worsens concentration.",
          },
          {
            q: "How much milk should an Indian child drink per day?",
            a: "Children aged 1-3 need about 500ml of milk or dairy equivalent per day. Children aged 4-8 need about 500-700ml. Children aged 9-18 need 700-900ml (increasing bone density requirements during growth spurts). However, dairy doesn't all need to come from milk — curd, paneer, and chaas all count. A practical guide for Indian children: one glass of milk in the morning, curd or raita at lunch, and a cup of chaas in the evening provides adequate calcium and dairy. If a child dislikes milk, ragi-based items (ragi porridge, ragi laddoo, ragi dosa with milk) provide excellent calcium. Children should not have cow's milk before 12 months, where breast milk or formula is the only dairy recommendation.",
          },
          {
            q: "How can I make my child eat dal and sabzi?",
            a: "Most children resist dal and sabzi not because of flavour but because of texture, temperature, and presentation. Practical strategies that work in Indian households: mix dal into parathas — kids rarely notice dal mixed into the dough. Make moong dal chilla or dal dosa which feels more like a snack than a meal. Present sabzi differently — instead of a full sabzi, stir-fry vegetables with spices and serve as a topping on roti. Paneer tikka and palak puri are common ways vegetables get accepted. Let children eat with their hands for messy fun foods like bhel, chaat, and wraps. Involve children aged 5+ in simple cooking — children are far more likely to eat food they helped make. Start with naturally sweet vegetables — sweet potato, carrots, peas — before progressing to bitter ones.",
          },
          {
            q: "What are healthy after-school snacks for Indian children?",
            a: "After school, children need a combination of quick energy and sustained protein to tide them over until dinner. Best Indian after-school snacks: ragi laddoo or til laddoo (nutritious and sweet enough to appeal); roasted chana with a glass of buttermilk; peanut butter on multigrain bread (protein + healthy fat + carbs); banana with a small handful of walnuts (quick energy + brain-supportive omega-3s); sprouts chaat with cucumber and lime (protein-packed, fresh, easy); mini idli leftover from tiffin with sambar. Snacks to avoid as daily habits: packaged chips, biscuits, instant noodles, and soft drinks — these are calorie-dense, nutritionally empty, and establish unhealthy preferences that are hard to reverse in teenage years.",
          },
        ]}
        relatedPosts={[
          { title: "30 Healthy Indian Tiffin Ideas for School Kids", slug: "blog/tiffin-ideas-school" },
          { title: "How to Make Kids Love Dal and Vegetables", slug: "blog/kids-eat-dal-sabzi" },
          { title: "Ragi Recipes for Growing Children", slug: "blog/ragi-recipes-kids" },
        ]}
        relatedPlans={[
          { title: "Pregnancy Meal Plan", slug: "pregnancy-meal-plan" },
          { title: "General Wellness Plan", slug: "#" },
          { title: "PCOS Meal Plan", slug: "pcos-meal-plan" },
        ]}
        currentPath="/kids-meal-plan"
      />
    </>
  );
}
