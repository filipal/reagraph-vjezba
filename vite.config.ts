import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    // (opcionalno) uredniji nazivi klasa u dev-u, hash u productionu
    modules: {
      localsConvention: 'camelCaseOnly',
      generateScopedName:
        process.env.NODE_ENV === 'production'
          ? '[hash:base64:7]'
          : '[name]__[local]__[hash:base64:5]',
    },
    preprocessorOptions: {
      scss: {
        // auto-ubrizgaj shared varijable i mixine u SVE .scss/.module.scss datoteke
        additionalData: `
          @use "@/styles/variables" as *;
          @use "@/styles/mixins" as *;
        `,
      },
    },
  },
})