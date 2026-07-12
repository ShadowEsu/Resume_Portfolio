import path from 'path';
import { cpSync } from 'fs';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const isProd = mode === 'production';
    return {
      // GitHub Pages needs subpath; local dev uses root so localhost works
      base: isProd ? '/Resume_Portfolio/' : '/',
      server: {
        port: 4321,
        strictPort: true,
        host: '0.0.0.0',
        open: true,
      },
      plugins: [
        react(),
        {
          name: 'copy-static-assets',
          closeBundle() {
            cpSync('js', 'dist/js', { recursive: true });
            cpSync('images', 'dist/images', { recursive: true });
          },
        },
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        },
      },
    };
});
