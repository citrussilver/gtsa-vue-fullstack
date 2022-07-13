import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    // proxy: {
    //     // with options
    //     '^/': {
    //       target: 'http://localhost:5000/',
    //       changeOrigin: true,
    //     }
    //   }
})