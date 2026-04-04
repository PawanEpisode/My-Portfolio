import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5199,
    strictPort: true,
    // *.meetpawan.com (hosts file) + *.localhost (browser loopback, no hosts).
    allowedHosts: [".meetpawan.com", ".localhost"],
  },
  preview: { port: 5199, strictPort: true, host: true },
});
