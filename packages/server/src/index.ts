import { cors } from "@elysiajs/cors";
import { jwt } from "@elysiajs/jwt";
import { swagger } from "@elysiajs/swagger";
import { eq } from "drizzle-orm";
import { Elysia, t } from "elysia";
import { db, users } from "./db";

const app = new Elysia()
	.use(swagger())
	.use(cors())
	.use(jwt({ secret: process.env.JWT_SECRET as string }))
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
	);

app.listen(process.env.PORT as string, () =>
	console.log(`🦊 Server started at ${app.server?.url.origin}`),
);
