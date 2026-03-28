import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({ include: ['src'], insertTypesEntry: true }),
  ],
  build: {
    lib: {
      entry: resolve('src/index.ts'),
      name: 'WarframeUI',
      formats: ['es'],
      fileName: () => 'index.es.js',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        banner: "'use client';",
      },
    },
    cssCodeSplit: false,
  },
});
