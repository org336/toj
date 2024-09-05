import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
export default defineConfig({
  plugins: [vue(), vuetify()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3072, //前端端口号
    hmr: true,
    cors: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000", //后端端口号
        changeOrigin: true,
        pathRewrite: {
          "^api": "/api",
        },
      },
    },
  },
});
