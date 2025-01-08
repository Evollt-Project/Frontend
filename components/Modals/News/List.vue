<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
import { VDialog, VBottomSheet } from "vuetify/components";
import { MdPreview, type PreviewThemes, type Themes } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import "~/assets/scss/news-markdown.scss";

const props = defineProps<{
  dialog: boolean;
  loading: boolean;
}>();
const emits = defineEmits(["dialog"]);

const dialog: Ref<boolean> = ref(props.dialog);
const { width } = useWindowSize();
const state = reactive({
  text: `
Привет, мир! [Duck Duck Go](https://duckduckgo.com "The best search engine for privacy")
`,
  theme: "dark" as Themes,
  style: "cyanosis" as PreviewThemes,
});

watch(dialog, (value) => {
  emits("dialog", value);
});

watch(
  () => props.dialog,
  (value) => {
    dialog.value = value;
  },
);
</script>

<template>
  <component
    :is="width > 650 ? VDialog : VBottomSheet"
    :max-width="width > 650 ? '800' : '650'"
    v-model="dialog"
    :persistent="loading"
  >
    <template v-if="dialog">
      <v-card
        rounded="xl"
        class="!bg-white dark:!bg-neutral-900 card-modal"
        variant="outlined"
        :loading="loading"
      >
        <v-card-title class="d-flex justify-space-between align-center p-0">
          Новости Evollt School
          <v-btn
            icon="mdi-close"
            :disabled="loading"
            variant="text"
            class="dark:text-white"
            :ripple="false"
            @click="dialog = false"
          ></v-btn>
        </v-card-title>
        <v-card-text class="dark:text-white">
          <div>
            <p class="text-md font-bold">27 декабря 2024 г. в 16:24</p>
            <MdPreview
              :modelValue="state.text"
              :theme="state.theme"
              :preview-theme="state.style"
            />
          </div>
        </v-card-text>
      </v-card>
    </template>
  </component>
</template>

<style scoped lang="scss"></style>
