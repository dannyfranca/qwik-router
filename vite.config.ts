import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  return {
    build: {
      target: "es2020",
      lib: {
        entry: "./src/index.ts",
        formats: ["es", "cjs"],
        fileName: (format) => `index.qwik.${format === "es" ? "mjs" : "cjs"}`,
      },
      rollupOptions: {
        external: ["@builder.io/qwik"],
      },
    },
    plugins: [qwikVite(), tsconfigPaths()],
    test: {
      environment: "happy-dom",
      globals: true,
      watch: false,
      include: ["test/**/*.test.{ts,tsx}"],
      clearMocks: true,
      coverage: {
        all: true,
        enabled: true,
        provider: "istanbul",
        branches: 100,
        lines: 100,
        functions: 100,
        statements: 100,
        include: ["src/**/**"],
        exclude: ["src/listen-to-route-changes.ts"],
        extension: [".js", ".ts", ".tsx"],
        reporter: ["text"],
      },
    },
  };
});
