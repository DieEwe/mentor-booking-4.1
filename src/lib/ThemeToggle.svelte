<script>
    import { writable } from 'svelte/store';
  
    // A simple store to track the theme state
    export const isDark = writable(false);
  
    function toggleTheme() {
      isDark.update(current => {
        const newTheme = !current;
        if (newTheme) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
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
      background: var(--button-bg);
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  </style>