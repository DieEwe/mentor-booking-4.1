<script lang="ts">
    import '../app.css';
    import Menu from '$lib/Menu.svelte';
    import RoleSwitcher from '$lib/components/RoleSwitcher.svelte';
    import { dev } from '$app/environment';
</script>

<div class="app-container">
    <!--role switcher temporary-->
    {#if dev}
        <RoleSwitcher />
    {/if}
    
    <Menu />
    <main class="main-content">
        <div class="content-container">
            <slot />
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

    .content-container {
        background: white;
        border-radius: var(--border-radius);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        padding: 2rem;
        min-height: 600px;
    }

    .main-content {
        width: 90%;
        margin: 0 auto;
    }



    @media (max-width: 768px) {
        .content-container {
            padding: 1rem;
        }
    }
</style>
