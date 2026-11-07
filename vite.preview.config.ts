import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { contentPlugin } from './export-plugins/content-plugin/index.ts';

// Builds one self-contained bundle (fonts and images inlined) for preview.html
export default defineConfig({
  base: './',
  publicDir: false,
  plugins: [react(), contentPlugin()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  build: {
    outDir: path.resolve(__dirname, 'dist-preview'),
    emptyOutDir: true,
    assetsInlineLimit: 100_000_000,
    cssCodeSplit: false,
    rollupOptions: { input: path.resolve(__dirname, 'preview/index.html'), output: { inlineDynamicImports: true } },
  },
});
