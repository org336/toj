import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 2048,
    hmr: true,
    cors: true,
    proxy: {
      "/api": {
        target: "https://mock.presstime.cn/mock/66371c11d4a8a220672371be",
        changeOrigin: true,
        pathRewrite: {
          "^api": "/api",
        },
      },
    },
  },
});
