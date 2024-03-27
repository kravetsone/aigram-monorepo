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
    import { signUpFx } from "../stores/auth";

    let username = "";
    let email = "";
    let password = "";

    $: errorText = writable("");
    $: ready = writable(true);
</script>

<div class="login--wrapper min-h-screen justify-center">
    <div class="login--tile">
        <Form
            on:submit={async (e) => {
                e.preventDefault();
                await signUpFx({ email, password, name: username });
                push("/");
            }}
        >
            <h3 class="mb-2">Регистрация аккаунта</h3>
            <TextInput
                labelText="Имя"
                placeholder="Иван"
                invalid={!!$errorText}
                invalidText={$errorText}
                type="text"
                bind:value={username}
                required
            />
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
                        type="submit">Зарегистрироваться</Button
                    >
                </ButtonSet>
                <p>
                    Уже зарегистрированы? <a href="/sign-in" use:link
                        >Авторизуйтесь</a
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
