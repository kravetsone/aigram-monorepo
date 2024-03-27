<script>
    import { push } from "svelte-spa-router";
    import { user } from "../stores/user";

    if (!$user) {
        push("/sign-up");
    }
</script>

{#if $user}
    <div>
        Ваш ник {$user.name}
    </div>
{/if}
