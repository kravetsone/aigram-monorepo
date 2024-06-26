import { createEffect, createEvent, createStore, sample } from "effector";
import { api } from "../lib/api";
import { signInFx, token } from "./auth";

export type User = Awaited<ReturnType<typeof api.user.get>>["data"];

export const fetchUserFx = createEffect(async () => {
	const { data, error } = await api.user.get();

	if (error) throw error;

	return data;
});

export const setUser = createEvent<User>();

export const user = createStore<User>(null)
	.on(signInFx.doneData, (_, data) => ({ name: data.name }))
	.on(fetchUserFx.doneData, (_, data) => ({ name: data.name }));

export const fetchUser = createEvent();

sample({
	clock: fetchUser,
	source: token,
	filter: Boolean,
	target: fetchUserFx,
});

fetchUser();
