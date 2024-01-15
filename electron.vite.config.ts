import react from '@vitejs/plugin-react';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import { resolve } from 'path';

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
                '@': resolve('src/frontend'),
                '@frontend': resolve('src/frontend'),
                '@shared': resolve('src/shared'),
                '@/hooks': resolve('src/frontend/hooks'),
                '@/components': resolve('src/frontend/components'),
                '@/assets': resolve('src/frontend/assets')
            }
        },
        plugins: [react()],
        root: './src/frontend',
        build: {
            rollupOptions: {
                input: {
                    index: resolve(__dirname, 'src/frontend/index.html'),
                    splash: resolve(__dirname, 'src/frontend/splash/index.html')
                }
            }
        }
    }
});
