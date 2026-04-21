import { Router } from "express";
import { db } from "@workspace/db";
import { profilesTable, dishPreferencesTable, mealPlansTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { requireAuth } from "../lib/auth-middleware";

const router = Router();

router.get("/profiles/me", requireAuth, async (req, res) => {
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
  res.json({
    ...profile[0],
    createdAt: profile[0].createdAt.toISOString(),
    subscriptionEndDate: profile[0].subscriptionEndDate?.toISOString() ?? null,
  });
});

router.put("/profiles/me", requireAuth, async (req, res) => {
  const clerkUserId = (req as any).clerkUserId as string;
  const body = req.body;

  const existing = await db
    .select()
    .from(profilesTable)
    .where(eq(profilesTable.clerkUserId, clerkUserId))
    .limit(1);

  let result;
  let planInvalidated = false;

  // Detect whether plan-invalidating fields are changing
  const planFields: Array<keyof typeof body> = ["region", "primaryTrack", "dietType", "allergies"];
  if (existing[0]) {
    const changed = planFields.some((field) => {
      const incoming = body[field];
      if (incoming === undefined) return false;
      const current = existing[0][field as keyof typeof existing[0]];
      return JSON.stringify(incoming) !== JSON.stringify(current);
    });

    const now = changed ? new Date() : undefined;

    const [updated] = await db
      .update(profilesTable)
      .set({
        name: body.name ?? existing[0].name,
        ageRange: body.ageRange ?? existing[0].ageRange,
        gender: body.gender ?? existing[0].gender,
        heightCm: body.heightCm ?? existing[0].heightCm,
        weightKg: body.weightKg ?? existing[0].weightKg,
        familySize: body.familySize ?? existing[0].familySize,
        primaryTrack: body.primaryTrack ?? existing[0].primaryTrack,
        region: body.region ?? existing[0].region,
        dietType: body.dietType ?? existing[0].dietType,
        proteinPreferences:
          body.proteinPreferences ?? existing[0].proteinPreferences,
        conditionData: body.conditionData ?? existing[0].conditionData,
        weekdayCookTime: body.weekdayCookTime ?? existing[0].weekdayCookTime,
        weekendCookTime: body.weekendCookTime ?? existing[0].weekendCookTime,
        allergies: body.allergies ?? existing[0].allergies,
        onboardingComplete:
          body.onboardingComplete ?? existing[0].onboardingComplete,
        ...(now ? { planInvalidatedAt: now } : {}),
      })
      .where(eq(profilesTable.clerkUserId, clerkUserId))
      .returning();
    result = updated;

    // If plan-invalidating fields changed, deactivate the active plan
    if (changed) {
      planInvalidated = true;
      await db
        .update(mealPlansTable)
        .set({ isActive: false })
        .where(
          and(
            eq(mealPlansTable.profileId, existing[0].id),
            eq(mealPlansTable.isActive, true)
          )
        );
    }
  } else {
    const [created] = await db
      .insert(profilesTable)
      .values({ clerkUserId, ...body })
      .returning();
    result = created;
  }

  const changedField = body.region ? "region"
    : body.primaryTrack ? "health track"
    : body.dietType ? "diet"
    : "preferences";

  res.json({
    profile: {
      ...result,
      createdAt: result.createdAt.toISOString(),
      subscriptionEndDate: result.subscriptionEndDate?.toISOString() ?? null,
    },
    planInvalidated,
    message: planInvalidated
      ? `Your meal plan has been reset to match your new ${changedField} preferences. Generate your new plan from the dashboard.`
      : "Profile updated",
  });
});

router.put("/dish-preferences", requireAuth, async (req, res) => {
  const clerkUserId = (req as any).clerkUserId as string;
  const { favouriteDishIds, dislikedDishIds } = req.body;

  const profile = await db
    .select()
    .from(profilesTable)
    .where(eq(profilesTable.clerkUserId, clerkUserId))
    .limit(1);

  if (!profile[0]) {
    res.status(404).json({ error: "Profile not found" });
    return;
  }

  const existing = await db
    .select()
    .from(dishPreferencesTable)
    .where(eq(dishPreferencesTable.profileId, profile[0].id))
    .limit(1);

  let result;
  if (existing[0]) {
    const [updated] = await db
      .update(dishPreferencesTable)
      .set({ favouriteDishIds, dislikedDishIds })
      .where(eq(dishPreferencesTable.profileId, profile[0].id))
      .returning();
    result = updated;
  } else {
    const [created] = await db
      .insert(dishPreferencesTable)
      .values({ profileId: profile[0].id, favouriteDishIds, dislikedDishIds })
      .returning();
    result = created;
  }
  res.json({
    favouriteDishIds: result.favouriteDishIds,
    dislikedDishIds: result.dislikedDishIds,
  });
});

export default router;
