import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    assetsInlineLimit: Infinity,
    chunkSizeWarningLimit: 6000,
  },
});
