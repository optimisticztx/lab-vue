import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import path from "path";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
// https://vite.dev/config/
export default defineConfig({
  server:{
    port:8111,
    proxy:{
      // 后端配置
      '/api':{
        target:'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/lims'),
      },

    }
  },
  resolve: {
    alias: {
      "@": path.resolve("src"),
    },
  },
  plugins: [
      Vue(),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: "Icon",
        }),
      ],
      imports: ['vue','vue-router','pinia'],
      dts: "src/auto-imports.d.ts",
    }),
    Icons({
      autoInstall: true,
    }),
    Components({
    resolvers:[
        ElementPlusResolver(),
      IconsResolver({
        enabledCollections: ["ep"],
      }),]
  })],
  build: {
    /** If you set esmExternals to true, this plugins assumes that
     all external dependencies are ES modules */
    commonjsOptions: {
      esmExternals: true
    },
  },

})
