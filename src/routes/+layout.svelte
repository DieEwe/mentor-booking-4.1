<script lang="ts">
    import '../app.css';
    import Menu from '$lib/Menu.svelte';
    import RoleSwitcher from '$lib/components/RoleSwitcher.svelte';
    import { dev } from '$app/environment';
    import { user } from '$lib/stores';
    import { page } from '$app/stores';
    
    // Define public routes that don't require authentication
    const publicRoutes = ['/', '/login', '/bewerbung'];
</script>

<div class="page-wrapper">
    {#if dev}
        <RoleSwitcher />
    {/if}
    
    <Menu />
    <div class="transparent-container">
        {#if $user.loggedIn || publicRoutes.includes($page.url.pathname)}
            <slot />
        {/if}
    </div>
</div>
