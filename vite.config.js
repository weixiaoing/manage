import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }
      ]
    }),
    Components({
      dts:true,
      resolvers: [NaiveUiResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    hmr:true,     //启动热更新，就是更改了代码自动刷新页面
    port: 8082,    //自定义启动时的端口
    open: true,   //代表vite项目在启动时自动打开浏览器 
    proxy:{
     "/api": { 
            target: "http://xxx.xxx.xx.x:8080",
         //你的需要请求的服务器地址
            changeOrigin: true, // 允许跨域
          secure: false,  //忽略安全证书   
            rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径把路径变成空字符,
     },
 },
}
})
