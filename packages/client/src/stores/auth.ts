import { createEffect, createEvent, createStore } from "effector";
import { persist } from "effector-storage/local";
import { api } from "../lib/api";

export const signInFx = createEffect(
	async (params: { email: string; password: string }) => {
		const { data, error } = await api.auth["sign-in"].post(params);

		if (error) throw error;

		return data;
	},
);

export const signUpFx = createEffect(
	async (params: { email: string; name: string; password: string }) => {
		const { data, error } = await api.auth["sign-up"].post(params);

		if (error) throw error;

		return data?.token;
	},
);

export const setToken = createEvent<string | null>();

export const token = createStore<string | null>(null)
	.on(setToken, (_, token) => token)
	.on(signInFx.doneData, (_, data) => data.token);

persist({ store: token, key: "token" });
