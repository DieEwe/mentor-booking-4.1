<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  export const isDark = writable(false);
  $: themeLabel = $isDark ? 'light' : 'dark';

  onMount(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  });

  function toggleTheme() {
    isDark.update(current => {
      const newTheme = !current;
      document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  }
</script>

<button on:click={toggleTheme} aria-label="Toggle Light/Dark Mode">
  {themeLabel}
</button>

<style>
  button {
    margin: 1rem;
    padding: 0.5rem 1rem;
    /* Use the new accent color for the button background */
    background: var(--primary);
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>
