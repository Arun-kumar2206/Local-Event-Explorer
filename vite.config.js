import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/Local-Event-Explorer/', // Set the base path to match your GitHub repository name
  plugins: [react()],
});
