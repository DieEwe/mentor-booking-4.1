<script lang="ts">
	import { user } from './stores';
	import ThemeToggle from '$lib/ThemeToggle.svelte';
	import { goto } from '$app/navigation';
	import '../app.css';

	// For example, control the active state with a reactive variable.
	let isActive = false;

	function toggleActive() {
		isActive = !isActive;
	}

	// Demo auto‑login; replace with real authentication later.
	function loginAdmin() {
		user.set({ loggedIn: true, email: 'admin@example.com', username: 'admin' });
	}

	async function logout() {
		user.set({ loggedIn: false });
		closeBurger();
		await goto('/'); // Redirect to home page
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

<nav class="menu sticky">
	<!-- Left: Logo -->
	<div class="menu-left">
		<div class="menu-logo">
			<!-- Use a vector logo for sharper scaling -->
			<img src="/images/g686.png" alt="Inklu-Connect Logo" />
		</div>
	</div>
	<!-- Center: Navigation links -->
	<div class="menu-center">
		{#if $user.loggedIn}
			<a href="/events" class="menu-link">Events</a>
			<a href="/profile" class="menu-link">Mein Profil</a>
			<button on:click={logout} class="menu-link">Logout</button>
		{:else}
			<a href="google.de" class="auth-button">Bewerben</a>
			<button on:click={loginAdmin} class="auth-button">Login</button>
		{/if}
	</div>
	<!-- Right: Theme Toggle and burger menu -->
	<div class="menu-right">
		<ThemeToggle />
		{#if $user.loggedIn}
			<button class="burger" on:click={toggleBurger}>☰</button>
		{/if}
	</div>
	<!-- Mobile Navigation Overlay -->
	{#if burgerOpen}
		<div class="mobile-nav slide-in">
			<a href="/events" class="menu-link" on:click={closeBurger}>Events</a>
			<a href="/profile" class="menu-link" on:click={closeBurger}>Mein Profil</a>
			<button on:click={logout} class="menu-link">Logout</button>
		</div>
	{/if}
</nav>


<!-- Bewerben opens a new tab -->
<!-- <a href="https://your-bewerben-url.com" target="_blank" rel="noopener" class="menu-link">Bewerben</a> -->

<style>
	/* Base styles for the menu container */

.menu {
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* Remove fancy background or shadows */
  background: none;
  box-shadow: none;
  padding: 1rem 2rem; /* You can keep some spacing if you like */
}

/* .burger is a button, so remove any special styling except font-size if needed */
.burger {
  display: none; /* remains hidden on desktop */
  font-size: 1.5rem;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
  /* Remove transform or transitions */
}
.burger:hover {
  transform: none;
}

/* .mobile-nav can keep positioning but remove background/border so text is black */
.mobile-nav {
  position: absolute;
  top: 100%;
  right: 1rem;
  background: none;
  border: none;
  padding: 0;
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.3s, transform 0.3s; /* optional if you want a show/hide effect */
}
.mobile-nav.slide-in {
  opacity: 1;
  transform: translateY(0);
}
.menu-logo img {
  max-height: 40px;
  width: auto;
}

@media (max-width: 768px) {
  .menu-center,
  .menu-logo {
    display: none;
  }
  .burger {
    display: inline-block;
  }
}

</style>