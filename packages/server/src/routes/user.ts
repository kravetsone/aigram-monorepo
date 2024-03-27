import Elysia from "elysia";
import { authElysia } from "../services";

export const userRoutes = new Elysia()
	.use(authElysia)
	.get("/user", ({ user }) => {
		return {
			name: user.name,
		};
	});
