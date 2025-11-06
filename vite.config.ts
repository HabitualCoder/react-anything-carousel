import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: 'src',
      tsconfigPath: 'tsconfig.build.json',
      outputDir: 'dist',
      rollupTypes: true
    })
  ],
  build: {
    lib: {
      entry: resolve(rootDir, 'src/index.ts'),
      name: 'ReactAnythingCarousel',
      formats: ['es', 'cjs'],
      fileName: (format: 'es' | 'cjs') =>
        format === 'es'
          ? 'react-anything-carousel.js'
          : 'react-anything-carousel.cjs'
    },
    rollupOptions: {
      input: {
        index: resolve(rootDir, 'src/index.ts'),
        styles: resolve(rootDir, 'src/styles.ts')
      },
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    cssCodeSplit: false,
    sourcemap: true,
    outDir: 'dist',
    emptyOutDir: true
  }
});
