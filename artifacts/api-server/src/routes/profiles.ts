import { Router } from "express";
import { db } from "@workspace/db";
import { profilesTable, dishPreferencesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
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
  if (existing[0]) {
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
      })
      .where(eq(profilesTable.clerkUserId, clerkUserId))
      .returning();
    result = updated;
  } else {
    const [created] = await db
      .insert(profilesTable)
      .values({ clerkUserId, ...body })
      .returning();
    result = created;
  }
  res.json({
    ...result,
    createdAt: result.createdAt.toISOString(),
    subscriptionEndDate: result.subscriptionEndDate?.toISOString() ?? null,
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
