<script>
    import '../app.css'
    import Menu from '$lib/Menu.svelte';
    import ThemeToggle from '$lib/ThemeToggle.svelte';
    // Import any stores you use (e.g., for login state)
  </script>
  
  <div class="app-container">
    <!-- Non-sticky menu will be positioned in Menu.svelte -->
    <Menu />
    <ThemeToggle />
    <slot />
  </div>
  
  <style>
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
  </style>