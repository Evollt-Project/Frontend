<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
import { toast } from "vue3-toastify";
import { VBottomSheet, VDialog } from "vuetify/components";
import { MOBILE_VERSION_WIDTH } from "~/consts/config";
import type { IInstruction } from "~/types/Instruction/IInstruction";
import type { IInstructionPayloadCreate } from "~/types/Instruction/type";

const props = defineProps<{
  dialog: boolean;
  instruction?: IInstruction;
}>();
const emits = defineEmits(["update:dialog", "on-create"]);

const dialog: Ref<boolean> = ref(props.dialog);
const { width } = useWindowSize();
const loading = ref(false);
const isFormValid = ref(false);
const data = ref<IInstructionPayloadCreate>({
  title: props.instruction?.title ?? "",
  logo: props.instruction?.logo ?? "",
  short_description: props.instruction?.short_description ?? "",
});

watch(dialog, (value) => {
  emits("update:dialog", value);
});

watch(
  () => props.dialog,
  (value) => {
    dialog.value = value;
  },
);

const submitInstruction = () => {
  if (props.instruction) {
    return Instruction.update({
      id: props.instruction.id,
      ...data.value,
    })
      .then(() => {
        toast.success("Инструкция изменена");
        emits("on-create");

        dialog.value = false;
      })
      .catch((response) => {
        useErrorNotification(response.response.data.errors);
      });
  }
  return Instruction.create(data.value)
    .then(() => {
      toast.success("Инструкция создана");
      emits("on-create");

      dialog.value = false;
    })
    .catch((response) => {
      useErrorNotification(response.response.data.errors);
    });
};
</script>

<template>
  <component
    :is="width > MOBILE_VERSION_WIDTH ? VDialog : VBottomSheet"
    :max-width="width > MOBILE_VERSION_WIDTH ? 800 : MOBILE_VERSION_WIDTH"
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
        <v-card-title>
          <div class="flex justify-between">
            <div class="text-h5"> Создать инструкцию </div>

            <v-btn
              icon="mdi-close"
              :disabled="loading"
              variant="text"
              class="dark:text-white"
              :ripple="false"
              @click="dialog = false"
            />
          </div>
        </v-card-title>

        <v-card-text class="dark:text-white scrollable-content">
          <v-form
            v-model="isFormValid"
            class="grid gap-5"
            @submit.prevent="submitInstruction"
          >
            <div>
              <v-text-field
                hide-details="auto"
                rounded="lg"
                label="Название"
                :rules="Rule.getRequired()"
                variant="outlined"
                v-model="data.title"
              />
            </div>
            <div>
              <v-text-field
                hide-details="auto"
                rounded="lg"
                label="Картинка"
                :rules="Rule.getRequired()"
                variant="outlined"
                v-model="data.logo"
              />
            </div>
            <div>
              <v-textarea
                v-model="data.short_description"
                id="short-content"
                :rules="Rule.getMinAndMaxLengthAndRequired(255, 100)"
                :disabled="loading"
                rounded="lg"
                label="Краткое описание"
                variant="outlined"
                density="comfortable"
                messages="Для публикации нужно больше 100 символов"
              >
                <template #details>
                  {{ data.short_description?.length ?? 0 }}/255
                </template>
              </v-textarea>
            </div>
            <div class="flex justify-end gap-5">
              <MyButton size="large" color="danger" @click="dialog = false">
                Закрыть
              </MyButton>
              <MyButton
                type="submit"
                size="large"
                :disabled="!isFormValid"
                color="success"
              >
                Сохранить
              </MyButton>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </template>
  </component>
</template>
