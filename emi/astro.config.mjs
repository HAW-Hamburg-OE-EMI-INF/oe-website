import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { faculties } from "@oe/shared/data/faculty.js";
import { sharedWorkspaceViteConfig } from "@oe/shared/vite-shared";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: faculties.EMI.website,
  output: "static",
  integrations: [mdx(), sitemap()],
  vite: {
    ...sharedWorkspaceViteConfig,
    plugins: [tailwindcss(), ...sharedWorkspaceViteConfig.plugins],
  },
});
