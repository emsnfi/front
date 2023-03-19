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
// proxy:{
//   '/api':{
//     target: 'https://gis.taiwan.net.tw/XMLReleaseALL_public/',
//     changeOrigin : true,
//     pathRewrite :{'^/api':''}
//   }
// }

})
