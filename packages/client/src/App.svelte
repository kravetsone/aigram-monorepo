<script>
    import Router from "svelte-spa-router";
    import SignUp from "./pages/SignUp.svelte";
    import SignIn from "./pages/SignIn.svelte";
    import Main from "./pages/Main.svelte";

    const routes = {
        "/": Main,
        "/sign-in": SignIn,
        "/sign-up": SignUp,
    };
</script>

<body>
    <Router {routes} />
</body>
