import { createEffect, createEvent, createStore, sample } from "effector";
import { api } from "../lib/api";
import { token } from "./auth";
import { user } from "./user";

export interface Message {
	text: string;
	user: {
		id: number;
		name: string;
	};
}

const websocket = createStore<ReturnType<typeof api.chat.subscribe> | null>(
	null,
);

export const addMessages = createEvent<Message[]>();

export const sendMessage = createEvent<string>();

export const sendMessageFx = createEffect(
	({
		ws,
		text,
	}: { ws: ReturnType<typeof api.chat.subscribe>; text: string }) => {
		ws.send(text);
	},
);

sample({
	clock: sendMessage,
	source: websocket,
	filter: (ws) => !!ws,
	// biome-ignore lint/style/noNonNullAssertion: remove later
	fn: (ws, text) => ({ ws: ws!, text }),
	target: sendMessageFx,
});

sample({
	clock: sendMessage,
	source: user,
	filter: (user) => !!user,
	fn: (user, text) => [{ text, user: { id: 1, name: user?.name || "" } }],
	target: addMessages,
});

export const messages = createStore<Message[] | null>(null).on(
	addMessages,
	(old, newMessages) => (old ? old.concat(...newMessages) : [...newMessages]),
);

export const connectToChatFx = createEffect(async (token: string) => {
	const ws = api.chat.subscribe({
		query: {
			token: token,
		},
	});

	ws.on("message", ({ data }) => {
		switch (data.event) {
			case "new_message":
				addMessages([data]);
				break;
			case "history":
				addMessages(data.messages);
				break;
			default:
				console.error("unknown");
		}
	});

	return ws;
});

export const connectToChat = createEvent();

sample({
	clock: connectToChat,
	source: [token, websocket] as const,
	filter: ([token, ws]) => Boolean(token && !ws),
	fn: ([token]) => token || "",
	target: connectToChatFx,
});

websocket.on(connectToChatFx.doneData, (_, ws) => ws);
