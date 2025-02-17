<script>
  import '../app.css';
  import Menu from '$lib/Menu.svelte';
</script>

<!-- Fixed logo at top left -->
<div class="logo-container">
  <img src="/path/to/your-logo.png" alt="Your Logo" />
</div>

<!-- Main content container -->
<div class="app-container">
  <Menu />
  <slot />
</div>

<style>
  /* Fixed logo styling */
  .logo-container {
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 1000; /* Ensure logo appears above other content */
  }

  /* Main content container styling */
  .app-container {
    /* Add right padding to reserve space for the fixed menu.
       Adjust '150px' to match the width (plus desired margin) of your Menu component. */
    padding-right: 150px;
    /* Add top margin to avoid overlap with the fixed logo if needed */
    margin-top: 80px;
  }
</style>
