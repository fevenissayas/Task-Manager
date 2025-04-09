import { pgTable, serial, varchar, text, pgEnum } from "drizzle-orm/pg-core";

export const taskStatus = pgEnum("task_status", ["pending", "in progress", "completed"]);

export const users = pgTable("users", {
  id: varchar("id", { length: 255 }).primaryKey(), // clerk userId
  email: varchar("email", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const tasks = pgTable("tasks", {
  userId: varchar("user_id", { length: 255 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  status: taskStatus("status").default("pending").notNull(),
});

