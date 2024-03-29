import { createEffect, createEvent, createStore, sample } from "effector";
import { api } from "../lib/api";
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
		console.log(ws, text);
		ws.send(text);
	},
);
sendMessage.watch(console.log);
sample({
	//@ts-expect-error
	clock: sendMessage,
	source: websocket,
	filter: (ws) => !!ws,
	fn: (ws, text) => ({ ws, text }),
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

export const connectToChat = createEffect(async (token: string) => {
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

websocket.on(connectToChat.doneData, (_, ws) => ws);
