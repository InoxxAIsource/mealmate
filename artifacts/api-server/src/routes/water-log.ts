import { Router } from "express";
import { db, waterLogsTable, profilesTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { requireAuth } from "../lib/auth-middleware";

const router = Router();

export function getTodayIST(): string {
  const istOffset = 5.5 * 60 * 60 * 1000;
  return new Date(Date.now() + istOffset).toISOString().split("T")[0];
}

export function getYesterdayIST(): string {
  const istOffset = 5.5 * 60 * 60 * 1000;
  return new Date(Date.now() + istOffset - 86_400_000).toISOString().split("T")[0];
}

export function getWaterGoal(primaryTrack: string | null | undefined): number {
  if (["pcos", "diabetes", "pregnancy"].includes(primaryTrack ?? "")) return 10;
  return 8;
}

router.get("/water-log/today", requireAuth, async (req, res) => {
  const clerkUserId = (req as any).clerkUserId as string;

  const profiles = await db
    .select()
    .from(profilesTable)
    .where(eq(profilesTable.clerkUserId, clerkUserId))
    .limit(1);

  const profile = profiles[0];
  if (!profile) {
    res.status(404).json({ error: "Profile not found" });
    return;
  }

  const today = getTodayIST();
  const yesterday = getYesterdayIST();
  const goal = getWaterGoal(profile.primaryTrack);

  const logs = await db
    .select()
    .from(waterLogsTable)
    .where(eq(waterLogsTable.profileId, profile.id));

  const todayLog = logs.find((l) => l.date === today);
  const yesterdayLog = logs.find((l) => l.date === yesterday);

  res.json({
    today: { date: today, glasses: todayLog?.glasses ?? 0 },
    yesterday: yesterdayLog ? { date: yesterday, glasses: yesterdayLog.glasses } : null,
    goal,
  });
});

router.post("/water-log/set", requireAuth, async (req, res) => {
  const clerkUserId = (req as any).clerkUserId as string;
  const { glasses } = req.body as { glasses: number };

  if (typeof glasses !== "number" || glasses < 0 || glasses > 20) {
    res.status(400).json({ error: "glasses must be a number between 0 and 20" });
    return;
  }

  const profiles = await db
    .select()
    .from(profilesTable)
    .where(eq(profilesTable.clerkUserId, clerkUserId))
    .limit(1);

  const profile = profiles[0];
  if (!profile) {
    res.status(404).json({ error: "Profile not found" });
    return;
  }

  const today = getTodayIST();

  const existing = await db
    .select()
    .from(waterLogsTable)
    .where(and(eq(waterLogsTable.profileId, profile.id), eq(waterLogsTable.date, today)))
    .limit(1);

  if (existing[0]) {
    await db
      .update(waterLogsTable)
      .set({ glasses, updatedAt: new Date() })
      .where(eq(waterLogsTable.id, existing[0].id));
  } else {
    await db.insert(waterLogsTable).values({
      profileId: profile.id,
      date: today,
      glasses,
    });
  }

  res.json({ date: today, glasses });
});

export default router;
