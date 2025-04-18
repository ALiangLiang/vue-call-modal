import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import viteplay from '@viteplay/plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: 'src',
      tsconfigPath: 'tsconfig.app.json',
    }),
    viteplay({})
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'VueCallModal',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'cjs', 'umd']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  publicDir: false,
})
