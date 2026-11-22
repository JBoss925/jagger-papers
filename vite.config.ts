import { fileURLToPath } from "node:url";
import path from "node:path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ["react", "react-dom"],
    alias: {
      "@jagger-ui": path.resolve(rootDir, "packages/jagger-ui/src"),
      "@": path.resolve(rootDir, "src")
    }
  },
  server: {
    port: 5176,
    strictPort: true
  },
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    css: true,
    globals: true,
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"]
  }
});
