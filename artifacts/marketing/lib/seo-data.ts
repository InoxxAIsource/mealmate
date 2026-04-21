export const conditions = [
  {
    id: "pcos",
    label: "PCOS",
    keywords: ["hormone-friendly", "low-GI", "anti-inflammatory", "insulin-friendly"],
    emoji: "🌸",
    accent: "fb7185",
    description: "Hormone-balancing meals designed to manage PCOS symptoms through low-GI, anti-inflammatory Indian foods.",
  },
  {
    id: "diabetes",
    label: "Diabetic",
    keywords: ["low-GI", "blood-sugar-friendly", "millet-based", "diabetic-safe"],
    emoji: "🩺",
    accent: "3b82f6",
    description: "Blood-sugar-friendly meal plans using millets, legumes, and low-GI Indian staples.",
  },
  {
    id: "thyroid",
    label: "Thyroid",
    keywords: ["thyroid-friendly", "selenium-rich", "iodine-rich", "goitrogen-free"],
    emoji: "🦋",
    accent: "8b5cf6",
    description: "Thyroid-supportive nutrition with selenium-rich and iodine-rich Indian foods.",
  },
  {
    id: "pregnancy",
    label: "Pregnancy",
    keywords: ["folate-rich", "iron-rich", "trimester-safe", "pregnancy-safe"],
    emoji: "🤱",
    accent: "ec4899",
    description: "Safe, nutrient-dense meal plans for each trimester of pregnancy.",
  },
  {
    id: "kids",
    label: "Kids",
    keywords: ["child-friendly", "nutrient-dense", "school-tiffin", "fussy-eater-friendly"],
    emoji: "👶",
    accent: "f59e0b",
    description: "Delicious, nutrient-packed meals and tiffin ideas growing children will love.",
  },
  {
    id: "cholesterol",
    label: "Low Cholesterol",
    keywords: ["heart-healthy", "low-saturated-fat", "high-fibre", "cholesterol-lowering"],
    emoji: "❤️",
    accent: "ef4444",
    description: "Heart-healthy Indian meal plans to naturally lower LDL cholesterol.",
  },
  {
    id: "weightloss",
    label: "Weight Loss",
    keywords: ["low-calorie", "high-fibre", "portion-controlled", "metabolism-boosting"],
    emoji: "⚖️",
    accent: "10b981",
    description: "Calorie-controlled, filling Indian meals for sustainable weight management.",
  },
  {
    id: "highprotein",
    label: "High Protein",
    keywords: ["protein-rich", "muscle-building", "high-protein", "post-workout"],
    emoji: "💪",
    accent: "f97316",
    description: "Protein-packed Indian meal plans for muscle building and recovery.",
  },
];

export const regions = [
  { id: "north-indian", label: "North Indian" },
  { id: "south-indian", label: "South Indian" },
  { id: "east-indian", label: "East Indian" },
  { id: "west-indian", label: "West Indian" },
  { id: "bengali", label: "Bengali" },
  { id: "punjabi", label: "Punjabi" },
  { id: "gujarati", label: "Gujarati" },
  { id: "tamil", label: "Tamil" },
  { id: "kerala", label: "Kerala" },
  { id: "maharashtrian", label: "Maharashtrian" },
  { id: "andhra", label: "Andhra" },
  { id: "rajasthani", label: "Rajasthani" },
  { id: "mediterranean", label: "Mediterranean" },
  { id: "middle-eastern", label: "Middle Eastern" },
  { id: "nigerian", label: "Nigerian" },
  { id: "filipino", label: "Filipino" },
  { id: "mexican", label: "Mexican" },
];

export const mealTypes = [
  { id: "weekly-meal-plan", label: "Weekly Meal Plan" },
  { id: "7-day-meal-plan", label: "7-Day Meal Plan" },
  { id: "breakfast-ideas", label: "Breakfast Ideas" },
  { id: "lunch-ideas", label: "Lunch Ideas" },
  { id: "dinner-ideas", label: "Dinner Ideas" },
  { id: "snack-ideas", label: "Snack Ideas" },
];

export function parseSlug(slug: string) {
  const conditionObj = conditions.find((c) => slug.startsWith(c.id + "-"));
  if (!conditionObj) return null;
  const rest = slug.slice(conditionObj.id.length + 1);
  const mealTypeObj = mealTypes.find((m) => rest.startsWith(m.id + "-") || rest === m.id);
  if (!mealTypeObj) return null;
  const regionPart =
    rest.startsWith(mealTypeObj.id + "-") ? rest.slice(mealTypeObj.id.length + 1) : null;
  const regionObj = regions.find((r) => r.id === regionPart);
  return { condition: conditionObj, mealType: mealTypeObj, region: regionObj || null };
}

export function buildSlug(conditionId: string, mealTypeId: string, regionId: string) {
  return `${conditionId}-${mealTypeId}-${regionId}`;
}

export function formatTitle(condition: string, mealType: string, region: string) {
  return `${region} ${condition} ${mealType}`;
}

// Sample dish data by region and condition
export const sampleDishes: Record<string, Record<string, string[][]>> = {
  "north-indian": {
    pcos: [
      ["Methi Paratha", "Dal Tadka", "Cucumber Raita"],
      ["Besan Cheela", "Lauki Sabzi", "Brown Rice"],
      ["Moong Dal Khichdi", "Palak Paneer", "Jeera Rice"],
      ["Oats Upma", "Rajma Curry", "Chapati"],
      ["Bajra Roti", "Chana Masala", "Onion Raita"],
      ["Quinoa Pulao", "Kadhi", "Roasted Papad"],
      ["Egg Bhurji", "Besan Sabzi", "Ragi Roti"],
    ],
    diabetes: [
      ["Jowar Roti", "Karela Sabzi", "Moong Dal"],
      ["Oats Cheela", "Bhindi Masala", "Lassi (no sugar)"],
      ["Bajra Khichdi", "Methi Dal", "Salad"],
      ["Multigrain Paratha", "Tinda Sabzi", "Curd"],
      ["Besan Roti", "Palak Chole", "Buttermilk"],
      ["Brown Rice", "Lauki Dal", "Jeera Raita"],
      ["Quinoa Upma", "Arbi Sabzi", "Tomato Soup"],
    ],
    thyroid: [
      ["Ragi Dosa", "Coconut Chutney", "Sambar"],
      ["Quinoa Khichdi", "Palak Dal", "Salad"],
      ["Egg White Omelette", "Multigrain Toast", "Orange Juice"],
      ["Brown Rice", "Fish Curry", "Stir-fry Veggies"],
      ["Moong Cheela", "Mint Chutney", "Carrot Soup"],
      ["Millet Pulao", "Paneer Bhurji", "Raita"],
      ["Oats Porridge", "Mixed Fruit", "Walnuts"],
    ],
    pregnancy: [
      ["Spinach Paratha", "Dal Fry", "Dahi"],
      ["Poha with Peanuts", "Banana", "Milk"],
      ["Multigrain Dosa", "Sambar", "Coconut Chutney"],
      ["Palak Paneer", "Chapati", "Salad"],
      ["Moong Dal Khichdi", "Ghee", "Pickle"],
      ["Ragi Porridge", "Dates", "Almonds"],
      ["Rajma Rice", "Curd", "Papad"],
    ],
    kids: [
      ["Aloo Paratha", "Curd", "Banana"],
      ["Paneer Sandwich", "Apple", "Milk"],
      ["Dal Rice", "Sabzi", "Papad"],
      ["Vegetable Khichdi", "Ghee", "Curd"],
      ["Besan Cheela", "Tomato Chutney", "Juice"],
      ["Pasta in Tomato Sauce", "Fruit Salad", "Milk"],
      ["Puri Bhaji", "Halwa", "Lassi"],
    ],
    cholesterol: [
      ["Oats Upma", "Mixed Sprouts", "Green Tea"],
      ["Brown Rice", "Fish Curry", "Salad"],
      ["Barley Roti", "Dal Palak", "Raita"],
      ["Multigrain Paratha", "Soya Bhurji", "Buttermilk"],
      ["Quinoa Pulao", "Rajma", "Salad"],
      ["Bajra Roti", "Baingan Bharta", "Dal"],
      ["Steamed Rice", "Methi Dal", "Jeera Curd"],
    ],
  },
  "south-indian": {
    pcos: [
      ["Ragi Dosa", "Sambar", "Coconut Chutney"],
      ["Oats Idli", "Peanut Chutney", "Filter Coffee"],
      ["Quinoa Upma", "Tomato Chutney", "Buttermilk"],
      ["Millet Pongal", "Sambar", "Rasam"],
      ["Pesarattu", "Ginger Chutney", "Lemon Water"],
      ["Brown Rice", "Sambar", "Thoran"],
      ["Kozhukattai", "Coconut Chutney", "Herbal Tea"],
    ],
    diabetes: [
      ["Ragi Mudde", "Sambar", "Rasam"],
      ["Oats Upma", "Coconut Chutney", "Buttermilk"],
      ["Kambu Dosa", "Tomato Chutney", "Sambar"],
      ["Millet Rice", "Dal Curry", "Vegetable Poriyal"],
      ["Pesarattu", "Ginger Chutney", "Sprout Salad"],
      ["Kollu Rasam", "Brown Rice", "Bitter Gourd Poriyal"],
      ["Ragi Kanji", "Onion Chutney", "Pappad"],
    ],
  },
  bengali: {
    pcos: [
      ["Ragi Roti", "Shorshe Begun", "Dal"],
      ["Oats Khichuri", "Mixed Vegetable", "Curd"],
      ["Multigrain Luchi", "Alur Dom (light)", "Salad"],
      ["Brown Rice", "Macher Jhol (fish curry)", "Shak Bhaja"],
      ["Cholar Dal", "Chapati", "Raita"],
      ["Moong Dal Khichdi", "Ghee", "Achar"],
      ["Sattoo Sattu", "Banana Flower Curry", "Buttermilk"],
    ],
    diabetes: [
      ["Ragi Roti", "Bitter Gourd Curry", "Dal"],
      ["Oats Khichuri", "Mixed Veg", "Raita"],
      ["Jowar Roti", "Fish Gravy", "Salad"],
      ["Brown Rice", "Shukto (mixed veg)", "Dal"],
      ["Cholar Dal", "Multigrain Roti", "Curd"],
      ["Moong Dal", "Begun Bhaja", "Rice"],
      ["Sattu Sharbat", "Lau Ghonto", "Chapati"],
    ],
  },
};

export function getDishes(conditionId: string, regionId: string): string[][] {
  return (
    sampleDishes[regionId]?.[conditionId] ||
    sampleDishes["north-indian"]?.[conditionId] ||
    [
      ["Oats Porridge", "Mixed Fruits", "Nuts"],
      ["Dal Rice", "Vegetable Curry", "Salad"],
      ["Multigrain Roti", "Lentil Soup", "Curd"],
      ["Quinoa Bowl", "Grilled Vegetables", "Buttermilk"],
      ["Millet Khichdi", "Raita", "Pickle"],
      ["Sprout Salad", "Soup", "Whole Grain Bread"],
      ["Legume Curry", "Brown Rice", "Green Salad"],
    ]
  );
}
