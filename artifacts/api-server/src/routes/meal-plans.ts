import { Router } from "express";
import { db } from "@workspace/db";
import {
  profilesTable,
  dishesTable,
  mealPlansTable,
  dishPreferencesTable,
} from "@workspace/db";
import { eq, and, desc, ne } from "drizzle-orm";
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
  // State-level options
  "Maharashtra":      ["Maharashtra", "West", "West India", "Coastal India", "Pan India"],
  "maharashtra":     ["Maharashtra", "West", "West India", "Coastal India", "Pan India"],
  "Gujarat":         ["Gujarat", "West", "West India", "Pan India"],
  "gujarat":         ["Gujarat", "West", "West India", "Pan India"],
  "Punjab":          ["Punjab", "North", "North India", "Pan India"],
  "punjab":          ["Punjab", "North", "North India", "Pan India"],
  "Kerala":          ["Kerala", "South", "South India", "Coastal India", "Pan India"],
  "kerala":          ["Kerala", "South", "South India", "Coastal India", "Pan India"],
  "Bengal":          ["Bengal", "East", "East India", "Pan India"],
  "bengal":          ["Bengal", "East", "East India", "Pan India"],
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

  // Safety: if filter is too aggressive (< 20 dishes), fall back to full pool
  if (filtered.length < 20) {
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
    if (track === "vrat") return d.vratSafe;
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
  fallbackDishes?: DishRow[],
  allDishes?: DishRow[]
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
        // Level 1: region + track filtered pool
        let candidates = getDishesByMealType(filteredDishes, slot);
        // Level 2: track-only pool (drop region constraint)
        if (candidates.length === 0 && fallbackDishes) {
          candidates = getDishesByMealType(fallbackDishes, slot);
        }
        // Level 3: ultimate fallback — any dish of this meal type from the entire DB
        if (candidates.length === 0 && allDishes) {
          candidates = getDishesByMealType(allDishes, slot);
          if (candidates.length > 0) {
            console.warn(`[buildPlanDays] Ultimate fallback used for slot=${slot} day=${i}`);
          }
        }
        const picked = pickRandom(candidates);
        (day as any)[slotKey] = picked?.id ?? null;
        if (!picked) {
          console.error(`[buildPlanDays] No dish found for slot=${slot} day=${i} — this should never happen`);
        }
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
  fallbackDishes?: DishRow[],
  allDishes?: DishRow[]
): Promise<PlanDay[]> {
  const mealSlots: MealSlot[] = ["breakfast", "lunch", "snack", "dinner"];

  // Build a stratified sample: pick dishes evenly across meal types to guarantee coverage
  const bySlot: Record<MealSlot, DishRow[]> = {
    breakfast: getDishesByMealType(filteredDishes, "breakfast"),
    lunch: getDishesByMealType(filteredDishes, "lunch"),
    snack: getDishesByMealType(filteredDishes, "snack"),
    dinner: getDishesByMealType(filteredDishes, "dinner"),
  };

  // If any slot is empty in filteredDishes, top it up from fallback then from allDishes
  const poolForSlot = (slot: MealSlot): DishRow[] => {
    if (bySlot[slot].length > 0) return bySlot[slot];
    const fb = fallbackDishes ? getDishesByMealType(fallbackDishes, slot) : [];
    if (fb.length > 0) return fb;
    return allDishes ? getDishesByMealType(allDishes, slot) : [];
  };

  // Pick up to 14 per slot (2 per day), shuffle each, merge into a deduped list
  const seen = new Set<number>();
  const sampleDishes: DishRow[] = [];
  for (const slot of mealSlots) {
    const pool = [...poolForSlot(slot)].sort(() => Math.random() - 0.5).slice(0, 14);
    for (const d of pool) {
      if (!seen.has(d.id)) { seen.add(d.id); sampleDishes.push(d); }
    }
  }
  // Also shuffle in some extra from filteredDishes if pool is large enough
  for (const d of [...filteredDishes].sort(() => Math.random() - 0.5).slice(0, 20)) {
    if (!seen.has(d.id)) { seen.add(d.id); sampleDishes.push(d); }
  }

  const dishSummary = sampleDishes.map((d) => ({
    id: d.id,
    name: d.name,
    mealType: d.mealType,
    cal: d.cal,
  }));

  // Build a valid-ID map for quick lookup and post-generation validation
  const dishById = new Map(sampleDishes.map((d) => [d.id, d]));
  // Also include allDishes in the validation map (needed for locked-slot repair)
  if (allDishes) {
    for (const d of allDishes) {
      if (!dishById.has(d.id)) dishById.set(d.id, d);
    }
  }

  const isVrat = profile.primaryTrack === "vrat";
  const prompt = `You are a nutrition expert specializing in Indian regional cuisine. Create a 7-day Indian meal plan.

Profile:
- Health track: ${profile.primaryTrack || "general"}${isVrat ? " (Vrat/Hindu fasting — only vrat-safe dishes)" : ""}
- Diet type: ${profile.dietType || "vegetarian"}
- Region: ${profile.region || "North India"}
- Allergies: ${(profile.allergies as string[])?.join(", ") || "none"}

Available dishes (ONLY use IDs from this list — do NOT invent new IDs):
${JSON.stringify(dishSummary)}

Rules:
1. Use ONLY the dish IDs listed above — never invent IDs.
2. breakfastId must come from a dish whose mealType includes "breakfast".
3. lunchId must come from a dish whose mealType includes "lunch".
4. snackId must come from a dish whose mealType includes "snack".
5. dinnerId must come from a dish whose mealType includes "dinner".
6. Vary dishes — avoid repeating the same dish more than twice across the 7 days.

Return a JSON array with exactly 7 objects (dayIndex 0–6):
[{"dayIndex":0,"breakfastId":number,"lunchId":number,"snackId":number,"dinnerId":number,"lockedSlots":[]},...]

Return ONLY the JSON array, no markdown or explanation.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_completion_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.choices[0]?.message?.content ?? "";
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]) as PlanDay[];

      // --- Post-generation validation: fix any hallucinated or wrong-meal-type IDs ---
      const repairSlot = (slot: MealSlot, dishId: number | null): number | null => {
        if (!dishId) return null;
        const dish = dishById.get(dishId);
        // Valid if dish exists AND it includes this meal type
        if (dish && (dish.mealType as string[]).includes(slot)) return dishId;
        // Invalid — pick a random valid one from the pool
        console.warn(`[generateWithAI] Invalid ${slot}Id=${dishId} — repairing`);
        const pool = poolForSlot(slot);
        return pickRandom(pool)?.id ?? null;
      };

      for (const day of parsed) {
        day.breakfastId = repairSlot("breakfast", day.breakfastId);
        day.lunchId = repairSlot("lunch", day.lunchId);
        day.snackId = repairSlot("snack", day.snackId);
        day.dinnerId = repairSlot("dinner", day.dinnerId);
      }

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

      // Ensure exactly 7 days with sequential dayIndex
      if (parsed.length === 7) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("[generateWithAI] AI generation failed, using random fallback:", e);
  }
  return buildPlanDays(filteredDishes, existingPlan, fallbackDishes, allDishes);
}

function safeFormatDish(dishMap: Map<number, DishRow>, id: number | null): ReturnType<typeof formatDish> | null {
  if (!id) return null;
  const dish = dishMap.get(id);
  if (!dish) {
    console.warn(`[hydratePlan] Dish ID ${id} not found in dishes table — skipping`);
    return null;
  }
  return formatDish(dish);
}

async function hydratePlan(
  plan: typeof mealPlansTable.$inferSelect,
  allDishes: DishRow[]
) {
  const dishMap = new Map(allDishes.map((d) => [d.id, d]));
  const days = (plan.planData as PlanDay[]).map((day) => ({
    dayIndex: day.dayIndex,
    lockedSlots: day.lockedSlots,
    breakfast: safeFormatDish(dishMap, day.breakfastId),
    lunch: safeFormatDish(dishMap, day.lunchId),
    snack: safeFormatDish(dishMap, day.snackId),
    dinner: safeFormatDish(dishMap, day.dinnerId),
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
    .orderBy(desc(mealPlansTable.createdAt))
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

  // Generate new plan (region-filtered dishes; fallback to track-only, then all dishes)
  const planDays = await generateWithAI(filtered, profile[0], existingPlanData, trackFallback, allDishes);

  const [newPlan] = await db
    .insert(mealPlansTable)
    .values({
      profileId: profile[0].id,
      isActive: true,
      planData: planDays,
    })
    .returning();

  // Second deactivation pass: ensures any concurrent generation doesn't leave
  // multiple active plans (race condition guard)
  await db
    .update(mealPlansTable)
    .set({ isActive: false })
    .where(
      and(
        eq(mealPlansTable.profileId, profile[0].id),
        eq(mealPlansTable.isActive, true),
        ne(mealPlansTable.id, newPlan.id)
      )
    );

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
    .where(and(eq(mealPlansTable.id, planId), eq(mealPlansTable.isActive, true)))
    .limit(1);

  if (!plan[0]) {
    res.status(404).json({ error: "Plan not found or no longer active. Please generate a new plan." });
    return;
  }

  const allDishes = await db.select().from(dishesTable);
  const byRegion = filterDishesByRegion(allDishes, profile[0].region);
  const filtered = filterDishesByTrack(byRegion, profile[0].primaryTrack);

  // Progressive fallback: relax constraints until we find a candidate
  let candidates = getDishesByMealType(filtered, mealType as MealSlot).filter(
    (d) => d.id !== currentDishId
  );

  // Fallback 1: drop region filter, keep track
  if (candidates.length === 0) {
    const trackOnly = filterDishesByTrack(allDishes, profile[0].primaryTrack);
    candidates = getDishesByMealType(trackOnly, mealType as MealSlot).filter(
      (d) => d.id !== currentDishId
    );
    if (candidates.length > 0) console.info(`[swap] Region fallback used for mealType=${mealType}`);
  }

  // Fallback 2: any dish of that meal type (no region or track filter)
  if (candidates.length === 0) {
    candidates = getDishesByMealType(allDishes, mealType as MealSlot).filter(
      (d) => d.id !== currentDishId
    );
    if (candidates.length > 0) console.info(`[swap] Full fallback used for mealType=${mealType}`);
  }

  // Fallback 3: include the current dish as last resort (prevents hard failure)
  if (candidates.length === 0) {
    candidates = getDishesByMealType(allDishes, mealType as MealSlot);
  }

  const newDish = pickRandom(candidates);
  if (!newDish) {
    res.status(400).json({ error: "No dishes available for this meal type." });
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

  const todayDayIndex = (new Date().getDay() + 6) % 7; // Mon=0, Tue=1, ..., Sun=6

  let todayMeals = null;
  let totalCalories = 0;

  if (plan[0]) {
    const planData = plan[0].planData as PlanDay[];
    // Use .find() so we correctly match by dayIndex field, not array position
    const todayData = planData.find((d) => d.dayIndex === todayDayIndex) ?? planData[0];

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
