<script lang="ts">
    import '../app.css';
    import Menu from '$lib/Menu.svelte';
    import RoleSwitcher from '$lib/components/RoleSwitcher.svelte';
    import LoginModal from '$lib/components/LoginModal.svelte';
    import { user } from '$lib/stores';
    import { page } from '$app/stores';
    import ThemeToggle from '$lib/ThemeToggle.svelte';

    const publicRoutes = ['/', '/login', '/bewerbung'];

    // Control the visibility of the login modal
    let showLoginModal = false;
</script>

<a href="/" class="logo">
    <img src="/images/InkluConnectLogoOriginalC.png" alt="Inklu-Connect Logo"/>
</a>

<div class="transparent-container">
{#if $user.loggedIn || publicRoutes.includes($page.url.pathname)}
<slot />
{/if}
</div>

<div class="overwrite-themetoggle-position">
<ThemeToggle />
</div>

<RoleSwitcher />

    <Menu />
    


  <style>
    .overwrite-themetoggle-position {
      position: fixed; /* Changed to fixed to keep it in place */
      top: 2.5rem;
      right: 2.5rem;
      z-index: 1000;
    }
  
    .logo {
      position: fixed;
      top: 2.5rem;
      left: 2.5rem;
      z-index: 1000;
      transition: all 0.3s ease; /* Smooth transition for centering */
    }
  
    .logo img {
      max-width: 150px;
    }
  
  
    @media (max-width: 768px) {
      .logo {
        left:50%; /* center the logo horizontally */
        transform: translateX(-50%); /* correct positioning to center */
      }
    }
  </style>
