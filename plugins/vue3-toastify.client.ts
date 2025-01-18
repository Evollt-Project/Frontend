import { defineNuxtPlugin } from "#app";
import Toastify, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  const isDark = useDark();
  nuxtApp.vueApp.use(Toastify, {
    position: "top-right",
    autoClose: 3000,
    theme: isDark.value ? "dark" : "light",
  } as ToastContainerOptions);
});
