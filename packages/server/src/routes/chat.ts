import { eq } from "drizzle-orm";
import Elysia, { t } from "elysia";
import { db, messages, users } from "../db";
import { authElysia } from "../services";

export const chatRoutes = new Elysia().use(authElysia).ws("/chat", {
	query: t.Object({
		token: t.String(),
	}),
	body: t.String(),
	response: t.Union([
		t.Object({
			event: t.Literal("new_message"),
			text: t.String(),
			user: t.Object({
				name: t.String(),
				id: t.Number(),
			}),
		}),
		t.Object({
			event: t.Literal("history"),
			messages: t.Array(
				t.Object({
					text: t.String(),
					user: t.Object({
						name: t.String(),
						id: t.Number(),
					}),
				}),
			),
		}),
	]),
	open: async (ws) => {
		ws.subscribe("global");
		const history = await db
			.select({
				text: messages.text,
				user: { name: users.name, id: users.id },
			})
			.from(messages)
			.innerJoin(users, eq(messages.userId, users.id))
			.limit(20);

		ws.send({ event: "history", messages: history });
	},
	message: async (ws, message) => {
		console.log(message);

		const msg = {
			event: "new_message",
			text: message,
			user: { name: ws.data.user.name, id: ws.data.user.id },
		} as const;

		ws.publish("global", msg);

		await db.insert(messages).values({
			userId: ws.data.user.id,
			text: message,
		});
	},
});
