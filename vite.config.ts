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
		dedupe: ['@fullcalendar/common']
	}
});
