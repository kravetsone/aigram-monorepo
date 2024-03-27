import Elysia, { t } from "elysia";
import { authElysia } from "../services";

export const chatRoutes = new Elysia().use(authElysia).ws("/chat", {
	query: t.Object({
		token: t.String(),
	}),
	body: t.String(),
	response: t.Object({ text: t.String() }),
	open: (ws) => {
		ws.subscribe("global");
	},
	message: (ws, message) => {
		console.log(message);
		ws.publish("global", { text: message });
		ws.send({ text: message });
	},
});
