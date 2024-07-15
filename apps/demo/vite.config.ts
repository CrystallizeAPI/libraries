import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/libraries',
    plugins: [react()],
    build: {
        chunkSizeWarningLimit: 2000,
    },
});
