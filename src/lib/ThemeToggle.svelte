<script>
  import { writable } from 'svelte/store';

  // A simple store to track the current theme state
  export const isDark = writable(false);

  function toggleTheme() {
    isDark.update(current => {
      const newTheme = !current;
      // Set the data-theme attribute on the document element
      document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  }
</script>

<button on:click={toggleTheme} aria-label="Toggle Light/Dark Mode">
  Toggle Theme
</button>

<style>
  button {
    margin: 1rem;
    padding: 0.5rem 1rem;
    /* Use the new accent color for the button background */
    background: var(--accent);
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>
