import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const isElectron = process.env.BUILD_TARGET === 'electron';

export default defineConfig(() => {
  return {
    base: isElectron ? './' : '/',
    plugins: [
      react(), 
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        disable: isElectron, // disable PWA service worker for Electron
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
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
