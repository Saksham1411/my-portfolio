import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  return {
    plugins: [react()],
    server: {
      port: 3000,
      open: false,
    },
    build: {
      target: 'esnext',
      minify: isProd ? 'esbuild' : false,
      cssMinify: isProd,
      sourcemap: !isProd,
      rollupOptions: {
        output: {
          manualChunks: isProd
            ? {
                'vendor-react': ['react', 'react-dom'],
                'vendor-styled': ['styled-components'],
                'vendor-icons': ['lucide-react'],
              }
            : undefined,
        },
      },
      chunkSizeWarningLimit: 600,
    },
    esbuild: isProd
      ? {
          drop: ['console', 'debugger'],
        }
      : undefined,
  };
});
