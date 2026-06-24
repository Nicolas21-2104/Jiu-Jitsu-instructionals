import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['CJHelioGracie.jpeg'],
        manifest: {
          name: 'The Buggy Playbook',
          short_name: 'BuggyApp',
          description: 'BJJ Fanatics Instructional App',
          theme_color: '#0b0d13',
          background_color: '#0b0d13',
          display: 'standalone',
          orientation: 'portrait',
          icons: [
            {
              src: 'CJHelioGracie.jpeg',
              sizes: '192x192',
              type: 'image/jpeg'
            },
            {
              src: 'CJHelioGracie.jpeg',
              sizes: '512x512',
              type: 'image/jpeg'
            }
          ]
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
