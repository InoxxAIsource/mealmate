import {
  pgTable,
  text,
  serial,
  integer,
  real,
  jsonb,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const dishesTable = pgTable("dishes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  photoUrl: text("photo_url").notNull(),
  region: jsonb("region").$type<string[]>().notNull(),
  dietType: text("diet_type").notNull(),
  mealType: jsonb("meal_type").$type<string[]>().notNull(),
  ingredients: jsonb("ingredients")
    .$type<{ name: string; grams: number }[]>()
    .notNull(),
  cal: real("cal").notNull(),
  protein: real("protein").notNull(),
  carbs: real("carbs").notNull(),
  fat: real("fat").notNull(),
  fibre: real("fibre").notNull(),
  calcium: real("calcium").notNull(),
  iron: real("iron").notNull(),
  sodium: real("sodium").notNull(),
  sugar: real("sugar").notNull(),
  prepTimeMin: integer("prep_time_min").notNull(),
  pcosSafe: boolean("pcos_safe").notNull().default(false),
  diabetesSafe: boolean("diabetes_safe").notNull().default(false),
  thyroidSafe: boolean("thyroid_safe").notNull().default(false),
  pregnancySafe: boolean("pregnancy_safe").notNull().default(false),
  kidsSafe: boolean("kids_safe").notNull().default(false),
  lowGi: boolean("low_gi").notNull().default(false),
  highCalcium: boolean("high_calcium").notNull().default(false),
  highFibre: boolean("high_fibre").notNull().default(false),
  deepFried: boolean("deep_fried").notNull().default(false),
  pregnancyExclude: boolean("pregnancy_exclude").notNull().default(false),
  gymSafe: boolean("gym_safe").notNull().default(false),
  gymCategories: jsonb("gym_categories").$type<string[]>().default([]),
  benefitsPcos: text("benefits_pcos"),
  benefitsDiabetes: text("benefits_diabetes"),
  benefitsThyroid: text("benefits_thyroid"),
  benefitsPregnancy: text("benefits_pregnancy"),
  benefitsKids: text("benefits_kids"),
  benefitsGym: text("benefits_gym"),
});

export const insertDishSchema = createInsertSchema(dishesTable).omit({
  id: true,
});
export type InsertDish = z.infer<typeof insertDishSchema>;
export type Dish = typeof dishesTable.$inferSelect;
