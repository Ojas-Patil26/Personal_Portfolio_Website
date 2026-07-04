import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // react-three-fiber runs its own reconciler; dedupe so it shares the app's
  // single React instance (otherwise: "Invalid hook call / more than one copy").
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
})
