import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    VitePWA({
      registerType: "autoUpdate",
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts",
      injectRegister: false,
      includeAssets: [
        "favicon.svg",
        "apple-touch-icon.png",
        "offline.html",
        "pwa-icon-192.png",
        "pwa-icon-512.png",
        "pwa-maskable-512.png",
      ],
      manifest: {
        name: "MAAAX WHOLESALER",
        short_name: "MAAAX",
        description:
          "Shop the latest fashion from MAAAX WHOLESALER and check product availability at your nearest branch.",
        display: "standalone",
        start_url: "/",
        scope: "/",
        theme_color: "#0B0B0B",
        background_color: "#F7F5F0",
        orientation: "portrait-primary",
        icons: [
          { src: "/pwa-icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/pwa-icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "/pwa-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
