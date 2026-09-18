import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function demoIndex() {
  return {
    name: 'demo-index',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url === '/demo' || req.url === '/demo/') req.url = '/demo/index.html'
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [demoIndex(), react(), tailwindcss()],
})
