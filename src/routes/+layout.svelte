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
    /* Add top margin to avoid overlap with the fixed logo if needed */
    margin-top: 0px;
  }
</style>
