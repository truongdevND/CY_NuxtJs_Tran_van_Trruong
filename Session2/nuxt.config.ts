// https://nuxt.com/docs/api/configuration/nuxt-config
import { routes } from "./router";
import type { NuxtPage } from "@nuxt/schema";
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  components: true,
  modules: ['@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      title: "Session2",
    },
  },

  hooks: {
    'pages:extend'(pages) {
      routes.forEach(route => {
        pages.push(route);
      });

      // Function to remove routes based on a filename pattern
      function removePagesMatching(pattern: RegExp, pages: NuxtPage[] = []) {
        const pagesToRemove: NuxtPage[] = [];
        for (const page of pages) {
          if (page.file && pattern.test(page.file)) {
            pagesToRemove.push(page);
          } else {
            removePagesMatching(pattern, page.children);
          }
        }
        for (const page of pagesToRemove) {
          pages.splice(pages.indexOf(page), 1);
        }
      }

      // Remove all pages matching `.ts` files
      removePagesMatching(/\.ts$/, pages);
    },
  },

})
