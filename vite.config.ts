import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@components": "/src/components",
      "@state": "/src/state",
      "@utils": "/src/utils",
    },
  },
  plugins: [react()],
  base: "./",
});
