import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const migrationClient = postgres(process.env.DATABASE_URL as string, {
	max: 1,
});

console.log("🗄️ Migration started...");
await migrate(drizzle(migrationClient), { migrationsFolder: "drizzle" });
console.log("🗄️ Migration ended...");

process.exit();
