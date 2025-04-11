<script setup lang="ts">
import "@vavt/cm-extension/dist/previewTheme/arknights.css";
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

const props = defineProps<{
  text?: string;
}>();
const { mdEditorConfig } = useConfigStore();

const text = ref(props.text ?? "");
const isDark = useDark();

watch(
  () => props.text,
  (value) => {
    text.value = value as string;
  },
);
watch(
  isDark,
  (value) => {
    mdEditorConfig.theme = value ? "dark" : "light";
  },
  { immediate: true },
);
</script>

<template>
  <ClientOnly>
    <MdPreview
      v-model="text"
      :language="mdEditorConfig.language"
      :preview-theme="mdEditorConfig.previewTheme"
      :theme="mdEditorConfig.theme"
      :code-theme="mdEditorConfig.codeTheme"
    />
  </ClientOnly>
</template>
