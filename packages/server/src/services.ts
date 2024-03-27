import bearer from "@elysiajs/bearer";
import jwt from "@elysiajs/jwt";
import { eq } from "drizzle-orm";
import Elysia, { t } from "elysia";
import { db, users } from "./db";

export const jwtElysia = new Elysia().use(
	jwt({
		secret: process.env.JWT_SECRET as string,
		schema: t.Object({
			id: t.Number(),
		}),
	}),
);

export const authElysia = new Elysia()
	.use(bearer())
	.use(jwtElysia)
	.derive({ as: "scoped" }, async ({ bearer, query, jwt, error }) => {
		const jwtData = await jwt.verify(bearer ?? query.token);
		if (!jwtData) throw error("Unauthorized");

		const [user] = await db
			.select()
			.from(users)
			.where(eq(users.id, jwtData.id));

		return {
			user,
		};
	});
