<script>
    import { TextInput, Button, PasswordInput, ButtonSet, Form } from "carbon-components-svelte";
    import { writable } from "svelte/store";
    import {Login} from "carbon-icons-svelte";

    let username = "";
    let email = "";
    let password = "";
    let wrapper;

    $: error = writable("");
    $: ready = writable(true);

</script>

<div class="login--wrapper min-h-screen justify-center" bind:this={wrapper}>
	<!-- <img class="h-16 w-max" src={"https://gpltournaments.netlify.app/assets/logo-gpl-_oBqtq2b.svg"} alt="logo"> -->
	<div class="login--tile">
		<Form on:submit={(e) => {
      e.preventDefault();
      console.log(e)
    }}>
			<h3 class="mb-2">Вход в аккаунт</h3>
			<TextInput labelText="Логин" placeholder="ivan.ivanov"
					invalid={!!$error} invalidText={$error}
					type="text" bind:value={username} required />
			<PasswordInput labelText="Пароль" placeholder="••••••••"
						bind:value={password} required />
			<ButtonSet class="mt-2" stacked>
				<Button class="bx--btn--full" icon={Login}
						skeleton={!$ready} type="submit">Войти</Button>
			</ButtonSet>
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