<script lang="ts">
	import { page } from '$app/stores';
	import { user } from './stores';
	import ThemeToggle from '$lib/ThemeToggle.svelte';
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
	let closeTimer: ReturnType<typeof setTimeout> | null = null;

	function toggleBurger() {
		burgerOpen = !burgerOpen;
	}

	function closeBurger() {
		burgerOpen = false;
	}

	function scheduleClose() {
		// Set a delay (e.g., 600ms) before closing the menu
		closeTimer = setTimeout(() => {
			closeBurger();
		}, 600);
	}

	function cancelClose() {
		// Cancel the scheduled close if pointer reenters
		if (closeTimer) {
			clearTimeout(closeTimer);
			closeTimer = null;
		}
	}

	// Helper function that checks if the current pathname equals or starts with the link's URL.
	$: isActive = (path: string) => $page.url.pathname === path;
</script>

<div class="navigation">
    <a href="/" class="logo">
        <img src="/images/InkluConnectLogo.svg" alt="Inklu-Connect Logo"/>
    </a>
    
	<div class="menu-container">
		{#if $user.loggedIn}
			<div class="nav-links">
				<a href="/events" class="nav-link" class:active={isActive('/events')}>Events</a>
				<a href="/profile" class="nav-link" class:active={isActive('/profile')}>Mein Profil</a>
				<button on:click={logout} class="nav-link">Logout</button>
			</div>
		{:else}
			<a href="google.de" class="nav-link" on:click={closeBurger}>Bewerben</a>
			<button class="nav-link" on:click={() => { showLoginModal = true; closeBurger(); }}>
				Login
			</button>
		{/if}
        <ThemeToggle />
	</div>

	{#if burgerOpen}
	<div 
		class="mobile-nav slide-in"
		role="menu"
		tabindex="-1"
		on:mouseleave={scheduleClose}
		on:mouseenter={cancelClose}
	>
		{#if $user.loggedIn}
			<a href="/events" on:click={closeBurger} role="menuitem" tabindex="0">Events</a>
			<a href="/profile" on:click={closeBurger} role="menuitem" tabindex="0">Mein Profil</a>
			<button on:click={logout} role="menuitem" tabindex="0">Logout</button>
		{:else}
			<a href="google.de" on:click={closeBurger} role="menuitem" tabindex="0">Bewerben</a>
				<button 
				on:click={() => {
					showLoginModal = true;
					closeBurger();
				}} 
				role="menuitem" 
				tabindex="0"
			>
				Login
				</button>
			{/if}
		</div>
	{/if}
</div>


{#if showLoginModal}
	<LoginModal on:close={closeLoginModal} />
{/if}

<style>
	.navigation {
		position: fixed;
		top: 2rem;
		left: 2rem;
		right: 2rem;
		z-index: 1000;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 2rem;
	}

	.menu-container {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.logo {
		height: 50px;
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.nav-link {
		font-family: 'Inter', sans-serif;
		font-size: 20px;
		font-weight: 500;
		color: rgba(var(--text-rgb), 0.9);
		text-decoration: none;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5rem 1rem;
		border-radius: 24px;
		transition: background-color 0.2s ease;
	}

	.nav-link:hover,
	.nav-link.active {
		background-color: rgba(128, 128, 128, 0.2);
	}

	.mobile-nav {
		position: fixed;
		top: 50%;
		right: 0;
		width: 250px;  /* Adjust width as needed */
		background: white;
		color: var(--text);
		border-radius: 8px;
		padding: 1rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		transform: translate(100%, -50%);
		transition: transform 0.3s ease;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		z-index: 1100; /* Ensure it appears above the menu */
		}

	.mobile-nav.slide-in {
		transform: translate(0, -50%);
		}

		/* Style for links/buttons within mobile nav */
	.mobile-nav a,
	.mobile-nav button {
		display: block;
		width: 100%;
		text-align: left;
		background: none;
		border: none;
		padding: 0.5rem 1rem;
		font-size: 1rem;
		color: var(--text);
		cursor: pointer;
		transition: background 0.2s ease;
		border-radius: 4px;
		}

	.mobile-nav a:hover,
	.mobile-nav button:hover {
		background: rgba(0, 0, 0, 0.05);
			}



	@media (max-width: 768px) {
    .navigation {
		width: calc(100% - 2rem); /* Dynamic width with margins */
        top: 1rem;
        left: 1rem;
        right: 1rem;
        border-radius: 8px;
        /* Reduce padding for a more compact menu */
        padding: 0.5rem 1rem;
    }
    
    .menu-container,
    .logo {
        display: none;
    }
    
}
</style>
