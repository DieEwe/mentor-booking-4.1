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
    <img src="/images/InkluConnectLogoOriginalC.svg" alt="Inklu-Connect Logo"/>
</a>

<RoleSwitcher />
<div class="page-wrapper">
    <Menu />
    <div class="transparent-container">
        {#if !$user.loggedIn}
        <div class="homebutton-container">
        <button class="homebutton" on:click={() => showLoginModal = true}>
            Login
            <div class="icon">
            <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                fill="currentColor"
                ></path>
            </svg>
            </div>
        </button>

        <button class="homebutton" on:click={() => window.location.href = 'google.de'}>
            Bewerben
            <div class="icon">
            <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                fill="currentColor"
                ></path>
            </svg>
            </div>
        </button>
        </div>
        {/if}

        {#if $user.loggedIn || publicRoutes.includes($page.url.pathname)}
            <slot />
        {/if}
    </div>
    {#if showLoginModal}
        <LoginModal on:close={() => showLoginModal = false} />
    {/if}

    <ThemeToggle />
</div>



  <style>

    .logo {
		width: 100%;
		text-align: center;
		margin-bottom: 1rem;
	}

	.logo img {
		max-width: 120px;
	}

    .page-wrapper { min-height: 100vh; display: flex; flex-direction: column; position: relative; }

    .homebutton-container{
      display: flex;
      justify-content: center;
      align-items:center;
      gap: 3rem;
      height: 100vh;
    }

    .homebutton {
        min-width: 180px;
      background: #000000;
      color: white;
      font-family: inherit;
      padding: 0.35em;
      padding-left: 1.2em;
      font-size: 17px;
      font-weight: 500;
      border-radius: 1em;
      border: none;
      letter-spacing: 0.05em;
      display: flex;
      align-items: center;
      box-shadow: inset 0 0 1.6em -0.6em #4e5e8a;
      overflow: hidden;
      position: relative;
      height: 2.8em;
      padding-right: 3.3em;
      cursor: pointer;
    }
  
    .homebutton .icon {
      background: white;
      margin-left: 1em;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 2.2em;
      width: 2.2em;
      border-radius: 0.7em;
      box-shadow: 0.1em 0.1em 0.6em 0.2em #bebebe;
      right: 0.3em;
      transition: all 0.3s;
    }
  
    .homebutton:hover .icon {
      width: calc(100% - 0.6em);
    }
  
    .homebutton .icon svg {
      width: 1.1em;
      transition: transform 0.3s;
      color: #7b52b9;
    }
  
    .homebutton:hover .icon svg {
      transform: translateX(0.1em);
    }
  
    .homebutton:active .icon {
      transform: scale(0.95);
    }
  </style>
