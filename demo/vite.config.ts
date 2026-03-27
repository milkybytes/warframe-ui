import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      '@milkybytes/warframe-ui/style.css': path.resolve(__dirname, '../src/themes.css'),
      '@milkybytes/warframe-ui': path.resolve(__dirname, '../src/index.ts'),
    },
    dedupe: ['react', 'react-dom'],
  },
});
