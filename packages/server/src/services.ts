import jwt from "@elysiajs/jwt";
import Elysia, { t } from "elysia";

export const jwtElysia = new Elysia().use(
	jwt({
		secret: process.env.JWT_SECRET as string,
		schema: t.Object({
			id: t.Number(),
		}),
	}),
);
