<script lang="ts">
	import { page } from '$app/stores';
	import { user } from './stores';
	import '../app.css';
	import LoginModal from '$lib/components/LoginModal.svelte';

	let showLoginModal = false;

	function closeLoginModal() {
		showLoginModal = false;
	}

	function logout() {
		user.set({ 
			loggedIn: false,
			role: 'guest'
		});
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

	// Check if current page is active
	$: isActive = (path: string) => $page.url.pathname === path;
</script>

{#if $user.loggedIn}
	<!-- Sidebar Navigation (Desktop) -->
	<div class="navigation">
		<!-- Burger menu button for mobile -->
		<button class="menu-toggle" on:click={toggleBurger}>☰</button>

		<!-- Navigation links (Desktop) -->
		<div class="menu-container">
			<div class="nav-links">
				<a href="/events" class="nav-link" class:active={isActive('/events')}>Events</a>
				<a href="/profile" class="nav-link" class:active={isActive('/profile')}>Mein Profil</a>
				<button on:click={logout} class="nav-link">Logout</button>
			</div>
		</div>
	</div>

	<!-- Mobile Sliding Menu (Vertically Centered) -->
	<div class="mobile-nav {burgerOpen ? 'slide-in' : ''}">
		<button class="close-button" on:click={closeBurger}>✖</button>
		<a href="/events" on:click={closeBurger} role="menuitem">Events</a>
		<a href="/profile" on:click={closeBurger} role="menuitem">Mein Profil</a>
		<button on:click={logout} role="menuitem">Logout</button>
	</div>
{/if}

<!-- Login Modal -->
{#if showLoginModal}
	<LoginModal on:close={closeLoginModal} />
{/if}

<style>
	/* MAIN NAVIGATION (Desktop) */
	.navigation {
		position: fixed;
		left: 2rem;
		top: 50%;
		transform: translateY(-50%);
		width: 200px;
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(10px);
		color: #333;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1.5rem;
		gap: 1.5rem;
		border-radius: 16px;
		box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.1);
		z-index: 1000;
		transition: transform 0.3s ease-in-out;
	}

	.nav-links {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.nav-link {
		font-family: 'Inter', sans-serif;
		font-size: 18px;
		font-weight: 500;
		color: #333;
		text-decoration: none;
		padding: 0.75rem 1rem;
		width: 100%;
		text-align: left;
		border-radius: 8px;
		transition: background 0.3s ease;
		display: block;
	}

	.nav-link:hover,
	.nav-link.active {
		background: rgba(0, 0, 0, 0.05);
		color: #000;
	}

	/* MOBILE MENU TOGGLE */
	.menu-toggle {
		display: none;
		background: transparent;
		border: none;
		cursor: pointer;
		font-size: 2rem;
		color: #333;
		margin-top: 0.5rem;
	}

	/* MOBILE NAVIGATION (Centered Slide-In) */
	.mobile-nav {
		position: fixed;
		top: 50%;
		left: -260px; /* Hide off-screen initially */
		transform: translateY(-50%);
		width: 150px;
		background: rgba(255, 255, 255, 0.95);
		box-shadow: 4px 0 10px rgba(0, 0, 0, 0.2);
		padding: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		border-radius: 12px;
		transition: left 0.3s ease-in-out;
		z-index: 1200;
	}

	.mobile-nav.slide-in {
		left: 1rem; /* Slide in smoothly */
	}

	/* Close Button for Mobile Menu */
	.close-button {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 1.5rem;
		color: #333;
		margin-bottom: 1rem;
	}

	.mobile-nav a,
	.mobile-nav button {
		display: block;
		font-size: 18px;
		color: #333;
		text-decoration: none;
		background: none;
		border: none;
		padding: 0.75rem 1rem;
		text-align: left;
		border-radius: 8px;
		cursor: pointer;
		transition: background 0.3s ease;
		width: 100%;
	}

	.mobile-nav a:hover,
	.mobile-nav button:hover {
		background: rgba(0, 0, 0, 0.05);
	}

	/* RESPONSIVE DESIGN */
	@media (max-width: 768px) {
		.navigation {
			position: fixed;
			top: 1rem;
			left: 1rem;
			transform: none;
			width: auto;
			background: transparent;
			box-shadow: none;
			padding: 0;
		}

		.menu-toggle {
			display: block;
		}

		.menu-container {
			display: none;
		}
	}
</style>
