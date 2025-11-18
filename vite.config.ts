import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks
          "react-vendor": ["react", "react-dom"],
          "wagmi-vendor": ["wagmi", "viem", "@tanstack/react-query"],
          "rainbowkit-vendor": ["@rainbow-me/rainbowkit"],
          "ethers-vendor": ["ethers"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
