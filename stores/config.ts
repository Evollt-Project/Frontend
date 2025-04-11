import type { Reactive } from "vue";
import type { Config } from "~/types/MdEditor";

export const useConfigStore = defineStore("config", () => {
  const mdEditorConfig: Reactive<Config> = reactive({
    theme: useDark() ? "dark" : "light",
    previewTheme: "arknights",
    codeTheme: "atom",
    language: "ru",
  });

  return {
    mdEditorConfig,
  };
});
