<script>
    import { push } from "svelte-spa-router";
    import { user } from "../stores/user";

    if (!localStorage.getItem("token")) {
        push("/sign-up");
    }

    console.log($user);
</script>

{#if $user}
    <div>
        Ваш ник {$user.name}
    </div>
{/if}
