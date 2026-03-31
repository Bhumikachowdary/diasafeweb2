import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://180.235.121.253:8101',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
