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
  rice: "Grains",
  wheat: "Grains",
  roti: "Grains",
  bread: "Grains",
  oats: "Grains",
  poha: "Grains",
  suji: "Grains",
  atta: "Grains",
  milk: "Dairy",
  curd: "Dairy",
  yogurt: "Dairy",
  paneer: "Dairy",
  ghee: "Dairy",
  butter: "Dairy",
  cheese: "Dairy",
  dal: "Pulses",
  lentil: "Pulses",
  chana: "Pulses",
  rajma: "Pulses",
  moong: "Pulses",
  urad: "Pulses",
  chicken: "Protein",
  egg: "Protein",
  fish: "Protein",
  mutton: "Protein",
  tofu: "Protein",
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
  banana: "Fruits",
  apple: "Fruits",
  mango: "Fruits",
  orange: "Fruits",
  pomegranate: "Fruits",
  berries: "Fruits",
  oil: "Spices & Oil",
  turmeric: "Spices & Oil",
  cumin: "Spices & Oil",
  coriander: "Spices & Oil",
  chili: "Spices & Oil",
  garam: "Spices & Oil",
  mustard: "Spices & Oil",
  salt: "Spices & Oil",
  ginger: "Spices & Oil",
  garlic: "Spices & Oil",
  pepper: "Spices & Oil",
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
