<script setup lang="ts">
import "@vavt/cm-extension/dist/previewTheme/arknights.css";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

const props = defineProps<{
  text?: string;
  maxLength?: number;
}>();
const emits = defineEmits(["update:text"]);
const { mdEditorConfig } = useConfigStore();

const text = ref(props.text ?? "");
const isDark = useDark();

watch(text, (value) => emits("update:text", value));
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
