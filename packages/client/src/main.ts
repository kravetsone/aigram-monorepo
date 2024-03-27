import "./app.css";
import "carbon-components-svelte/css/white.css";
import App from "./App.svelte";

const app = new App({
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	target: document.getElementById("app")!,
});

export default app;
