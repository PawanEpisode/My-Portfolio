import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { codeInspectorPlugin } from "code-inspector-plugin";

// https://vite.dev/guide/env-and-mode.html
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    mode === "development" &&
      codeInspectorPlugin({
        bundler: "vite",
      }),
  ].filter(Boolean),
  server: {
    host: true,
    port: 5199,
    strictPort: true,
    // *.meetpawan.com (hosts file) + *.localhost (browser loopback, no hosts).
    allowedHosts: [".meetpawan.com", ".localhost"],
  },
  preview: { port: 5199, strictPort: true, host: true },
}));
