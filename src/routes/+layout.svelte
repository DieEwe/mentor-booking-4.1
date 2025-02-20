<script lang="ts">
	import '../app.css';
	import Menu from '$lib/Menu.svelte';
</script>

<div class="app-container">
	<Menu />
	<slot />
</div>

<style>
	.app-container {
	  width: 100%;
	  max-width: 1200px;
	  margin: 0 auto;
	  padding: 2rem;
	  background-color: var(--background);
	}
</style>
