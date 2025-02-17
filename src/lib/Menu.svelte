<script>
    import { user } from './stores'; // Assume a Svelte store holds login state
    import ThemeToggle from '$lib/ThemeToggle.svelte';
  </script>
  
  <nav aria-label="Main Navigation" class="menu">
    {#if $user.loggedIn}
      <a href="/events" class="menu-link">Alle Coaching Events</a>
      <a href="/profile" class="menu-link">Mein Profil</a>
      <ThemeToggle />
      <button on:click={() => {/* implement logout logic */}} class="menu-link">Logout</button>
    {:else}
      <!-- Bewerben opens a new tab -->
      <a href="https://your-bewerben-url.com" target="_blank" rel="noopener" class="menu-link">Bewerben</a>
      <button on:click={() => {/* open login modal */}} class="menu-link">Login</button>
      <ThemeToggle />
    {/if}
  </nav>
  
  <style>
    .menu {
      position: fixed;
      right: 1rem;
      top: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    /* Responsive: on smartphone center the menu */
    @media (max-width: 600px) {
      .menu {
        position: static;
        flex-direction: row;
        justify-content: center;
        margin: 1rem 0;
      }
    }
  
    .menu-link {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.2rem;
      color: var(--text-color);
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
    }
  
    .menu-link:hover,
    .menu-link:focus {
      text-decoration: underline;
    }
  </style>