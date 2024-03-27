import { eq } from "drizzle-orm";
import Elysia, { t } from "elysia";
import { db, users } from "../db";
import { jwtElysia } from "../services";

export const authRoutes = new Elysia()
	.use(jwtElysia)
	.post(
		"/auth/sign-up",
		async ({ body: { email, name, password }, jwt, error }) => {
			const isBusyEmail = await db
				.select()
				.from(users)
				.where(eq(users.email, email));

			if (isBusyEmail.length) return error("Bad Request");

			const [{ id }] = await db
				.insert(users)
				.values({
					email,
					name,
					password: await Bun.password.hash(password),
				})
				.returning();
			const token = await jwt.sign({
				id,
			});
			return {
				token,
			};
		},
		{
			body: t.Object({
				name: t.String(),
				email: t.String({ format: "email" }),
				password: t.String(),
			}),
		},
	)
	.post(
		"/auth/sign-in",
		async ({ body: { email, password }, jwt, error }) => {
			const [user] = await db
				.select()
				.from(users)
				.where(eq(users.email, email));

			if (!user) return error("Unauthorized");
			const isPasswordEqual = await Bun.password.verify(
				password,
				user.password,
			);
			if (!isPasswordEqual) return error("Unauthorized");

			const token = await jwt.sign({
				id: user.id,
			});

			return {
				name: user.name,
				token,
			};
		},
		{
			body: t.Object({
				email: t.String({ format: "email" }),
				password: t.String(),
			}),
		},
	);
