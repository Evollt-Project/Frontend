// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/scss/main.scss"],
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "vuetify-nuxt-module",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
  ],
  alias: {
    "@": "./",
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  plugins: ["~/plugins/preline.client.ts"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern",
        },
      },
    },
  },
});
