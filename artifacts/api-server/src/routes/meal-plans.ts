import { Router } from "express";
import { db } from "@workspace/db";
import {
  profilesTable,
  dishesTable,
  mealPlansTable,
  dishPreferencesTable,
} from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { requireAuth } from "../lib/auth-middleware";
import { openai } from "../lib/openai-client";

const router = Router();

type MealSlot = "breakfast" | "lunch" | "snack" | "dinner";

type PlanDay = {
  dayIndex: number;
  breakfastId: number | null;
  lunchId: number | null;
  snackId: number | null;
  dinnerId: number | null;
  lockedSlots: string[];
};

type DishRow = typeof dishesTable.$inferSelect;

function formatDish(d: DishRow) {
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
      gymSafe: d.gymSafe,
      gymCategories: d.gymCategories ?? [],
      cholesterolSafe: d.cholesterolSafe,
      lowGi: d.lowGi,
      highCalcium: d.highCalcium,
      highFibre: d.highFibre,
      deepFried: d.deepFried,
      pregnancyExclude: d.pregnancyExclude,
    },
    benefitsPcos: d.benefitsPcos,
    benefitsDiabetes: d.benefitsDiabetes,
    benefitsThyroid: d.benefitsThyroid,
    benefitsPregnancy: d.benefitsPregnancy,
    benefitsKids: d.benefitsKids,
    benefitsGym: d.benefitsGym,
    benefitsCholesterol: d.benefitsCholesterol,
  };
}

// Region values stored in profile → dish region tags they map to
// Handles both short ('North') and long ('North India') forms for backward compat
const REGION_TAGS: Record<string, string[]> = {
  north:          ["North", "North India", "Punjab", "Rajasthan", "Kashmir", "UP", "Pan India"],
  south:          ["South", "South India", "Kerala", "Karnataka", "Tamil Nadu", "Andhra", "Telangana", "Hyderabad", "Pan India"],
  east:           ["East", "East India", "Bengal", "Odisha", "Jharkhand", "Pan India"],
  west:           ["West", "West India", "Maharashtra", "Gujarat", "Goa", "Coastal India", "Pan India"],
  northeast:      ["Northeast", "North East", "Northeast India", "Assam", "Manipur", "Meghalaya", "Nagaland", "Pan India"],
};

const REGION_MAP: Record<string, string[]> = {
  // Short forms (existing onboarding values)
  "North":          REGION_TAGS.north,
  "South":          REGION_TAGS.south,
  "East":           REGION_TAGS.east,
  "West":           REGION_TAGS.west,
  "Northeast":      REGION_TAGS.northeast,
  // Long forms (new canonical values)
  "North India":    REGION_TAGS.north,
  "South India":    REGION_TAGS.south,
  "East India":     REGION_TAGS.east,
  "West India":     REGION_TAGS.west,
  "Northeast India":REGION_TAGS.northeast,
  // Lowercased / hyphenated variants (safety)
  "north":          REGION_TAGS.north,
  "south":          REGION_TAGS.south,
  "east":           REGION_TAGS.east,
  "west":           REGION_TAGS.west,
  "northeast":      REGION_TAGS.northeast,
  "north-india":    REGION_TAGS.north,
  "south-india":    REGION_TAGS.south,
  "east-india":     REGION_TAGS.east,
  "west-india":     REGION_TAGS.west,
  "northeast-india":REGION_TAGS.northeast,
  // No-filter values
  "Mix":     [],
  "mix":     [],
  "General": [],
  "general": [],
};

function filterDishesByRegion(dishes: DishRow[], region: string | null | undefined): DishRow[] {
  if (!region) return dishes;
  const regionKey = region.trim();
  const allowed = REGION_MAP[regionKey];
  // Mix, General, or unknown region → no filter
  if (!allowed || allowed.length === 0) return dishes;

  const filtered = dishes.filter((d) => {
    const tags = d.region as string[] | null;
    if (!tags || tags.length === 0) return true; // untagged dishes always included
    return tags.some((r) =>
      allowed.some((a) => r.toLowerCase() === a.toLowerCase())
    );
  });

  // Safety: if filter is too aggressive (< 15 dishes), fall back to full pool
  if (filtered.length < 15) {
    console.warn(`Region filter "${region}" returned only ${filtered.length} dishes — falling back to full pool`);
    return dishes;
  }

  return filtered;
}

function filterDishesByTrack(dishes: DishRow[], track: string | null) {
  if (!track) return dishes;
  return dishes.filter((d) => {
    if (track === "pcos") return d.pcosSafe && !d.deepFried;
    if (track === "diabetes") return d.diabetesSafe && d.lowGi;
    if (track === "thyroid") return d.thyroidSafe;
    if (track === "pregnancy") return d.pregnancySafe && !d.pregnancyExclude;
    if (track === "kids") return d.kidsSafe;
    if (track === "fitness") return d.gymSafe;
    if (track === "cholesterol") return d.cholesterolSafe && !d.deepFried;
    return true;
  });
}

function getDishesByMealType(dishes: DishRow[], mealType: MealSlot) {
  return dishes.filter((d) => d.mealType.includes(mealType));
}

function pickRandom<T>(arr: T[]): T | null {
  if (!arr.length) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

async function buildPlanDays(
  filteredDishes: DishRow[],
  existingPlan?: PlanDay[],
  fallbackDishes?: DishRow[]
): Promise<PlanDay[]> {
  const mealSlots: MealSlot[] = ["breakfast", "lunch", "snack", "dinner"];
  const days: PlanDay[] = [];

  for (let i = 0; i < 7; i++) {
    const existing = existingPlan?.[i];
    const day: PlanDay = {
      dayIndex: i,
      breakfastId: null,
      lunchId: null,
      snackId: null,
      dinnerId: null,
      lockedSlots: existing?.lockedSlots ?? [],
    };

    for (const slot of mealSlots) {
      const slotKey = `${slot}Id` as keyof PlanDay;
      if (existing?.lockedSlots?.includes(slot) && existing[slotKey]) {
        (day as any)[slotKey] = existing[slotKey];
      } else {
        let candidates = getDishesByMealType(filteredDishes, slot);
        // Safety: fall back to track-only pool if region narrows too much
        if (candidates.length === 0 && fallbackDishes) {
          candidates = getDishesByMealType(fallbackDishes, slot);
        }
        const picked = pickRandom(candidates);
        (day as any)[slotKey] = picked?.id ?? null;
      }
    }
    days.push(day);
  }
  return days;
}

async function generateWithAI(
  filteredDishes: DishRow[],
  profile: typeof profilesTable.$inferSelect,
  existingPlan?: PlanDay[],
  fallbackDishes?: DishRow[]
): Promise<PlanDay[]> {
  // Shuffle before slicing so the AI sees a representative sample, not DB-insertion order
  const shuffled = [...filteredDishes].sort(() => Math.random() - 0.5);
  const dishSummary = shuffled.slice(0, 60).map((d) => ({
    id: d.id,
    name: d.name,
    region: d.region,
    mealType: d.mealType,
    cal: d.cal,
  }));

  const prompt = `You are a nutrition expert specializing in Indian regional cuisine. Create a 7-day Indian meal plan for someone with the following profile:
- Health track: ${profile.primaryTrack || "general"}
- Diet type: ${profile.dietType || "vegetarian"}
- Region preference: ${profile.region || "North"} — IMPORTANT: Strongly prefer dishes whose region tag matches or includes "${profile.region || "North"}" or "Pan India". Avoid dishes from unrelated regions.
- Allergies: ${(profile.allergies as string[])?.join(", ") || "none"}

Use ONLY dishes from this list (use dish IDs exactly as given):
${JSON.stringify(dishSummary, null, 2)}

Rules:
1. Each dish ID must appear in the list above — do not invent IDs.
2. Each dish must match its mealType (breakfast/lunch/snack/dinner).
3. Prefer dishes whose region matches the user's region preference.
4. Vary dishes across the 7 days — avoid repeating the same dish more than twice.

Return a JSON array with exactly 7 objects (dayIndex 0-6):
{ "dayIndex": number, "breakfastId": number, "lunchId": number, "snackId": number, "dinnerId": number, "lockedSlots": [] }

Return ONLY valid JSON, no markdown, no explanation.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5-mini",
      max_completion_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.choices[0]?.message?.content ?? "";
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]) as PlanDay[];
      // Apply locked slots from existing plan
      if (existingPlan) {
        for (let i = 0; i < 7; i++) {
          const existing = existingPlan[i];
          const day = parsed[i];
          if (existing && day) {
            day.lockedSlots = existing.lockedSlots;
            for (const slot of existing.lockedSlots) {
              const slotKey = `${slot}Id` as keyof PlanDay;
              if (existing[slotKey]) (day as any)[slotKey] = existing[slotKey];
            }
          }
        }
      }
      return parsed;
    }
  } catch (e) {
    // fallback to random
  }
  return buildPlanDays(filteredDishes, existingPlan, fallbackDishes);
}

async function hydratePlan(
  plan: typeof mealPlansTable.$inferSelect,
  allDishes: DishRow[]
) {
  const dishMap = new Map(allDishes.map((d) => [d.id, d]));
  const days = (plan.planData as PlanDay[]).map((day) => ({
    dayIndex: day.dayIndex,
    lockedSlots: day.lockedSlots,
    breakfast: day.breakfastId ? formatDish(dishMap.get(day.breakfastId)!) : null,
    lunch: day.lunchId ? formatDish(dishMap.get(day.lunchId)!) : null,
    snack: day.snackId ? formatDish(dishMap.get(day.snackId)!) : null,
    dinner: day.dinnerId ? formatDish(dishMap.get(day.dinnerId)!) : null,
  }));
  return {
    id: plan.id,
    days,
    createdAt: plan.createdAt.toISOString(),
  };
}

router.get("/meal-plans/active", requireAuth, async (req, res) => {
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
    .orderBy(mealPlansTable.createdAt)
    .limit(1);

  if (!plan[0]) {
    res.status(404).json({ error: "No active meal plan" });
    return;
  }

  const allDishes = await db.select().from(dishesTable);
  const hydratedPlan = await hydratePlan(plan[0], allDishes);
  const planIsStale = profile[0].planInvalidatedAt
    ? plan[0].createdAt < profile[0].planInvalidatedAt
    : false;
  res.json({ ...hydratedPlan, planIsStale });
});

router.post("/meal-plans/generate", requireAuth, async (req, res) => {
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

  const allDishes = await db.select().from(dishesTable);
  const byRegion = filterDishesByRegion(allDishes, profile[0].region);
  const filtered = filterDishesByTrack(byRegion, profile[0].primaryTrack);
  // Fallback pool: track-filtered only (no region), used if region yields too few dishes
  const trackFallback = filterDishesByTrack(allDishes, profile[0].primaryTrack);

  // Get existing active plan for locked slots
  const existing = await db
    .select()
    .from(mealPlansTable)
    .where(
      and(
        eq(mealPlansTable.profileId, profile[0].id),
        eq(mealPlansTable.isActive, true)
      )
    )
    .limit(1);

  const existingPlanData = existing[0]?.planData as PlanDay[] | undefined;

  // Deactivate old plans
  await db
    .update(mealPlansTable)
    .set({ isActive: false })
    .where(eq(mealPlansTable.profileId, profile[0].id));

  // Generate new plan (region-filtered dishes; fallback to track-only if region too narrow)
  const planDays = await generateWithAI(filtered, profile[0], existingPlanData, trackFallback);

  const [newPlan] = await db
    .insert(mealPlansTable)
    .values({
      profileId: profile[0].id,
      isActive: true,
      planData: planDays,
    })
    .returning();

  res.json(await hydratePlan(newPlan, allDishes));
});

router.post("/meal-plans/swap", requireAuth, async (req, res) => {
  const clerkUserId = (req as any).clerkUserId as string;
  const { planId, dayIndex, mealType, currentDishId } = req.body;

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
    .where(eq(mealPlansTable.id, planId))
    .limit(1);

  if (!plan[0]) {
    res.status(404).json({ error: "Plan not found" });
    return;
  }

  const allDishes = await db.select().from(dishesTable);
  const byRegion = filterDishesByRegion(allDishes, profile[0].region);
  const filtered = filterDishesByTrack(byRegion, profile[0].primaryTrack);
  const candidates = getDishesByMealType(filtered, mealType as MealSlot).filter(
    (d) => d.id !== currentDishId
  );

  const newDish = pickRandom(candidates);
  if (!newDish) {
    res.status(400).json({ error: "No suitable replacement dish found" });
    return;
  }

  const planData = plan[0].planData as PlanDay[];
  const dayData = planData.find((d) => d.dayIndex === dayIndex);
  if (dayData) {
    (dayData as any)[`${mealType}Id`] = newDish.id;
  }

  await db
    .update(mealPlansTable)
    .set({ planData })
    .where(eq(mealPlansTable.id, planId));

  const formattedDish = formatDish(newDish);
  res.json(formattedDish);
});

router.post("/meal-plans/lock", requireAuth, async (req, res) => {
  const { planId, dayIndex, mealType, locked } = req.body;

  const plan = await db
    .select()
    .from(mealPlansTable)
    .where(eq(mealPlansTable.id, planId))
    .limit(1);

  if (!plan[0]) {
    res.status(404).json({ error: "Plan not found" });
    return;
  }

  const planData = plan[0].planData as PlanDay[];
  const dayData = planData.find((d) => d.dayIndex === dayIndex);
  if (dayData) {
    if (locked && !dayData.lockedSlots.includes(mealType)) {
      dayData.lockedSlots.push(mealType);
    } else if (!locked) {
      dayData.lockedSlots = dayData.lockedSlots.filter((s) => s !== mealType);
    }
  }

  await db
    .update(mealPlansTable)
    .set({ planData })
    .where(eq(mealPlansTable.id, planId));

  res.json({ locked });
});

router.get("/meal-plans/dashboard", requireAuth, async (req, res) => {
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

  const allDishes = await db.select().from(dishesTable);
  const dishMap = new Map(allDishes.map((d) => [d.id, d]));

  const today = new Date().getDay(); // 0 = Sunday, etc.
  const todayIndex = (today + 6) % 7; // adjust to Mon=0

  let todayMeals = null;
  let totalCalories = 0;

  if (plan[0]) {
    const planData = plan[0].planData as PlanDay[];
    const todayData = planData[todayIndex] ?? planData[0];

    const breakfastDish = todayData?.breakfastId
      ? dishMap.get(todayData.breakfastId)
      : null;
    const lunchDish = todayData?.lunchId
      ? dishMap.get(todayData.lunchId)
      : null;
    const snackDish = todayData?.snackId
      ? dishMap.get(todayData.snackId)
      : null;
    const dinnerDish = todayData?.dinnerId
      ? dishMap.get(todayData.dinnerId)
      : null;

    todayMeals = {
      dayIndex: todayData?.dayIndex ?? 0,
      lockedSlots: todayData?.lockedSlots ?? [],
      breakfast: breakfastDish ? formatDish(breakfastDish) : null,
      lunch: lunchDish ? formatDish(lunchDish) : null,
      snack: snackDish ? formatDish(snackDish) : null,
      dinner: dinnerDish ? formatDish(dinnerDish) : null,
    };

    totalCalories =
      (breakfastDish?.cal ?? 0) +
      (lunchDish?.cal ?? 0) +
      (snackDish?.cal ?? 0) +
      (dinnerDish?.cal ?? 0);
  }

  // Simple BMR-based calorie target (Mifflin-St Jeor)
  const weight = profile[0].weightKg ?? 65;
  const height = profile[0].heightCm ?? 165;
  const ageYears = 30; // estimate from age range
  const isFemale = profile[0].gender === "female";
  const bmr = isFemale
    ? 10 * weight + 6.25 * height - 5 * ageYears - 161
    : 10 * weight + 6.25 * height - 5 * ageYears + 5;
  const targetCalories = Math.round(bmr * 1.375); // light activity

  const tips: Record<string, string> = {
    pcos: "Add a handful of seeds to your morning meal — flax or pumpkin seeds can help balance hormones.",
    diabetes:
      "Pair your carbs with protein and fibre to keep blood sugar stable throughout the day.",
    thyroid:
      "Selenium-rich foods like Brazil nuts and sunflower seeds support healthy thyroid function.",
    pregnancy:
      "Iron absorption improves with Vitamin C — have a small glass of amla juice with your iron-rich meals.",
    kids: "Make mealtimes fun — let kids help wash vegetables or choose between two healthy options.",
    cholesterol: "Swap saturated fats for healthy ones — mustard oil, walnuts, and flaxseeds support heart-healthy cholesterol levels.",
    general:
      "Staying hydrated helps digestion — aim for 8 glasses of water spread through the day.",
  };

  const planIsStale = plan[0] && profile[0].planInvalidatedAt
    ? plan[0].createdAt < profile[0].planInvalidatedAt
    : false;

  res.json({
    profile: {
      ...profile[0],
      createdAt: profile[0].createdAt.toISOString(),
      subscriptionEndDate:
        profile[0].subscriptionEndDate?.toISOString() ?? null,
    },
    todayMeals,
    totalCalories,
    targetCalories,
    planIsStale,
    tipOfDay: tips[profile[0].primaryTrack ?? "general"] ?? tips.general,
  });
});

export default router;
