import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [vue(), vueDevTools()],
    base: env.VITE_BASE || '/',
    build: { outDir: env.VITE_OUT_DIR || 'dist' },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use '@/assets/style/mixins' as *;
          @use '@/assets/style/variables' as v;
        `,
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//     vueDevTools(),
//   ],
//   css: {
//     preprocessorOptions: {
//       scss: {
//         additionalData: `
//           @use '@/assets/style/mixins' as *;
//           @use '@/assets/style/variables' as v;
//         `
//       }
//     }
//   },
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     },
//   },
// })
