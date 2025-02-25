import { relations } from "drizzle-orm";
import {
  integer,
  date,
  pgTable,
  varchar,
  uuid,
  timestamp,
  boolean,
  text,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const User = pgTable("users", {
  id: uuid().notNull().primaryKey().defaultRandom(),
  email: varchar("email").notNull().unique(),
  password: varchar("password").notNull(),
  name: varchar("name").notNull(),
  age: integer("age").notNull().default(18),
  active: boolean("active").notNull().default(true),
  created_at: date("created_at").notNull().defaultNow(),
  updated_at: date("updated_at"),
  email_verified_at: timestamp({ mode: "date", withTimezone: true }),
});

export const Post = pgTable("posts", {
  id: uuid().notNull().primaryKey().defaultRandom(),
  title: varchar("title").notNull(),
  slug: varchar("slug").notNull().unique(),
  content: text("content"),
  published: boolean("published").notNull().default(false),
  authorId: uuid("author_id")
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
});

export const UserRelations = relations(User, ({ many }) => ({
  posts: many(Post),
}));

export type CreateUserArgs = typeof User.$inferInsert;
export type InsertPostInput = typeof Post.$inferInsert;

export const CreateUserInput = createInsertSchema(User, {
  name: z.string().max(100),
  email: z.string().email(),
  password: z.string().min(8),
  age: z.number().min(18).max(150),
}).omit({
  id: true,
  active: true,
  created_at: true,
  updated_at: true,
  email_verified_at: true,
});
