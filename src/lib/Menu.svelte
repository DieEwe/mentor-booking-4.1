<script>
  import { user } from './stores';
  import ThemeToggle from '$lib/ThemeToggle.svelte';

  // Demo auto‑login; replace with real Supabase auth later.
  function loginAdmin() {
    user.set({ loggedIn: true, email: 'admin@example.com', username: 'admin' });
  }
  
  function logout() {
    user.set({ loggedIn: false });
  }
</script>

<nav aria-label="Account Controls" class="account-controls">
  {#if $user.loggedIn}
    <button on:click={logout} class="account-link">Logout</button>
  {:else}
    <button on:click={loginAdmin} class="menu-link">Login</button>
  {/if}
  <ThemeToggle />
</nav>


    <!-- Bewerben opens a new tab -->
    <!-- <a href="https://your-bewerben-url.com" target="_blank" rel="noopener" class="menu-link">Bewerben</a> -->


<style>
  /* The account controls are fixed to the top right corner */
    .account-controls {
    position: fixed;
    right: 1rem;
    top: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .account-link {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.2rem;
    color: var(--text);
    cursor: pointer;
    background: none;
    border: none;
  }

  
  /* Responsive: on smartphones, the menu reverts to a centered top layout */
  @media (max-width: 600px) {
    .account-controls {
    position: static;
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 1rem 0;
    gap: 0.5rem;
  }
}
  
  .menu-link {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.2rem;
    color: var(--text);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    width: 100%;       /* Span the full container width */
    text-align: right; /* Align text flush with the right edge */
  }
  
  .menu-link:hover,
  .menu-link:focus {
    text-decoration: underline;
  }
</style>
