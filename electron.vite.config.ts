import react from '@vitejs/plugin-react'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@shared': resolve('src/shared')
      }
    },
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/backend/index.ts')
        }
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/preload/index.ts')
        }
      }
    }
  },
  renderer: {
    resolve: {
      alias: {
        '@frontend': resolve('src/frontend/src'),
        '@shared': resolve('src/shared'),
        '@/hooks': resolve('src/frontend/src/hooks'),
        '@/components': resolve('src/frontend/src/components'),
        '@/assets': resolve('src/frontend/src/assets')
      }
    },
    plugins: [react()],
    root: './src/frontend',
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/frontend/index.html')
        }
      }
    }
  }
})
