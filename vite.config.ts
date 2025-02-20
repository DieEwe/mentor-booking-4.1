import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    fs: {
      allow: ['.']
    }
  },
  optimizeDeps: {
    include: ['@fullcalendar/common']
  },
  resolve: {
    dedupe: ['@fullcalendar/common'],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.svelte']
  }
});
