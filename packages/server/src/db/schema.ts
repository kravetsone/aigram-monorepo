import { pgTable, serial } from "drizzle-orm/pg-core";

export const user = pgTable("users", {
	id: serial("id").primaryKey(),
});
