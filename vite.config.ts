/// <reference types="vitest" />
import { defineConfig } from "vite";
import { resolve, extname, relative } from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { glob } from "glob";
import { fileURLToPath } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Inject CSS into the bundle, so consuming apps don't need to import it separately
    libInjectCss(),
    // Generate type definitions
    dts({
      include: ["src/**/!(*.spec|*.test|*.stories).{ts,tsx}"],
      exclude: ["src/setupTests.ts"],
    }),
  ],
  build: {
    lib: {
      // Use library mode to build just the code in src
      entry: resolve(__dirname, "src/main.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      // Don't include react or react/jsx-runtime in the bundle - they will be provided by the consuming app.
      external: ["react", "react/jsx-runtime"],
      // Generate an entry point for each file in src, rather than having all built code in the single main.js file.
      input: Object.fromEntries(
        glob
          .sync("src/**/!(*.spec|*.test|*.stories).{ts,tsx}", {
            ignore: ["src/**/*.d.ts", "src/setupTests.ts"],
          })
          .map((file) => [
            // The name of the entry point
            // src/nested/foo.ts becomes nested/foo
            relative("src", file.slice(0, file.length - extname(file).length)),
            // The absolute path to the entry file
            // src/nested/foo.ts becomes /project/src/nested/foo.ts
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["lcov", "json-summary"],
    },
  },
});
