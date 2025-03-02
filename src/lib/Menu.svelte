<script lang="ts">
    import { user } from '$lib/stores';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import LoginModal from './components/LoginModal.svelte';
    import ThemeToggle from './components/ThemeToggle.svelte';
    
    // State management
    let burgerOpen = false;
    let showLoginModal = false;
    let scrolled = false;
    
    // Check if a route is active
    $: isActive = (path: string) => $page.url.pathname === path;
    
    function logout() {
        user.update(u => ({ ...u, loggedIn: false }));
        burgerOpen = false;
    }
    
    function closeBurger() {
        burgerOpen = false;
    }
    
    function closeLoginModal() {
        showLoginModal = false;
    }
    
    // Add scroll effect handler
    onMount(() => {
        const handleScroll = () => {
            scrolled = window.scrollY > 10;
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });
</script>

{#if $user.role !== 'guest'}
    <header class="navbar {scrolled ? 'scrolled' : ''}">
        <div class="navbar-container">
            <!-- Logo and Brand -->
            <a href="/" class="brand">
                <img src="/images/InkluConnectLogoOriginalC.png" alt="Inklu-Connect Logo" class="logo-img" />
            </a>
            
            <!-- Desktop Navigation -->
			<nav class="desktop-nav">
				<a href="/events" class="nav-link {isActive('/events') ? 'active' : ''}">Events</a>
				<a href="/calendar" class="nav-link {isActive('/calendar') ? 'active' : ''}">Kalender</a>
				<a href="/profile" class="nav-link {isActive('/profile') ? 'active' : ''}">Mein Profil</a>
			</nav>
            
            <!-- Right Side Actions -->
            <div class="right-actions">
                <!-- Theme Toggle -->
                <div class="theme-toggle-container">
                    <ThemeToggle />
                </div>
                
                <!-- Logout Button (Desktop) -->
				<button on:click={logout} class="logout-btn">
					<div class="sign">
						<svg viewBox="0 0 512 512">
							<path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
						</svg>
					</div>
					<div class="text">Logout</div>
				</button>
                
                <!-- Hamburger Menu (Mobile) -->
                <button 
                    class="hamburger-btn"
                    on:click={() => burgerOpen = !burgerOpen}
                    aria-label="Toggle menu"
                >
                    <span class="hamburger-line {burgerOpen ? 'top-active' : ''}"></span>
                    <span class="hamburger-line {burgerOpen ? 'middle-active' : ''}"></span>
                    <span class="hamburger-line {burgerOpen ? 'bottom-active' : ''}"></span>
                </button>
            </div>
        </div>
        
        <!-- Mobile Menu -->
        <div class="mobile-menu {burgerOpen ? 'open' : ''}">
            <nav class="mobile-nav">
				<a href="/events" on:click={closeBurger} class="mobile-nav-link {isActive('/events') ? 'active' : ''}">
					Events
				</a>
				<a href="/calendar" on:click={closeBurger} class="mobile-nav-link {isActive('/calendar') ? 'active' : ''}">
					Kalender
				</a>
				<a href="/profile" on:click={closeBurger} class="mobile-nav-link {isActive('/profile') ? 'active' : ''}">
					Mein Profil
				</a>
                <button on:click={logout} class="mobile-nav-link logout-mobile">Logout</button>
            </nav>
        </div>
    </header>
{/if}

<!-- Login Modal -->
{#if showLoginModal}
    <LoginModal on:close={closeLoginModal} />
{/if}

<style>
    /* Base header styles */
    .navbar {
		display: flex;
		align-items: center;
		height:100px;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        transition: all 0.3s;
        padding: 1rem 2rem;
        background: transparent;
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        box-shadow: 0 2px 10px rgba(2, 69, 78, 0.2);
        padding: 0.75rem 2rem;
    }
    
    :global([data-theme="dark"]) .navbar.scrolled {
		box-shadow: 0 2px 10px rgb(0, 0, 0);
        background: #1a202c;
    }
    
    .navbar-container {
		width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 1700px;
        margin: 0 auto;
    }
    
    /* Logo and brand */
    .brand {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        text-decoration: none;
		margin-right:auto; /* Push everything else to the right */
    }
    
    .logo-img {
        height: 3.5rem;
        width: auto;
    }
    
    /* Desktop navigation */
    .desktop-nav {
        display: flex;
        align-items: center;
        gap: 1.5rem;
		margin: 0 2rem; /* Add margin to separate from logo and right actions */
    }
    
    .nav-link {
        color: var(--text);
        font-size: 1.25rem;
        font-weight: 500;
        text-decoration: none;
        padding: 0.5rem 0.75rem;
        border-radius: 0.5rem;
        transition: all 0.2s;
		position: relative; /* Added for positioning the pseudo-element */
    	transition: color 0.3s;
}

    
    .nav-link:hover, 
    .nav-link.active {
        color: #39b2c1;
    }

	/* Add the animated underline */
	.nav-link::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2px; /* Thin line */
		background-color: #39b2c1;
		transform: scaleX(0); /* Start with no width */
		transform-origin: right; /* For exit animation */
		transition: transform 0.3s ease-out;
	}

	/* When hovering or active, show the line */
	.nav-link:hover::after,
	.nav-link.active::after {
		transform: scaleX(1); /* Full width */
		transform-origin: left; /* For enter animation */
	}
    
    /* Right side actions */
    .right-actions {
        display: flex;
        align-items: center;
        gap: 1.5rem;
		margin-left: auto; /* Push everything to the far right */
    }
    
    .theme-toggle-container {
        display: flex;
        align-items: center;
    }
    
    .logout-btn {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 45px;
        height: 45px;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition-duration: .3s;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        background-color: var(--accent);  /* Use your accent color or specify rgb(255, 65, 65) */
    }
	.sign {
        width: 100%;
        transition-duration: .3s;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .sign svg {
        width: 17px;
        height: 17px;
    }

    .sign svg path {
        fill: white;
    }

    .text {
        position: absolute;
        right: 0%;
        width: 0%;
        opacity: 0;
        color: white;
        font-size: 1.2em;
        font-weight: 600;
        transition-duration: .3s;
    }
    
    .logout-btn:hover {
        width: 125px;
        border-radius: 40px;
        transition-duration: .3s;
    }

	.sign {
        width: 100%;
        transition-duration: .3s;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .sign svg {
        width: 17px;
        height: 17px;
    }

    .sign svg path {
        fill: white;
    }

    .text {
        position: absolute;
        right: 0%;
        width: 0%;
        opacity: 0;
        color: white;
        font-size: 1.2em;
        font-weight: 600;
        transition-duration: .3s;
    }
    
    /* Hamburger button */
    .hamburger-btn {
        display: none;
        flex-direction: column;
        justify-content: space-between;
        width: 1.5rem;
        height: 1.2rem;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
        z-index: 10;
    }
    
    .hamburger-line {
        display: block;
        width: 100%;
        height: 2px;
        background: var(--text);
        transition: all 0.3s;
    }
    
    .top-active {
        transform: translateY(8px) rotate(45deg);
    }
    
    .middle-active {
        opacity: 0;
    }
    
    .bottom-active {
        transform: translateY(-8px) rotate(-45deg);
    }
    
    /* Mobile menu */
    .mobile-menu {
        position: fixed;
        top: 4.5rem;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        padding: 1.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transform: translateY(-100%);
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease-in-out;
        z-index: 999;
    }
    
    :global([data-theme="dark"]) .mobile-menu {
        background: rgba(30, 30, 30, 0.95);
    }
    
    .mobile-menu.open {
        transform: translateY(0);
        opacity: 1;
        pointer-events: auto;
    }
    
    .mobile-nav {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .mobile-nav-link {
        color: var(--text);
        font-size: 1rem;
        font-weight: 500;
        text-decoration: none;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;
        transition: all 0.2s;
        background: none;
        border: none;
        text-align: left;
        cursor: pointer;
    }
    
    .mobile-nav-link:hover,
    .mobile-nav-link.active {
        background: rgba(49, 161, 4, 0.1);
        color: var(--accent);
    }
    
    /* Media queries */
    @media (max-width: 768px) {
        .desktop-nav, 
        .logout-btn {
            display: none;
        }
        
        .hamburger-btn {
            display: flex;
        }
        
        .navbar {
            padding: 0.75rem 1.5rem;
        }
    }
</style>