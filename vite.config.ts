/// <reference types="vitest" />

import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '@hankit/tools': path.resolve(__dirname, 'packages/tools/src/index.ts'),
    },
  },
  define: {
    'import.meta.vitest': 'false',
  },
  plugins: process.env.TEST
    ? []
    : [
        Vue(),
        AutoImport({
          imports: [
            'vue',
            '@vueuse/core',
          ],
          dts: true,
        }),
        Components({
          resolvers: [NaiveUiResolver()],
          dts: true,
        }),
        Unocss(),
      ],
  test: {
    includeSource: ['packages/*/src/**/*.ts'],
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('locale'))
            return 'locale'
          if (id.includes('idioms.txt'))
            return 'idioms'
          if (id.includes('hintTip.txt'))
            return 'hintTip'
          if (id.includes('polyphones.json'))
            return 'polyphones'
          if (id.includes('node_modules') && !id.endsWith('.css'))
            return 'vendor'
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
  },
})
