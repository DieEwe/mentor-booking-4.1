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

<div class="modal-overlay">
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="login-title">
    <h2 id="login-title">Login</h2>
    <form on:submit|preventDefault={handleSubmit}>
      <label for="email">Email-Adresse</label>
      <input id="email" type="email" bind:value={email} required />
      <label for="username">Benutzername</label>
      <input id="username" type="text" bind:value={username} required />
        <button>Login</button>
        <button on:click={() => dispatch('close')}>Cancel</button>
    </form>
  </div>
</div>


<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal {
  background: var(--background);
  padding: 2rem;
  border-radius: var(--border-radius);
  max-width: 450px;
  width: 90%;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
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

</style>
