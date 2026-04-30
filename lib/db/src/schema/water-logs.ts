import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { profilesTable } from "./profiles";

export const waterLogsTable = pgTable("water_logs", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id")
    .notNull()
    .references(() => profilesTable.id, { onDelete: "cascade" }),
  date: text("date").notNull(),
  glasses: integer("glasses").notNull().default(0),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type WaterLog = typeof waterLogsTable.$inferSelect;
