<script>
    import '../app.css'
    import Menu from '$lib/Menu.svelte';
    // Import any stores you use (e.g., for login state)
  </script>
  
  <div class="logo-container">
    <img src="/path/to/your-logo.png" alt="Your Logo" />
  </div>
  

  <div class="app-container">
    <!-- Non-sticky menu will be positioned in Menu.svelte -->
    <Menu />
    <slot />
  </div>
  
  <style>
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .logo-container {
      position: fixed;
      top: 1rem;
      left: 1rem;
    }

  </style>