<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
import { VBottomSheet, VDialog } from "vuetify/components";
import { MOBILE_VERSION_WIDTH } from "~/consts/config";

const props = defineProps<{
  dialog: boolean;
  loading?: boolean;
}>();
const emits = defineEmits(["dialog"]);

const dialog: Ref<boolean> = ref(props.dialog);
const { width } = useWindowSize();
const teacher: Ref<{ id: string }> = ref({
  id: "",
});
const isAddTeacherFormValid: Ref<boolean> = ref(false);

const addTeacher = async () => {};

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
        <v-card-title class="d-flex justify-space-between align-center p-0">
          Добавить преподавателя
          <v-btn
            icon="mdi-close"
            :disabled="loading"
            variant="text"
            class="dark:text-white"
            :ripple="false"
            @click="dialog = false"
          ></v-btn>
        </v-card-title>
        <v-card-text>
          <v-form
            v-model="isAddTeacherFormValid"
            class="grid gap-5"
            @submit.prevent
          >
            <v-text-field
              v-model="teacher.id"
              v-mask="['######']"
              hide-details="auto"
              :disabled="loading"
              :rules="Rule.getRequired()"
              rounded="lg"
              label="ID Пользователя"
              prepend-inner-icon="mdi-account-circle-outline"
              variant="outlined"
              density="compact"
            />
            <MyButton type="submit" @click="addTeacher">
              Добавить преподавателя
            </MyButton>
          </v-form>
        </v-card-text>
      </v-card>
    </template>
  </component>
</template>

<style scoped lang="scss"></style>
