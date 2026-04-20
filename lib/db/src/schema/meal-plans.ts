import {
  pgTable,
  text,
  serial,
  integer,
  jsonb,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { profilesTable } from "./profiles";

export const mealPlansTable = pgTable("meal_plans", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id")
    .references(() => profilesTable.id)
    .notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  planData: jsonb("plan_data")
    .$type<
      {
        dayIndex: number;
        breakfastId: number | null;
        lunchId: number | null;
        snackId: number | null;
        dinnerId: number | null;
        lockedSlots: string[];
      }[]
    >()
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMealPlanSchema = createInsertSchema(mealPlansTable).omit({
  id: true,
  createdAt: true,
});
export type InsertMealPlan = z.infer<typeof insertMealPlanSchema>;
export type MealPlan = typeof mealPlansTable.$inferSelect;

export const dishPreferencesTable = pgTable("dish_preferences", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id")
    .references(() => profilesTable.id)
    .notNull()
    .unique(),
  favouriteDishIds: jsonb("favourite_dish_ids").$type<number[]>().notNull(),
  dislikedDishIds: jsonb("disliked_dish_ids").$type<number[]>().notNull(),
});

export const insertDishPreferencesSchema = createInsertSchema(
  dishPreferencesTable
).omit({ id: true });
export type InsertDishPreferences = z.infer<typeof insertDishPreferencesSchema>;
export type DishPreferences = typeof dishPreferencesTable.$inferSelect;
