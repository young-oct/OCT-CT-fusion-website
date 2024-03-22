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

    // Modify rollup options to include all HTML files in the output directory
    rollupOptions: {
      input: {
        // Specify all HTML files here
        index: "index.html",
        "case1-axial": "case1-axial.html",
        "case1-coronal": "case1-coronal.html",
        "case1-sagittal": "case1-sagittal.html",
        "case2-axial": "case2-axial.html",
        "case2-coronal": "case2-coronal.html",
        "case2-sagittal": "case2-sagittal.html",
        "case3-axial": "case3-axial.html",
        "case3-coronal": "case3-coronal.html",
        "case3-sagittal": "case3-sagittal.html",
        contact: "contact.html",
        core_functions: "core_functions.html",
        fusion: "fusion.html",
        me_oct: "me_oct.html",
        OCT_basics: "OCT_basics.html",
        OCT_development: "OCT_development.html",
        OCT_realisation: "OCT_realisation.html",
        otology: "otology.html",
        policy: "policy.html",
        publication: "publication.html",
        template: "template.html",
        terms: "terms.html",
        tour_of_ear: "tour_of_ear.html",
        // Add script.js as an entry point
        main: "main.js",
        script: "script.js",
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
