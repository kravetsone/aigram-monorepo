import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { authRoutes } from "./routes/auth";
import { jwtElysia } from "./services";

const app = new Elysia()
	.use(swagger())
	.use(cors())
	.use(jwtElysia)
	.use(authRoutes);

app.listen(process.env.PORT as string, () =>
	console.log(`🦊 Server started at ${app.server?.url.origin}`),
);

export type App = typeof app;
