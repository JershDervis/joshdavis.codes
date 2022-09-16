import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercel from "@astrojs/vercel/serverless";
import image from "@astrojs/image";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: 'https://joshdavis.codes',
  integrations: [tailwind(), sitemap({
    filter: page => !page.startsWith('https://joshdavis.codes/api')
  }), image(), svelte()],
  output: 'server',
  adapter: vercel()
});