import { Router } from "express";
import webpush from "web-push";
import { db, pushSubscriptionsTable, profilesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAuth } from "../lib/auth-middleware";

const router = Router();

const VAPID_PUBLIC_KEY =
  process.env.VAPID_PUBLIC_KEY ||
  "BEGaxuOwvaZzP23cNynscWJtLZqcX1OAPrgZT0MlFQ5jYPnezN0mNBi0WjalgD3lQYOkX7jwzhQPVvuE5Ityj1k";
const VAPID_PRIVATE_KEY =
  process.env.VAPID_PRIVATE_KEY ||
  "-8XzTZUMfCq2n-Iz3bWwlHKUod6CA8m6FDJKL16-NJI";

webpush.setVapidDetails(
  "mailto:mealmate@replit.app",
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

export { VAPID_PUBLIC_KEY, webpush };

// Public — return public VAPID key to frontend
router.get("/notifications/vapid-public-key", (_req, res) => {
  res.json({ publicKey: VAPID_PUBLIC_KEY });
});

// Save a push subscription
router.post("/notifications/subscribe", requireAuth, async (req, res) => {
  const clerkUserId = (req as any).clerkUserId as string;
  const { endpoint, keys } = req.body as {
    endpoint: string;
    keys: { p256dh: string; auth: string };
  };

  if (!endpoint || !keys?.p256dh || !keys?.auth) {
    res.status(400).json({ error: "Invalid subscription object" });
    return;
  }

  const profile = await db
    .select()
    .from(profilesTable)
    .where(eq(profilesTable.clerkUserId, clerkUserId))
    .limit(1);

  if (!profile[0]) {
    res.status(404).json({ error: "Profile not found" });
    return;
  }

  // Upsert: remove old entry for this endpoint, then insert
  await db
    .delete(pushSubscriptionsTable)
    .where(eq(pushSubscriptionsTable.endpoint, endpoint));

  await db.insert(pushSubscriptionsTable).values({
    profileId: profile[0].id,
    endpoint,
    p256dh: keys.p256dh,
    auth: keys.auth,
  });

  res.json({ ok: true });
});

// Remove a push subscription
router.delete("/notifications/unsubscribe", requireAuth, async (req, res) => {
  const { endpoint } = req.body as { endpoint: string };
  if (endpoint) {
    await db
      .delete(pushSubscriptionsTable)
      .where(eq(pushSubscriptionsTable.endpoint, endpoint));
  }
  res.json({ ok: true });
});

// Send a test notification to the requesting user
router.post("/notifications/test", requireAuth, async (req, res) => {
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

  const subs = await db
    .select()
    .from(pushSubscriptionsTable)
    .where(eq(pushSubscriptionsTable.profileId, profile[0].id));

  const payload = JSON.stringify({
    title: "MealMate 🍽️",
    body: "Notifications are working! You'll get daily meal reminders.",
    icon: "/logo.svg",
    url: "/dashboard",
  });

  let sent = 0;
  for (const sub of subs) {
    try {
      await webpush.sendNotification(
        { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
        payload
      );
      sent++;
    } catch {
      await db
        .delete(pushSubscriptionsTable)
        .where(eq(pushSubscriptionsTable.id, sub.id));
    }
  }

  res.json({ sent });
});

export default router;
