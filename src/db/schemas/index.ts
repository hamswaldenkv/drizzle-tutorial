import {
  integer,
  date,
  pgTable,
  varchar,
  uuid,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const User = pgTable("users", {
  id: uuid().notNull().primaryKey().defaultRandom(),
  email: varchar("email").notNull().unique(),
  email_verified_at: timestamp({ mode: "date", withTimezone: true }),
  password: varchar("password").notNull(),
  name: varchar("name").notNull(),
  age: integer("age").notNull().default(18),
  created_at: date("created_at").notNull().defaultNow(),
  updated_at: date("updated_at"),
});

export type CreateUserArgs = typeof User.$inferInsert;

export const CreateUserInput = createInsertSchema(User, {
  name: z.string().max(100),
  email: z.string().email(),
  password: z.string().min(8),
  age: z.number().min(18).max(150),
}).omit({
  id: true,
  created_at: true,
  updated_at: true,
  email_verified_at: true,
});
