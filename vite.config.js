import { defineConfig } from "vite";
import fs from "fs";
import path from "path";
// Ensure proper plugins are imported, if any are used

export default defineConfig({
  root: path.resolve(__dirname, "src"),
  // base: "/OCT-CT-fusion-website/",
  // base: '/',
  publicDir: path.resolve(__dirname, "public"),

  // Development server configuration
  server: {
    port: 3000,
    host: "localhost",
    https: false,
  },
  // Production build configuration
  build: {
    chunkSizeWarningLimit: 1000,
    assetsDir: "assets", // Specify a directory within `dist` for better organization
    outDir: path.resolve(__dirname, "dist"), // Ensure the output directory is correctly resolved

    minify: "esbuild", // Use 'esbuild' for faster minification
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    sourcemap: false,

    // Adjusting rollupOptions to better handle input and output settings
    rollupOptions: {
      input: {
        ...Object.fromEntries(
          fs
            .readdirSync(path.resolve(__dirname, "src"))
            .filter((file) => file.endsWith(".html"))
            .map((file) => [path.basename(file, ".html"), path.resolve(__dirname, "src", file)])
        ),
        main: path.resolve(__dirname, "src/js/main.js"),
        script: path.resolve(__dirname, "src/js/script.js"),
      },
      output: {
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash][extname]",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      // Add more aliases as needed
    },
  },
});
