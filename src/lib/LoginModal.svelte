<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
  
    let email = 'admin';
    let username = 'admin';
  
    function handleSubmit() {
      // TODO: Replace with real authentication using Lucia and seatable data.
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
      background: var(--bg-center);
      padding: 2rem;
      border-radius: 8px;
      max-width: 400px;
      margin: 2rem auto;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
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
      background-color: var(--button-bg);
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  </style>
  