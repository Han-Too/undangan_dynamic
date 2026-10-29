import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const backend = env.BACKEND_URL || 'http://127.0.0.1:8000';

  return {
    plugins: [vue()],
    // Hasil build ditaruh di backend/public/spa dan dilayani Laravel (satu domain dengan API).
    base: command === 'build' ? '/spa/' : '/',
    build: { outDir: '../backend/public/spa', emptyOutDir: true },
    server: {
      host: true,
      // Development: /api dan /storage diteruskan ke Laravel sehingga frontend & API terlihat satu domain.
      proxy: {
        '/api': { target: backend, changeOrigin: true },
        '/storage': { target: backend, changeOrigin: true },
      },
    },
  };
});
