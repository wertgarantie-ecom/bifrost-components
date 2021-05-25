import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: 'src/rating.ts',
			formats: ['es']
		},
		rollupOptions: {
			// external: /^lit/
			// external: /^wertgarantie-common/
			output: {
				format: 'esm',
				dir: 'dist',
				entryFileNames: 'rating.min.js'
			},
		},
	}
})
