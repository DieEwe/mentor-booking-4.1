<script lang="ts">
	import { user } from './stores';
	import ThemeToggle from '$lib/ThemeToggle.svelte';
	import { goto } from '$app/navigation';
	import '../app.css';

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
</script>

<nav class="menu">
    <div class="menu-left">
        <a href="/" class="menu-logo">
            <img src="/images/InkluConnectLogo.svg" alt="Inklu-Connect Logo"/>
        </a>
    </div>
    
    <div class="menu-center">
        {#if $user.loggedIn}
            <a href="/events" class="menu-link">Events</a>
            <a href="/profile" class="menu-link">Mein Profil</a>
            <button on:click={logout} class="menu-link">Logout</button>
        {:else}
            <a href="google.de" class="menu-link">Bewerben</a>
            <button on:click={loginAdmin} class="menu-link">Login</button>
        {/if}
    </div>
    
    <div class="menu-right">
        <ThemeToggle />
        <button 
            class="burger"
            on:click={toggleBurger}
            on:keydown={e => e.key === 'Escape' && closeBurger()}
            aria-expanded={burgerOpen}
            aria-label="Toggle mobile menu"
        >
            ☰
        </button>
        
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
				<button on:click={() => { loginAdmin(); closeBurger(); }} role="menuitem" tabindex="0">Login</button>
				{/if}
			</div>
        {/if}
    </div>
</nav>

<style>
	.menu {
		position: fixed;
		top: 2rem;
		left: 50%;          /* Center horizontally */
		transform: translateX(-50%); /* Complete the centering */
		max-width: 1200px; /* Added max-width for very large screens */
        min-width: 700px; /* Added min-width to prevent too narrow menu */ 
		z-index: 1000; /* Ensure it appears above other content */
		display: flex; /* Flex container */
		height: 60px;               /* fixed height of 60px */
		align-items: center;
		justify-content: space-between;  /* separate left, center, and right */
		background: rgba(255, 255, 255, 0.856);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		padding: 0 2rem;            /* horizontal padding only */
		border-radius: 50px;
		backdrop-filter: blur(8px);
	}

	/*LOGO*/
	.menu-logo {
		display: flex;
		align-items: center;
		height: 100%;      /* Take full height of menu */
		padding: 0.5rem 0; /* Add some vertical padding for spacing */
	}

	.menu-logo img {
		height: 75%;       /* Take 75% of the logo container height */
		width: auto;       /* Maintain aspect ratio */
		object-fit: contain; /* Ensure image scales properly */
		max-height: 60px;  /* Set a maximum height as fallback */
	}

	/*LINKS*/
	.menu-left {
		display: flex;
		align-items: center;
		gap: 1rem;
		height: 100%;        /* Match menu height */
}

	/*MITTE*/
	.menu-center {
		flex: 1;                     /* takes up remaining horizontal space */
		display: flex;
		justify-content: center;     /* center the links horizontally */
		align-items: center;
		gap: 1rem;                   /* adds space between links/buttons */
	}

	/*RECHTS*/
	.menu-right {
		display: flex;
		align-items: center;
		gap: 1rem;
		height: 100%;        /* Match menu height */
	}



	.menu-center a,
	.menu-center button {
		padding: 0 1em;
		height: 100%;                /* fill the 60px height */
		border-radius: 50px;
		cursor: pointer;
		border: 0;
		background-color: white;
		box-shadow: rgb(0 0 0 / 5%) 0 0 8px;
		letter-spacing: 1.5px;
		text-transform: uppercase;
		font-size: 15px;
		transition: all 0.5s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.menu-center a:hover,
	.menu-center button:hover {
		letter-spacing: 3px;
		background-color: hsl(0, 0%, 0%);
		color: hsl(0, 0%, 100%);
		box-shadow: rgb(0, 0, 0) 0 7px 29px 0;
	}

	.menu-center a:active,
	.menu-center button:active {
		letter-spacing: 3px;
		background-color: hsl(0, 0%, 0%);
		color: hsl(0, 0%, 100%);
		box-shadow: none;
	
		transition: 100ms;
	}
	

	.burger {
		display: none;
		font-size: 1.5rem;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
	}


	/* Modern mobile nav overlay styling */
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
    .menu {
		min-width: unset; /* Remove min-width on mobile */
		width: calc(100% - 2rem); /* Dynamic width with margins */
        top: 1rem;
        padding: 0 1rem;
        border-radius: 8px;
        width: 100%;
        /* Reduce padding for a more compact menu */
        padding: 0.5rem 1rem;
    }
    
    .menu-center,
    .menu-logo {
        display: none;
    }
    
    .burger {
        display: inline-block;
    }
}
</style>
