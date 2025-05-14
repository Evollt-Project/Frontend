<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
import { VBottomSheet, VDialog } from "vuetify/components";
import { MOBILE_VERSION_WIDTH } from "~/consts/config";
import type { IVideoinstructionPayloadCreate } from "~/types/Videoinstruction/type";
import type { IVideoinstruction } from "~/types/Videoinstruction/IVideoinstruction";
import { toast } from "vue3-toastify";
import { Videoinstruction } from "~/composables/useVideoinstruction";

const props = defineProps<{
  dialog: boolean;
  videoinstruction?: IVideoinstruction;
}>();
const emits = defineEmits(["update:dialog", "on-create"]);

const dialog = ref<boolean>(props.dialog);
const { width } = useWindowSize();
const loading = ref<boolean>(false);
const isFormValid = ref<boolean>(false);
const data = ref<IVideoinstructionPayloadCreate>({
  title: props.videoinstruction?.title ?? "",
  platform: props.videoinstruction?.platform ?? undefined,
  video_url: props.videoinstruction?.video_url ?? "",
});

const platformItems = computed(() => {
  if (!User.store.enums?.video_platforms) return [];

  return Object.entries(User.store.enums.video_platforms).map(
    ([value, title]) => ({
      value: Number(value),
      title,
    }),
  );
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

const submitVideoinstruction = () => {
  if (props.videoinstruction) {
    return Videoinstruction.update({
      id: props.videoinstruction.id,
      ...data.value,
    })
      .then(() => {
        toast.success("Видеоинструкция изменена");
        emits("on-create");

        dialog.value = false;
      })
      .catch((response) => {
        useErrorNotification(response.response.data.errors);
      });
  }
  return Videoinstruction.create(data.value)
    .then(() => {
      toast.success("Видеоинструкция создана");
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
    :max-width="width > MOBILE_VERSION_WIDTH ? 1500 : MOBILE_VERSION_WIDTH"
    v-model="dialog"
    persistent
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
            <div class="text-h5"> Создать видеоинструкцию </div>

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
            @submit.prevent="submitVideoinstruction"
          >
            <div class="grid grid-cols-2 gap-5">
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
                  label="Url видео"
                  :rules="Rule.getRequired()"
                  variant="outlined"
                  v-model="data.video_url"
                />
              </div>
            </div>
            <div>
              <v-select
                v-model="data.platform"
                :items="platformItems"
                :rules="Rule.getRequired()"
                rounded="lg"
                item-title="title"
                item-value="value"
                label="Платформа"
                hide-details="auto"
                variant="outlined"
                density="comfortable"
              />
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
