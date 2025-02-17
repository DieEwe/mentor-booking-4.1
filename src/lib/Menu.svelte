<script>
  import { user } from './stores';
  import ThemeToggle from '$lib/ThemeToggle.svelte';
  import { onMount } from 'svelte';

  // Demo auto‑login; replace with real authentication later.
  function loginAdmin() {
    user.set({ loggedIn: true, email: 'admin@example.com', username: 'admin' });
  }
  
  function logout() {
    user.set({ loggedIn: false });
    closeBurger();
  }

  // Burger menu state for mobile view
  let burgerOpen = false;
  function toggleBurger() {
    burgerOpen = !burgerOpen;
  }
  function closeBurger() {
    burgerOpen = false;
  }
</script>

<nav class="menu">
  <!-- Center: Only visible on desktop -->
  {#if $user.loggedIn}
    <div class="menu-center">
      <a href="/events" class="menu-link">Events</a>
      <a href="/profile" class="menu-link">Mein Profil</a>
    </div>
  {/if}

  <!-- Right: Always visible -->
  <div class="menu-right">
    {#if $user.loggedIn}
      <button on:click={logout} class="account-link">Logout</button>
    {:else}
      <button on:click={loginAdmin} class="menu-link">Login</button>
    {/if}
    <ThemeToggle />

    <!-- Burger button: Visible only on mobile when logged in -->
    {#if $user.loggedIn}
      <button class="burger" on:click={toggleBurger}>☰</button>
    {/if}
  </div>

  <!-- Mobile Navigation Overlay: Only appears when burger is open -->
  {#if burgerOpen}
    <div class="mobile-nav">
      <a href="/events" class="menu-link" on:click={closeBurger}>Events</a>
      <a href="/profile" class="menu-link" on:click={closeBurger}>Mein Profil</a>
    </div>
  {/if}
</nav>



    <!-- Bewerben opens a new tab -->
    <!-- <a href="https://your-bewerben-url.com" target="_blank" rel="noopener" class="menu-link">Bewerben</a> -->


<style>
/* Base styles for the menu container */
.menu {
  position: relative;
  display: flex;
  justify-content: flex-end; /* Right-aligned by default */
  align-items: center;
  padding: 1rem;
}

/* Center area: Positioned absolutely at the top center */
.menu-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
}

/* Right area: Contains login/logout, theme toggle, and burger */
.menu-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Basic styling for links and buttons */
.menu-link,
.account-link {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.2rem;
  color: var(--text);
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
}

/* Hide the burger button on desktop */
.burger {
  display: none;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
}

/* Mobile Styles */
@media (max-width: 600px) {
  /* Hide the center links on mobile */
  .menu-center {
    display: none;
  }
  
  /* Show the burger button on mobile */
  .burger {
    display: inline-block;
  }
  
  /* Style the mobile navigation overlay */
  .mobile-nav {
    position: absolute;
    top: 100%; /* Just below the menu bar */
    right: 1rem;
    background: var(--background);
    border: 1px solid #ccc;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    z-index: 1000;
  }
}

</style>
