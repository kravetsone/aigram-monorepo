<script>
    import { Button, Loading, TextInput } from "carbon-components-svelte";
    import { push } from "svelte-spa-router";
    import { user } from "../stores/user";
    import { connectToChat, messages, sendMessage, token } from "../stores";
    import { onMount } from "svelte";

    let text = "";

    if (!$token) {
        push("/sign-up");
    }
    onMount(() => connectToChat());
    console.log($token);
    console.log($user);
    console.log($messages);
</script>

{#if $user && $messages}
    <div class="login--wrapper min-h-screen justify-center">
        <div class="login--tile">
            <div>
                {#each $messages as message}
                    <div>{message.user.name} - {message.text}</div>
                {/each}
            </div>
            <div class="flex">
                <TextInput
                    bind:value={text}
                    size="xl"
                    placeholder="Введите текст..."
                />
                <Button
                    on:click={() => {
                        sendMessage(text);
                        text = "";
                    }}>Отправить</Button
                >
            </div>
            <div>
                Вы пишите от лица <span class="font-bold">{$user.name}</span>.
                <!-- <Link on:click={() => setToken(null)}>Выйти</Link> -->
            </div>
        </div>
    </div>
{:else}
    <Loading />
{/if}

<style>
    .login--wrapper {
        width: 100%;
        max-width: 480px;

        margin: auto;
        row-gap: 2rem;

        display: flex;
        flex-direction: column;
    }

    .login--tile {
        width: 100%;
        max-width: 480px;

        padding: 1.5rem;
        row-gap: 1rem;

        display: flex;
        flex-direction: column;

        background-color: #eae8e8;
    }
</style>
