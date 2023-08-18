import { fileURLToPath, URL } from 'node:url'
import { dirname } from 'node:path' // Import dirname function
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { quasar } from '@quasar/vite-plugin'

const __filename = fileURLToPath(import.meta.url) // Convert import.meta.url to __filename
const __dirname = dirname(__filename) // Get the directory name from the filename

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    quasar({
      sassVariables: 'src/quasar-variables.sass'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~bootstrap': `${__dirname}/node_modules/bootstrap` // Use __dirname directly
    }
  }
})
