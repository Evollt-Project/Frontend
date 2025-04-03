<script setup lang="ts">
import "@vavt/cm-extension/dist/previewTheme/arknights.css";
import "md-editor-v3/lib/style.css";
import { MdEditor, type Themes } from "md-editor-v3";
import type { Reactive } from "vue";

const props = defineProps<{
  text?: string;
  maxLength?: number;
}>();
const emits = defineEmits(["update:text"]);

type MdEditorConfig = {
  previewTheme: string;
  codeTheme: string;
  language: string;
  theme: Themes;
  maxLength?: number;
};

const text = ref(props.text ?? "");
const isDark = useDark();
const mdEditorConfig: Reactive<MdEditorConfig> = reactive({
  theme: isDark ? "dark" : "light",
  previewTheme: "arknights",
  codeTheme: "atom",
  language: "ru",
  maxLength: props.maxLength,
});

watch(text, (value) => emits("update:text", value));
watch(
  () => props.text,
  (value) => {
    text.value = value as string;
  },
);
watch(isDark, (value) => {
  mdEditorConfig.theme = value ? "dark" : "light";
});
</script>

<template>
  <ClientOnly>
    <MdEditor
      v-model="text"
      :language="mdEditorConfig.language"
      :preview-theme="mdEditorConfig.previewTheme"
      :theme="mdEditorConfig.theme"
      :code-theme="mdEditorConfig.codeTheme"
      :max-length="maxLength"
    />
    <div v-if="maxLength && text.length >= maxLength" class="!text-red-500">
      Вы ввели максимальное количество символов для этого поля
    </div>
  </ClientOnly>
</template>
