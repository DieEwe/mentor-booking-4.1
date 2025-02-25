<script lang="ts">
    import '../app.css';
    import Menu from '$lib/Menu.svelte';
    import RoleSwitcher from '$lib/components/RoleSwitcher.svelte';
    import { dev } from '$app/environment';
    import { user } from '$lib/stores';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    
    // Define public routes that don't require authentication
    const publicRoutes = ['/', '/login', '/bewerbung'];
    
    // Check if current route requires authentication
    $: if (!$user.loggedIn && !publicRoutes.includes($page.url.pathname)) {
        goto('/');
    }
</script>

<div class="app-container">
    {#if dev}
        <RoleSwitcher />
    {/if}
    
    <Menu />
    <main class="main-content">
        <div class="opaque-container">
            {#if $user.loggedIn || publicRoutes.includes($page.url.pathname)}
                <slot />
            {/if}
        </div>
    </main>
</div>

<style>
    .app-container {
        min-height: 100vh; /* Full height */
        width: 100%;
		max-width: 1800px;
		margin-top: calc(60px + 4rem); /* Menu height + extra spacing */
		overflow: hidden;  /* Ensures content respects the rounded corners */
    }


    .main-content {
        width: 90%;
        margin: 0 auto;
    }


</style>
