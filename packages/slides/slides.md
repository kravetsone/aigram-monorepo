---
theme: elysia
title: Welcome to Slidev
highlighter: shiki
transition: slide-left
mdc: true
---

<div class="h-full flex flex-col justify-between">

<h1 class="w-2xl text-left">Разработка клиентского приложения - мессенджера</h1>

<div class="flex items-center justify-between">

<div class="flex flex-col gap-0 pt-25 text-xl">
    <span class="font-bold">Всеволод Деткин</span>
    <span>ИСП-3-21</span>
</div>

<img class="-mr-25" width="500px" src="/fox.webp" />

</div>

</div>

---

# Создание базы данных в PostgreSQL

```sql
CREATE DATABASE aigram
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1
```

---

# Создание первого endpoint

```ts
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";

const app = new Elysia()
  .use(swagger())
  .use(cors())
  .use(
    jwt({
      secret: process.env.JWT_SECRET as string,
    }),
  )
  .get("/", "Hello world!");

app.listen(process.env.PORT as string, () =>
  console.log(`🦊 Server started at ${app.server?.url.origin}`),
);
```

---

# Тестирование API через postman

![alt text](postman-1.png)

---

# Работаем с ORM

```ts
import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
});
```

<br/>

```sql
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL
);

```

<br/>

```sql
ALTER TABLE "users" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "string" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");
```

---

```ts
.post(
		"/auth/sign-up",
		async ({ body: { email, name, password }, jwt, error }) => {
			const isBusyEmail = await db
				.select()
				.from(users)
				.where(eq(users.email, email));

			if (isBusyEmail.length) return error("Bad Request");

			const [{ id }] = await db
				.insert(users)
				.values({
					email,
					name,
					password: await Bun.password.hash(password),
				})
				.returning();
			const token = await jwt.sign({
				id,
			});
			return {
				token,
			};
		}
	)
```

---

# Postman & drizzle

<img src="/postman-2.png" width="400px"/>

<br/>

<img src="/drizzle.png" width="400px"/>

---
layout: full
---

![alt text](/e2e-type-safety.png)

---

# Регистрация

<img src="/sign-up.png" width="400px"/>
