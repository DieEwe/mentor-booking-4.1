<script lang="ts">
	// Import the Tile component from your lib folder
	import Tile from '$lib/Tile.svelte';

	// Create an array of placeholder items (for instance, numbers or titles)
	const tiles = ['Tile 1', 'Tile 2', 'Tile 3', 'Tile 4'];
</script>

<main>
	<section class="tiles" aria-label="Content Tiles">
		{#each tiles as tile}
			<Tile title={tile} />
		{/each}
	</section>
</main>

<style>
	main {
		padding: 2rem;
		flex: 1;
	}
	.tiles {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1.5rem;
	}
</style>
