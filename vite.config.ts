import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { env } from 'process'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  server: {
    port: 3003,
  },
})
