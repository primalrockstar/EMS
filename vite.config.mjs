// This file is at the monorepo root (EMS/vite.config.mjs)
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'
import { fileURLToPath } from 'url'

// __dirname workaround for ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, 'shared')
    }
  }
})
