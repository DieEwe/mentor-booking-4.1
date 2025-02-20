<script lang="ts">
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
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

</style>
