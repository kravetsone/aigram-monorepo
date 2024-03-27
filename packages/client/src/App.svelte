<script>
    import { TextInput, Button } from "carbon-components-svelte";

    let username = "";
    let email = "";
    let password = "";

    function handleSubmit() {
        console.log(`Submitted: ${username}, ${email}, ${password}`);
    }
</script>

<main>
  <form on:submit|preventDefault={handleSubmit}>
    
<label for="username">Username:</label>
<TextInput id="username" bind:value={username}/>

<label for="email">Email:</label>
<TextInput type="email" id="email" bind:value={email}/>

<label for="password">Password:</label>
<TextInput type="password" id="password" bind:value={password}/>

<Button type="submit">Register</Button>

</form>
</main>