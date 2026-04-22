import { Router } from "express";
import { db } from "@workspace/db";
import {
  profilesTable,
  dishesTable,
  mealPlansTable,
} from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { requireAuth } from "../lib/auth-middleware";

const router = Router();

const CATEGORY_MAP: Record<string, string> = {
  // Grains & Flours
  rice: "Grains",
  wheat: "Grains",
  roti: "Grains",
  bread: "Grains",
  oats: "Grains",
  poha: "Grains",
  suji: "Grains",
  atta: "Grains",
  semolina: "Grains",
  vermicelli: "Grains",
  ragi: "Grains",
  millet: "Grains",
  jowar: "Grains",
  bajra: "Grains",
  idli: "Grains",
  dosa: "Grains",
  // Dairy
  milk: "Dairy",
  curd: "Dairy",
  yogurt: "Dairy",
  paneer: "Dairy",
  ghee: "Dairy",
  butter: "Dairy",
  cheese: "Dairy",
  cashews: "Dry Fruits & Nuts",
  peanuts: "Dry Fruits & Nuts",
  coconut: "Dry Fruits & Nuts",
  almond: "Dry Fruits & Nuts",
  sesame: "Dry Fruits & Nuts",
  // Pulses
  dal: "Pulses",
  lentil: "Pulses",
  chana: "Pulses",
  rajma: "Pulses",
  moong: "Pulses",
  urad: "Pulses",
  toor: "Pulses",
  chickpea: "Pulses",
  // Protein
  chicken: "Protein",
  egg: "Protein",
  fish: "Protein",
  mutton: "Protein",
  tofu: "Protein",
  prawn: "Protein",
  shrimp: "Protein",
  // Vegetables
  onion: "Vegetables",
  tomato: "Vegetables",
  spinach: "Vegetables",
  potato: "Vegetables",
  carrot: "Vegetables",
  cauliflower: "Vegetables",
  broccoli: "Vegetables",
  peas: "Vegetables",
  capsicum: "Vegetables",
  palak: "Vegetables",
  methi: "Vegetables",
  pumpkin: "Vegetables",
  cabbage: "Vegetables",
  eggplant: "Vegetables",
  brinjal: "Vegetables",
  vankaya: "Vegetables",
  drumstick: "Vegetables",
  moringa: "Vegetables",
  gongura: "Vegetables",
  "mixed vegetables": "Vegetables",
  beans: "Vegetables",
  ridgegourd: "Vegetables",
  beerakaya: "Vegetables",
  mushroom: "Vegetables",
  // Fruits
  banana: "Fruits",
  apple: "Fruits",
  mango: "Fruits",
  orange: "Fruits",
  pomegranate: "Fruits",
  berries: "Fruits",
  lemon: "Fruits",
  tamarind: "Fruits",
  // Spices & Oil
  oil: "Spices & Oil",
  turmeric: "Spices & Oil",
  cumin: "Spices & Oil",
  coriander: "Spices & Oil",
  chili: "Spices & Oil",
  chilli: "Spices & Oil",
  garam: "Spices & Oil",
  mustard: "Spices & Oil",
  salt: "Spices & Oil",
  ginger: "Spices & Oil",
  garlic: "Spices & Oil",
  pepper: "Spices & Oil",
  "curry leaves": "Spices & Oil",
  curry: "Spices & Oil",
  sambar: "Spices & Oil",
  cardamom: "Spices & Oil",
  fennel: "Spices & Oil",
  fenugreek: "Spices & Oil",
  asafoetida: "Spices & Oil",
  jaggery: "Spices & Oil",
  "baking soda": "Spices & Oil",
};

function categorize(ingredientName: string): string {
  const lower = ingredientName.toLowerCase();
  for (const [key, cat] of Object.entries(CATEGORY_MAP)) {
    if (lower.includes(key)) return cat;
  }
  return "Other";
}

router.get("/grocery-list", requireAuth, async (req, res) => {
  const clerkUserId = (req as any).clerkUserId as string;

  const profile = await db
    .select()
    .from(profilesTable)
    .where(eq(profilesTable.clerkUserId, clerkUserId))
    .limit(1);

  if (!profile[0]) {
    res.status(404).json({ error: "Profile not found" });
    return;
  }

  const plan = await db
    .select()
    .from(mealPlansTable)
    .where(
      and(
        eq(mealPlansTable.profileId, profile[0].id),
        eq(mealPlansTable.isActive, true)
      )
    )
    .limit(1);

  if (!plan[0]) {
    res.json({ categories: [] });
    return;
  }

  const familySizeMap: Record<string, number> = {
    "1": 1,
    "2": 2,
    "3-4": 3.5,
    "5+": 5,
  };
  const familyMultiplier = familySizeMap[profile[0].familySize ?? "1"] ?? 1;

  type PlanDay = {
    breakfastId: number | null;
    lunchId: number | null;
    snackId: number | null;
    dinnerId: number | null;
  };

  const planData = plan[0].planData as PlanDay[];
  const dishIds = new Set<number>();
  for (const day of planData) {
    if (day.breakfastId) dishIds.add(day.breakfastId);
    if (day.lunchId) dishIds.add(day.lunchId);
    if (day.snackId) dishIds.add(day.snackId);
    if (day.dinnerId) dishIds.add(day.dinnerId);
  }

  const allDishes = await db.select().from(dishesTable);
  const dishMap = new Map(allDishes.map((d) => [d.id, d]));

  const ingredientTotals = new Map<string, number>();

  for (const day of planData) {
    const slots = [
      day.breakfastId,
      day.lunchId,
      day.snackId,
      day.dinnerId,
    ].filter(Boolean) as number[];

    for (const dishId of slots) {
      const dish = dishMap.get(dishId);
      if (!dish) continue;
      const ingredients = dish.ingredients as { name: string; grams: number }[];
      for (const ing of ingredients) {
        const current = ingredientTotals.get(ing.name) ?? 0;
        ingredientTotals.set(ing.name, current + ing.grams * familyMultiplier);
      }
    }
  }

  // Group by category
  const categoryMap = new Map<
    string,
    { name: string; totalGrams: number; checked: boolean }[]
  >();

  for (const [name, totalGrams] of ingredientTotals.entries()) {
    const cat = categorize(name);
    if (!categoryMap.has(cat)) categoryMap.set(cat, []);
    categoryMap.get(cat)!.push({ name, totalGrams: Math.round(totalGrams), checked: false });
  }

  const categories = Array.from(categoryMap.entries()).map(
    ([category, items]) => ({ category, items })
  );

  res.json({ categories });
});

export default router;
