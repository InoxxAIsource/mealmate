import {
  pgTable,
  text,
  serial,
  integer,
  boolean,
  real,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const profilesTable = pgTable("profiles", {
  id: serial("id").primaryKey(),
  clerkUserId: text("clerk_user_id").notNull().unique(),
  name: text("name"),
  ageRange: text("age_range"),
  gender: text("gender"),
  heightCm: real("height_cm"),
  weightKg: real("weight_kg"),
  familySize: text("family_size"),
  primaryTrack: text("primary_track"),
  region: text("region"),
  dietType: text("diet_type"),
  proteinPreferences: jsonb("protein_preferences").$type<string[]>(),
  conditionData: jsonb("condition_data").$type<Record<string, unknown>>(),
  weekdayCookTime: text("weekday_cook_time"),
  weekendCookTime: text("weekend_cook_time"),
  allergies: jsonb("allergies").$type<string[]>(),
  onboardingComplete: boolean("onboarding_complete").default(false).notNull(),
  isSubscribed: boolean("is_subscribed").default(false).notNull(),
  subscriptionEndDate: timestamp("subscription_end_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProfileSchema = createInsertSchema(profilesTable).omit({
  id: true,
  createdAt: true,
});
export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Profile = typeof profilesTable.$inferSelect;
