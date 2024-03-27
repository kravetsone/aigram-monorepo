<script>
    import {
        TextInput,
        Button,
        PasswordInput,
        ButtonSet,
        Form,
    } from "carbon-components-svelte";
    import { writable } from "svelte/store";
    import { Login } from "carbon-icons-svelte";
    import { link, push } from "svelte-spa-router";
    import { signInFx } from "../stores/auth";

    let email = "";
    let password = "";
    let wrapper;

    $: errorText = writable("");
    $: ready = writable(true);
</script>

<div class="login--wrapper min-h-screen justify-center" bind:this={wrapper}>
    <!-- <img class="h-16 w-max" src={"https://gpltournaments.netlify.app/assets/logo-gpl-_oBqtq2b.svg"} alt="logo"> -->
    <div class="login--tile">
        <Form
            on:submit={async (e) => {
                e.preventDefault();
                await signInFx({ email, password });
                push("/");
            }}
        >
            <h3 class="mb-2">Авторизация</h3>
            <TextInput
                labelText="Почта"
                placeholder="example@mail.ru"
                invalid={!!$errorText}
                invalidText={$errorText}
                type="text"
                bind:value={email}
                required
            />
            <PasswordInput
                labelText="Пароль"
                placeholder="••••••••"
                bind:value={password}
                required
            />
            <div class="flex flex-row gap-4 items-center">
                <ButtonSet class="mt-2" stacked>
                    <Button
                        class="bx--btn--full"
                        icon={Login}
                        skeleton={!$ready}
                        type="submit">Авторизоваться</Button
                    >
                </ButtonSet>
                <p>
                    Ещё не зарегистрированы? <a href="/sign-up" use:link
                        >Зарегистрируйтесь</a
                    >
                </p>
            </div>
        </Form>
    </div>
</div>

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
