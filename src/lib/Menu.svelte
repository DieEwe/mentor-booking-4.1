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

<nav class="menu">
	<!-- Left: Logo -->
	<div class="menu-left">
		<div class="menu-logo">
			<img src="/images/g686.png" alt="Inklu-Connect Logo" />
		</div>
	</div>

	<!-- Center: Navigation links including login/logout -->
	<div class="menu-center">
		{#if $user.loggedIn}
			<a href="/events" class="menu-link">Events</a>
			<a href="/profile" class="menu-link">Mein Profil</a>
			<button on:click={logout} class="menu-link">Logout</button>
			<button on:click={toggleActive}>Toggle Active State</button>
		{:else}
			<button on:click={loginAdmin} class="menu-link">Login</button>
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
		<div class="mobile-nav">
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
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem;
	}

	/* Left section (logo) */
	.menu-left {
		display: flex;
		align-items: center;
	}

	.menu-logo img {
		height: 4rem; /* Adjust as needed to match link height */
	}

	/* Center section: navigation links */
	.menu-center {
		display: flex;
		gap: 1rem;
	}

	/* Right section: login/logout, theme toggle, burger button */
	.menu-right {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	/* Hide the burger button by default (mobile will override) */
	.burger {
		display: none;
		font-size: 1.5rem;
		background: none;
		border: none;
		cursor: pointer;
	}

	/* Mobile Styles */
	@media (max-width: 600px) {
		/* Hide center links and logo on mobile */
		.menu-center,
		.menu-logo {
			display: none;
		}

		/* Show burger button on mobile */
		.burger {
			display: inline-block;
		}

		/* Mobile navigation overlay styling remains unchanged */
		.mobile-nav {
			position: absolute;
			top: 100%; /* below the menu bar */
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
