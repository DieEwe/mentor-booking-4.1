// svelte.config.js
import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

const config = {
  // Use svelte-preprocess to support extra syntaxes (e.g. TypeScript, SCSS, etc.)
  preprocess: preprocess(),
  kit: {
    // Choose an adapter based on your deployment (adapter-auto works for many cases)
    adapter: adapter()
  }
};

export default config;
