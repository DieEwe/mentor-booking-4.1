<!-- src/lib/components/Menu.svelte -->
<script lang="ts">
	import { page } from '$app/stores';
	import { user } from './stores';
	import '../app.css';
	import LoginModal from '$lib/components/LoginModal.svelte';
	import { goto } from '$app/navigation';

	let showLoginModal = false;

	function closeLoginModal() {
		showLoginModal = false;
	}

	function logout() {
		// Reset the user store to a guest user using the new structure.
		user.set({
			id: 0,
			vorname: 'Guest',
			name: 'User',
			pronouns: '',
			role: 'guest',
			email: '',
			Zitat: '',
			disability: 'None',
			languages: [],
			Beschreibung: 'No profile available',
			loggedIn: false // Add the missing 'loggedIn' property
		});
		closeBurger();
		goto('/');
	}

	// Burger menu state for mobile view.
	let burgerOpen = false;
	function closeBurger() {
		burgerOpen = false;
	}

	// Check if the current page is active.
	$: isActive = (path: string) => $page.url.pathname === path;
</script>

{#if $user.role !== 'guest'}
	<!-- Sidebar Navigation (Desktop) -->
	<div class="menu-wrapper">
		<div class="navigation">
			<!-- Hamburger menu button for mobile -->
			<label class="hamburger">
				<input type="checkbox" bind:checked={burgerOpen} />
				<svg viewBox="0 0 32 32">
					<path class="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
					<path class="line" d="M7 16 27 16"></path>
				</svg>
			</label>

			<!-- Navigation links (Desktop) -->
			<div class="menu-container">
				<div class="nav-links">
					<a href="/events" class="nav-link" class:active={isActive('/events')}>Events</a>
					<a href="/profile" class="nav-link" class:active={isActive('/profile')}>Mein Profil</a>
					<button on:click={logout} class="nav-link">Logout</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Mobile Sliding Menu (Vertically Centered) -->
	<div class="mobile-nav {burgerOpen ? 'slide-in' : ''}">
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
	/* Hamburger Button Styles */
	.hamburger {
		cursor: pointer;
		display: none; /* Hide by default.  Make visible in media query */
	}

	.hamburger input {
		display: none;
	}

	.hamburger svg {
		/* The size of the SVG defines the overall size */
		height: 3em;
		/* Define the transition for transforming the SVG */
		transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
	}

	.line {
		fill: none;
		stroke: black;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-width: 3;
		/* Define the transition for transforming the Stroke */
		transition:
			stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
			stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
	}

	.line-top-bottom {
		stroke-dasharray: 12 63;
	}

	.hamburger input:checked + svg {
		transform: rotate(-45deg);
	}

	.hamburger input:checked + svg .line-top-bottom {
		stroke-dasharray: 20 300;
		stroke-dashoffset: -32.42;
	}
	.menu-wrapper{
		margin-left: 16rem; /* Adjust this value as needed */
	}
	/* MAIN NAVIGATION (Desktop) */
	.navigation {
		position: fixed;
		left: 2rem;
		top: 50%;
		transform: translateY(-50%);
		width: 150px;
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(10px);
		color: #333;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0.5rem;
		gap: 1.5rem;
		border-radius: 16px;
		box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.3);
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


	/* MOBILE NAVIGATION (Centered Slide-In) */
	.mobile-nav {
		position: fixed;
		top: 50%;
		left: -260px; /* Hide off-screen initially */
		transform: translateY(-50%);
		width: 150px;
		background: rgba(255, 255, 255, 0.95);
		box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.3);
		padding: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		border-radius: 16px;
		transition: left 0.3s ease-in-out;
		z-index: 1200;
	}

	.mobile-nav.slide-in {
		left: 1rem; /* Slide in smoothly */
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
	@media (min-width: 769) and (max-width: 1800px) {
		.menu-wrapper{
		margin-right: 2rem; /* Adjust this value as needed */
	}
}
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
			display: flex; /*  Ensure navigation is flex */
			align-items: center; /* Vertically center content */
		}

		.hamburger {
			display: inline-block; /* Show hamburger button */
		}

		.menu-container {
			display: none;
		}
	}
</style>