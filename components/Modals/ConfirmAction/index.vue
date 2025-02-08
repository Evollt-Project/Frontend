<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
import { VDialog, VBottomSheet } from "vuetify/components";

const props = defineProps<{
  dialog: boolean;
  loading: boolean;
}>();
const emits = defineEmits(["dialog", "action"]);

const dialog: Ref<boolean> = ref(props.dialog);
const { width } = useWindowSize();

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
    :max-width="width > 650 ? '500' : '650'"
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
          Подтвердите действие
          <v-btn
            icon="mdi-close"
            :disabled="loading"
            variant="text"
            class="dark:text-white"
            :ripple="false"
            @click="dialog = false"
          ></v-btn>
        </v-card-title>
        <v-card-text class="dark:text-white"
          ><slot name="content"></slot
        ></v-card-text>
        <v-card-actions>
          <MyButton :disabled="loading" @click="dialog = false"
            >Отменить</MyButton
          >
          <MyButton
            color="success"
            :disabled="loading"
            :loading="loading"
            @click="emits('action')"
            >Подтвердить</MyButton
          >
        </v-card-actions>
      </v-card>
    </template>
  </component>
</template>

<style scoped lang="scss"></style>
