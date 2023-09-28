import vue from '@vitejs/plugin-vue'
import reactivityTransform from '@vue-macros/reactivity-transform/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    reactivityTransform(),
  ],
})
