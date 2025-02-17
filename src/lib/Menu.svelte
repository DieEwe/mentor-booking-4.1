<script>
  import { user } from './stores';
  import ThemeToggle from '$lib/ThemeToggle.svelte';

  // Function to simulate auto‑login as admin.
  // When integrating with Supabase, replace this auto‑login code with your Supabase login logic.
  function loginAdmin() {
    // ==========================
    // SUPABASE INTEGRATION POINT:
    // Replace this code with a real authentication call to Supabase.
    // Example:
    // import { supabase } from '$lib/supabaseClient';
    // const { data, error } = await supabase.auth.signInWithPassword({
    //   email: enteredEmail,
    //   password: enteredPassword
    // });
    // if (error) { console.error('Login failed:', error.message); return; }
    // user.set({ loggedIn: true, email: data.user.email, username: data.user.user_metadata.username });
    // ==========================
    
    // Auto‑login as admin for demo purposes.
    user.set({ loggedIn: true, email: 'admin@example.com', username: 'admin' });
  }
  
  // Function to log out.
  function logout() {
    // In production, also call supabase.auth.signOut() here.
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
  /* Desktop styles: menu is fixed, vertically centered on the right */
  .menu {
    position: fixed;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  /* Responsive: on smartphones, center the menu at the top */
  @media (max-width: 600px) {
    .menu {
      position: static;
      top: auto;
      right: auto;
      transform: none;
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
