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

<nav aria-label="Main Navigation" class="menu">
  {#if $user.loggedIn}
    <a href="/events" class="menu-link">Alle Coaching Events</a>
    <a href="/profile" class="menu-link">Mein Profil</a>
    <ThemeToggle />
    <button on:click={logout} class="menu-link">Logout</button>
  {:else}
    <!-- Bewerben opens a new tab -->
    <a href="https://your-bewerben-url.com" target="_blank" rel="noopener" class="menu-link">Bewerben</a>
    <button on:click={loginAdmin} class="menu-link">Login</button>
    <ThemeToggle />
  {/if}
</nav>

<style>
  /* Desktop styles: menu is fixed, vertically centered on the right with a fixed width */
  .menu {
    position: fixed;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 200px; /* Ensures links span a consistent width */
  }
  
  /* Responsive: on smartphones, the menu reverts to a centered top layout */
  @media (max-width: 600px) {
    .menu {
      position: static;
      top: auto;
      right: auto;
      transform: none;
      flex-direction: row;
      justify-content: center;
      width: auto;
      margin: 1rem 0;
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
