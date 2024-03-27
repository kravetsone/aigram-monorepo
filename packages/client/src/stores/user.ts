import { createEvent, createStore } from "effector";
import { signInFx } from "./auth";

interface User {
	name: string;
}

export const setUser = createEvent<User>();

export const user = createStore<User | null>(null).on(
	signInFx.doneData,
	(_, data) => ({ name: data.name }),
);
