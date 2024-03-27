import "@carbon/styles/css/styles.css";
import "carbon-components-svelte/css/g10.css";
import App from "./App.svelte";
import "./app.css";

const app = new App({
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	target: document.getElementById("app")!,
});

export default app;
