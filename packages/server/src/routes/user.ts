import bearer from "@elysiajs/bearer";
import { eq } from "drizzle-orm";
import Elysia from "elysia";
import { db, users } from "../db";
import { jwtElysia } from "../services";

export const userRoutes = new Elysia()
	.use(bearer())
	.use(jwtElysia)
	.derive(async ({ bearer, jwt, error }) => {
		const jwtData = await jwt.verify(bearer);
		if (!jwtData) throw error("Unauthorized");

		const [user] = await db
			.select()
			.from(users)
			.where(eq(users.id, jwtData.id));

		return {
			user,
		};
	})
	.get("/user", ({ user }) => {
		return {
			name: user.name,
		};
	});
