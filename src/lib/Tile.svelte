<script lang="ts">
  export let title: string = '';
</script>

<div class="tile">
{#if title}
  <h2>{title}</h2>
{:else}
  <slot />
{/if}
</div>

<style>
.tile {
  background-color: var(--secondary);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}
.tile:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}
h2 {
  font-size: 1.75rem;
  color: var(--text);
  margin: 0;
}
</style>
