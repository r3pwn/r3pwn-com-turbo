// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';

import vercel from '@astrojs/vercel';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    icon({
      iconDir: '../../packages/icons/resources'
    })
  ],
  output: 'server',
  adapter: vercel({
    isr: {
      bypassToken: process.env.REVALIDATE_SECRET,
    }
  }),
  experimental: {
    fonts: [{
      provider: fontProviders.fontsource(),
      name: "DM Sans",
      cssVariable: "--font-dm-sans"
    }]
  }
});