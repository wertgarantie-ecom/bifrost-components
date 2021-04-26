import { defineConfig } from 'vite'
import svelte from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({ compilerOptions: { customElement: true } })],
  build: {
    target: "esnext",
    assetsDir: "",
    rollupOptions: {
      output: {
        format: 'esm',
        dir: 'dist',
        entryFileNames: 'rating.min.js'
      }
    }
  }
})
