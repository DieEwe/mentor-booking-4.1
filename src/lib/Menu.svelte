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
	padding: 1rem 2rem;
	background: rgba(255, 255, 255, 0.95);
	backdrop-filter: blur(5px);
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	transition: background 0.3s;
}

.burger {
	display: none;
	font-size: 1.5rem;
	background: none;
	border: none;
	cursor: pointer;
	transition: transform 0.3s;
}

.burger:hover {
	transform: scale(1.1);
}

.mobile-nav {
	position: absolute;
	top: 100%;
	right: 1rem;
	background: var(--background);
	border: 1px solid #ccc;
	padding: 0.5rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	z-index: 1000;
	opacity: 0;
	transform: translateY(-10px);
	transition: opacity 0.3s, transform 0.3s;
}

.mobile-nav.slide-in {
	opacity: 1;
	transform: translateY(0);
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