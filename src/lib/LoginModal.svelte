<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	// For demo purposes we auto-login with admin credentials.
	let email = 'admin@example.com';
	let username = 'admin';

	async function handleSubmit() {
		// SUPABASE INTEGRATION POINT:
		// Replace this demo auto-login with actual Supabase authentication.
		// For example:
		// import { supabase } from '$lib/supabaseClient';
		// const { data, error } = await supabase.auth.signInWithPassword({ email, password });
		// if (error) { handle the error; return; }

		// For now, simulate a successful login:
		dispatch('login', { email, username });
	}
</script>

<div class="modal" role="dialog" aria-modal="true" aria-labelledby="login-title">
	<h2 id="login-title">Login</h2>
	<form on:submit|preventDefault={handleSubmit}>
		<label for="email">Email-Adresse</label>
		<input id="email" type="email" bind:value={email} required />

		<label for="username">Benutzername</label>
		<input id="username" type="text" bind:value={username} required />

		<div class="buttons">
			<button type="submit">Login</button>
			<button type="button" on:click={() => dispatch('close')}>Cancel</button>
		</div>
	</form>
</div>

<style>
  .modal {
  background: var(--background);
  padding: 2rem;
  border-radius: 8px; /* slightly larger rounding */
  max-width: 400px;
  margin: 2rem auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

  label {
    display: block;
    margin-top: 1rem;
  }
  input {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .buttons {
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
  }
  button {
    padding: 0.5rem 1rem;
    /* You might choose to update button backgrounds here as well */
    background-color: var(--accent);
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>
