// electron.vite.config.mjs
import { defineConfig } from 'electron-vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
    server: {
    proxy: {
      '/api': {
        target: 'https://slackcord-backend.vercel.app',
        changeOrigin: true,
        secure: false
      }
    }
  },
  main: {
    build: {
      lib: {
        entry: resolve(__dirname, 'electron/main.js'),
      },
    },
  },
  preload: {
    build: {
      lib: {
        entry: resolve(__dirname, 'electron/preload.js'),
      },
    },
  },
  renderer: {
  root: __dirname,
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: resolve(__dirname, 'index.html'),
    },
  },
  plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      port: 5173,
      strictPort: true,
    },
  },
});