import {
  db,
  pushSubscriptionsTable,
  profilesTable,
  mealPlansTable,
  dishesTable,
  waterLogsTable,
} from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { webpush } from "./routes/notifications";
import { logger } from "./lib/logger";
import { getTodayIST, getWaterGoal } from "./routes/water-log";

interface PlanDay {
  dayIndex: number;
  breakfastId?: number;
  lunchId?: number;
  snackId?: number;
  dinnerId?: number;
}

// IST = UTC + 5:30
// Meal reminder times in UTC { hour, minute }
const MEAL_REMINDERS = [
  { hour: 2,  minute: 30, mealKey: "breakfastId" as const, label: "Breakfast",  emoji: "🌅" },
  { hour: 7,  minute: 30, mealKey: "lunchId"     as const, label: "Lunch",      emoji: "🍱" },
  { hour: 14, minute: 0,  mealKey: "dinnerId"    as const, label: "Dinner",     emoji: "🌙" },
];

// Water reminder at 2:00 PM IST = 08:30 UTC
const WATER_REMINDER_UTC = { hour: 8, minute: 30 };

let lastSentMinute = -1;

async function sendMealReminders(mealKey: keyof PlanDay, label: string, emoji: string) {
  try {
    // Get all subscriptions with their profiles and active plans
    const subs = await db
      .select({
        sub: pushSubscriptionsTable,
        profile: profilesTable,
      })
      .from(pushSubscriptionsTable)
      .innerJoin(profilesTable, eq(pushSubscriptionsTable.profileId, profilesTable.id));

    if (subs.length === 0) return;

    // Load all dishes for lookup
    const allDishes = await db.select().from(dishesTable);
    const dishMap = new Map(allDishes.map((d) => [d.id, d]));

    for (const { sub, profile } of subs) {
      // Find active plan for this profile
      const plans = await db
        .select()
        .from(mealPlansTable)
        .where(
          eq(mealPlansTable.profileId, profile.id)
        )
        .limit(1);

      const plan = plans.find(p => p.isActive) || plans[0];

      let dishName = label; // fallback
      if (plan?.planData) {
        const days = plan.planData as PlanDay[];
        // Find today's day: Mon=0, Tue=1, ..., Sun=6
        const todayDayIndex = (new Date().getDay() + 6) % 7;
        const today = days.find((d) => d.dayIndex === todayDayIndex) ?? days[0];
        const dishId = today?.[mealKey] as number | undefined;
        if (dishId) {
          const dish = dishMap.get(dishId);
          if (dish) dishName = dish.name;
        }
      }

      const payload = JSON.stringify({
        title: `${emoji} ${label} time!`,
        body: `Today's ${label.toLowerCase()}: ${dishName}`,
        icon: "/logo.svg",
        badge: "/logo.svg",
        url: "/dashboard",
        tag: `meal-${label.toLowerCase()}`,
      });

      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: { p256dh: sub.p256dh, auth: sub.auth },
          },
          payload
        );
      } catch (err: any) {
        // Subscription expired/invalid — remove it
        if (err.statusCode === 410 || err.statusCode === 404) {
          await db
            .delete(pushSubscriptionsTable)
            .where(eq(pushSubscriptionsTable.id, sub.id));
        }
      }
    }

    logger.info({ label, count: subs.length }, "Meal reminders sent");
  } catch (err) {
    logger.error({ err }, "Failed to send meal reminders");
  }
}

async function sendWaterReminder() {
  try {
    const today = getTodayIST();
    const subs = await db
      .select({ sub: pushSubscriptionsTable, profile: profilesTable })
      .from(pushSubscriptionsTable)
      .innerJoin(profilesTable, eq(pushSubscriptionsTable.profileId, profilesTable.id));

    if (subs.length === 0) return;

    for (const { sub, profile } of subs) {
      const goal = getWaterGoal(profile.primaryTrack);

      const logs = await db
        .select()
        .from(waterLogsTable)
        .where(and(eq(waterLogsTable.profileId, profile.id), eq(waterLogsTable.date, today)))
        .limit(1);

      const glasses = logs[0]?.glasses ?? 0;
      if (glasses >= 4) continue;

      const payload = JSON.stringify({
        title: "💧 Don't forget to drink water!",
        body: `You've had only ${glasses} glass${glasses === 1 ? "" : "es"} today — your goal is ${goal}. Drink up!`,
        icon: "/logo.svg",
        badge: "/logo.svg",
        url: "/dashboard",
        tag: "water-reminder",
      });

      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          payload
        );
      } catch (err: any) {
        if (err.statusCode === 410 || err.statusCode === 404) {
          await db.delete(pushSubscriptionsTable).where(eq(pushSubscriptionsTable.id, sub.id));
        }
      }
    }

    logger.info({ count: subs.length }, "Water reminders sent");
  } catch (err) {
    logger.error({ err }, "Failed to send water reminders");
  }
}

export function startScheduler() {
  logger.info("Meal reminder scheduler started");

  setInterval(async () => {
    const now = new Date();
    const utcHour = now.getUTCHours();
    const utcMinute = now.getUTCMinutes();
    const currentMinute = utcHour * 60 + utcMinute;

    // Avoid firing twice in the same minute
    if (currentMinute === lastSentMinute) return;

    for (const reminder of MEAL_REMINDERS) {
      const reminderMinute = reminder.hour * 60 + reminder.minute;
      if (currentMinute === reminderMinute) {
        lastSentMinute = currentMinute;
        await sendMealReminders(reminder.mealKey, reminder.label, reminder.emoji);
      }
    }

    const waterMinute = WATER_REMINDER_UTC.hour * 60 + WATER_REMINDER_UTC.minute;
    if (currentMinute === waterMinute && lastSentMinute !== currentMinute) {
      lastSentMinute = currentMinute;
      await sendWaterReminder();
    }
  }, 30_000); // check every 30 seconds
}
