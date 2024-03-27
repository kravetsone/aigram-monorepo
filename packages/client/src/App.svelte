<script>
    import Router from "svelte-spa-router";
    import SignUp from "./pages/SignUp.svelte";
    import SignIn from "./pages/SignIn.svelte";

    const routes = {
        '/': SignIn,
        '/sign-up': SignUp,
    }
</script>

<body>
    <Router {routes}/>
</body>