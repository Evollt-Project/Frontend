// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: process.env["APP_NAME"], // Заголовок по умолчанию
      titleTemplate: `%s | ${process.env["APP_NAME"]}`, // Шаблон для всех страниц
    },
  },
  runtimeConfig: {
    public: {
      app_name: process.env["APP_NAME"],
      url: process.env["URL"],
      dadataToken: process.env["DADATA_TOKEN"],
      dadataSecretToken: process.env["DADATA_SECRET_TOKEN"],
    },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/scss/main.scss"],
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "vuetify-nuxt-module",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "nuxt-lodash",
    "@nuxt/eslint",
  ],
  pinia: {
    storesDirs: ["./stores/**"],
  },
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
  plugins: [
    { src: "~/plugins/v-mask.ts" },
    { src: "~/plugins/vue3-toastify.client.ts", mode: "client" },
    { src: "~/plugins/vue-markdown-preview.ts", mode: "client" },
    { src: "~/plugins/vuedraggable.ts", mode: "client" },
    { src: "~/plugins/bitrix-chat.client.ts", mode: "client" },
  ],
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
