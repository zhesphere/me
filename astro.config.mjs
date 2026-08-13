import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://orbitvo.com",
  output: "static",
  build: {
    inlineStylesheets: "auto"
  },
  vite: {
    build: {
      cssMinify: "lightningcss"
    }
  }
});
