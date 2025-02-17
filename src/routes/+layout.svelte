<script>
  import '../app.css';
  import Menu from '$lib/Menu.svelte';
</script>


<!-- Main content container -->
<div class="app-container">
  <Menu />
  <slot />
</div>

<style>

  /* Main content container styling */
  .app-container {
    max-width: 1200px; /* or whatever max width you prefer */
  margin: 0 auto;    /* center the content */
  padding: 0 1rem;   /* 1rem of space on left and right */
  }
</style>
