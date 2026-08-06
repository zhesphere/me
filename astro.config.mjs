import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://a.zsphere.top",
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
