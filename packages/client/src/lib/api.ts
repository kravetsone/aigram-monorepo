import type { App } from "@aigram-monorepo/server";
import { treaty } from "@elysiajs/eden";

export const api = treaty<App>("https://api-aigram.animaru.app", {
	headers: () =>
		localStorage.getItem("token")
			? {
					authorization: `Bearer ${JSON.parse(
						localStorage.getItem("token") || "{}",
					)}`,
				}
			: { authorization: "" },
});
