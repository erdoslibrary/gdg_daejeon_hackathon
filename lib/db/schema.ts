import { pgTable, uuid, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

// ── Enums ──────────────────────────────────────────
export const userStatusEnum = pgEnum("user_status", [
  "cooking",
  "eating",
  "finished",
]);

export const messageTypeEnum = pgEnum("message_type", ["user", "system"]);

// ── Tables ─────────────────────────────────────────
export const usersSession = pgTable("users_session", {
  id: uuid("id").defaultRandom().primaryKey(),
  nickname: text("nickname").notNull().unique(),
  status: userStatusEnum("status").notNull().default("cooking"),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const chatMessages = pgTable("chat_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  nickname: text("nickname").notNull(),
  content: text("content").notNull(),
  type: messageTypeEnum("type").notNull().default("user"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
