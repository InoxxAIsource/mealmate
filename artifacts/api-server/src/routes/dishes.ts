import { Router } from "express";
import { db } from "@workspace/db";
import { dishesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

function formatDish(d: typeof dishesTable.$inferSelect) {
  return {
    id: d.id,
    name: d.name,
    photoUrl: d.photoUrl,
    region: d.region,
    dietType: d.dietType,
    mealType: d.mealType,
    ingredients: d.ingredients,
    macros: {
      cal: d.cal,
      protein: d.protein,
      carbs: d.carbs,
      fat: d.fat,
      fibre: d.fibre,
      calcium: d.calcium,
      iron: d.iron,
      sodium: d.sodium,
      sugar: d.sugar,
    },
    prepTimeMin: d.prepTimeMin,
    healthFlags: {
      pcosSafe: d.pcosSafe,
      diabetesSafe: d.diabetesSafe,
      thyroidSafe: d.thyroidSafe,
      pregnancySafe: d.pregnancySafe,
      kidsSafe: d.kidsSafe,
      lowGi: d.lowGi,
      highCalcium: d.highCalcium,
      highFibre: d.highFibre,
      deepFried: d.deepFried,
      pregnancyExclude: d.pregnancyExclude,
    },
    benefitsText: {
      pcos: d.benefitsPcos ?? "",
      diabetes: d.benefitsDiabetes ?? "",
      thyroid: d.benefitsThyroid ?? "",
      pregnancy: d.benefitsPregnancy ?? "",
      kids: d.benefitsKids ?? "",
    },
    benefitsPcos: d.benefitsPcos,
    benefitsDiabetes: d.benefitsDiabetes,
    benefitsThyroid: d.benefitsThyroid,
    benefitsPregnancy: d.benefitsPregnancy,
    benefitsKids: d.benefitsKids,
  };
}

router.get("/dishes", async (_req, res) => {
  const dishes = await db.select().from(dishesTable);
  res.json(dishes.map(formatDish));
});

router.get("/dishes/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid dish ID" });
    return;
  }
  const [dish] = await db
    .select()
    .from(dishesTable)
    .where(eq(dishesTable.id, id))
    .limit(1);

  if (!dish) {
    res.status(404).json({ error: "Dish not found" });
    return;
  }
  res.json(formatDish(dish));
});

export default router;
