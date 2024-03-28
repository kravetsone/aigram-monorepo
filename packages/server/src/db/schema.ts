import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").unique().notNull(),
	password: text("password").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
	posts: many(messages),
}));

export const messages = pgTable("messages", {
	id: serial("id").primaryKey(),
	userId: integer("user_id").notNull(),
	text: text("text").notNull(),
});

export const messagesRelation = relations(messages, ({ one }) => ({
	author: one(users, {
		fields: [messages.userId],
		references: [users.id],
	}),
}));
