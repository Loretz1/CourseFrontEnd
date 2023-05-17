import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  server: {
    host: '0.0.0.0',
	  port: 8080,
    // open: true, 
    // cors: true, 
    proxy: { 
      '/api': {
        target: 'http://123.249.97.14:9090', // 后端服务实际地址
        changeOrigin: true,
        // pathRewrite:{  // 路径重写，
        //   '^/api': ''  // 替换target中的请求地址
        // }
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }


})
