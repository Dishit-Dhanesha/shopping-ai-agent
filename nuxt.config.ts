export default defineNuxtConfig({

  modules: [
    '@nuxt/scripts',
    '@nuxt/ui',
    '@nuxt/eslint',
    [
      '@nuxt/image',
      {
        domains: ['cdn.shopify.com'],
      },
    ],
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-og-image',
    'nuxt-lazy-hydrate',
  ],

  devtools: { enabled: true },


  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://shopping-ai-agent-rho.vercel.app/',
  },

  colorMode: {
    preference: 'dark',
  },

  runtimeConfig: {
    public: {
      siteUrl: 'https://shopping-ai-agent-rho.vercel.app/',
    },
  },

  routeRules: {
    '/**': {
      robots: true,
      isr: process.env.NODE_ENV === 'development' ? false : 60,
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    viewTransition: true,
  },

  compatibilityDate: '2024-11-11',

  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
  },

  icon: {
    // We have to add icons to the client bundle because otherwise the icons do not appear sometimes on client side navigation.
    clientBundle: {
      scan: true,
      includeCustomCollections: true,
      sizeLimitKb: 256,
    },
  },

  sitemap: {
    sources: [
      '/api/__sitemap__/urls',
    ],
  },
})
