import { pgTable, varchar, serial, pgEnum } from 'drizzle-orm/pg-core';

export const taskStatus = pgEnum("task_status", ["pending", "in progress", "completed"]);

export const users = pgTable('users', {
  id: varchar('id', { length: 255 }).primaryKey(),
  email: varchar('email', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  token: varchar('token', { length: 500 }),
});

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }).references(() => users.id),
  title: varchar('title', { length: 255 }).notNull(),
  description: varchar('description', { length: 500 }).notNull(),
  status: varchar('status', { length: 50 }).default('pending').notNull(),
});
