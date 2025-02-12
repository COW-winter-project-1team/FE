/* eslint-disable no-undef */
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          secure: false,
        },
        '/clova': {
          target: env.VITE_CLOVA_STT_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/clova/, ''),
          secure: false,
        },
      },
    },
  });
};
