<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
import { VBottomSheet, VDialog } from "vuetify/components";
import type { TabType } from "~/types/TabType";
import { MOBILE_VERSION_WIDTH } from "~/consts/config";

const props = defineProps<{
  dialog: boolean;
  tab: TabType;
}>();
const emits = defineEmits(["dialog"]);

const dialog: Ref<boolean> = ref(props.dialog);
const tab: Ref<TabType> = ref(props.tab);
const { width } = useWindowSize();
const loading = ref(false);

watch(dialog, (value) => {
  emits("dialog", value);
});

watch(
  () => props.dialog,
  (value) => {
    dialog.value = value;
  },
);

watch(
  () => props.tab,
  (value) => {
    tab.value = value;
  },
);
</script>

<template>
  <component
    :is="width > MOBILE_VERSION_WIDTH ? VDialog : VBottomSheet"
    :max-width="width > MOBILE_VERSION_WIDTH ? 500 : MOBILE_VERSION_WIDTH"
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
        <v-card-title class="d-flex justify-space-between align-center">
          <v-tabs
            :disabled="loading"
            v-model="tab"
            background-color="transparent"
            class="flex gap-2.5"
          >
            <v-tab
              :ripple="false"
              value="login"
              class="text-h5 text-center dark:text-white"
            >
              Вход
            </v-tab>
            <v-tab
              :ripple="false"
              value="register"
              class="text-h5 text-center dark:text-white ps-2"
            >
              Регистрация
            </v-tab>
          </v-tabs>

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
          <v-window v-model="tab">
            <v-window-item value="login">
              <LoginContent
                :loading="loading"
                @loading="(e: boolean) => (loading = e)"
                @dialog="(e: boolean) => (dialog = e)"
              />
            </v-window-item>
            <v-window-item value="register">
              <RegisterContent
                :loading="loading"
                @loading="(e: boolean) => (loading = e)"
                @dialog="(e: boolean) => (dialog = e)"
              />
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </template>
  </component>
</template>

<style scoped lang="scss">
.active {
  border-bottom: 3px solid white;
}
</style>
