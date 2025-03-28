import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Local-Event-Explorer/', // Ensure the base path matches the GitHub repository name
  plugins: [react()],
});
