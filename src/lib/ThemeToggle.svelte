<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  export const isDark = writable(false);
 

 // Reactive declaration for the image source.
  // Replace the paths with your actual PNG file locations.
  $: themeImage = $isDark
    ? '/images/switchoff.png'  // Image for dark theme (switch toggled "on")
    : '/images/switchon.png'; // Image for light theme (switch toggled "off")

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
  <img src={themeImage} alt={$isDark ? "Switch to light mode" : "Switch to dark mode"} />
</button>

<style>
  button {
    margin: 1rem;
    padding: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
  }
  img {
    display: block;
    width: 2rem; /* Adjust size as needed */
    height: auto;
  }
</style>
