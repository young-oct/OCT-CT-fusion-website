import { defineConfig } from "vite";

export default defineConfig({
  // The base path for your application
  base: "./",

  // Development server configuration
  server: {
    // Port number
    port: 3000,

    // Hostname
    host: "localhost",

    // Enable HTTPS
    https: false,
  },

  // Production build configuration
  build: {
    // Adjust the chunk size warning limit as needed
    chunkSizeWarningLimit: 1000,

    // Output directory
    outDir: "dist",

    // Ensure that assets are served relative to the current directory
    assetsDir: "./",

    // Enable/disable minification
    minify: true,

    // Enable/disable CSS code splitting
    cssCodeSplit: true,

    // Configure assets behavior
    assetsInlineLimit: 4096,

    // Configure source map generation
    sourcemap: false,

    // Modify rollup options to include STL file in the output directory
    rollupOptions: {
      input: {
        main: "index.html",
      },
      output: {
        // Ensure your STL file is included in the output directory
        // (e.g., if it's in the "public/models" directory)
        dir: "dist",
        entryFileNames: "[name].[hash].js",
      },
    },
  },
});
