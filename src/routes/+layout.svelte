<script lang="ts">
    import '../app.css';
    import Menu from '$lib/Menu.svelte';
    import { user } from '$lib/stores';
    import { page } from '$app/stores';
    import UserSwitcher from '$lib/components/UserSwitcher.svelte';
    import GradientCircle from '$lib/components/GradientCircle.svelte';
    import '$lib/styles/calendar.css';

    const publicRoutes = ['/', '/login', '/bewerbung'];

    // Control the visibility of the login modal
    let showLoginModal = false;
</script>

<div class="background-elements">
  <GradientCircle 
      x="300px" 
      y="400px"
      position="custom" 
      primaryColor="rgba(57, 229, 226, 0.8)"
      hideInDarkMode={true}
  />
</div>


{#if $user.loggedIn || publicRoutes.includes($page.url.pathname)}
<slot />
{/if}




<!-- temporary userswitcher -->
 <div class="overwrite-userswitcher-position">
    <UserSwitcher />
  {#if $user.loggedIn}
    <p>Logged in as: {$user.vorname} {$user.name} ({$user.role})</p>
  {:else}
    <p>Not logged in.</p>
  {/if}
</div>


    <Menu />
    
  <style>

    .background-elements {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: -1;
    }


    .overwrite-userswitcher-position {
      position: fixed; /* Changed to fixed to keep it in place */
      bottom: 2.5rem;
      right: 2.5rem;
      z-index: 1000;
    }

  

  </style>
