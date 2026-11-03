import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project site base path. Update this if you rename the repository.
export default defineConfig({
  plugins: [react()],
  base: '/doctor-shivani-birthday/',
})
