<script setup lang="ts">
import type { IVideoinstruction } from "~/types/Videoinstruction/IVideoinstruction";
import { toast } from "vue3-toastify";

const props = defineProps<{
  videoinstuction: IVideoinstruction;
}>();
const emits = defineEmits(["update:videoinstructions"]);

const isEditModalOpen = ref<boolean>(false);
const isDeleteModalOpen = ref<boolean>(false);

const getVideoinstructionsHandle = () => {
  emits("update:videoinstructions");
};

const deleteInstruction = async () => {
  await Videoinstruction.delete({ id: props.videoinstuction.id }).then(() => {
    toast.success("Видеонструкция удалена");
  });

  emits("update:videoinstructions");
  isDeleteModalOpen.value = false;
};
</script>

<template>
  <div class="p-[35px] dark:bg-neutral-900 bg-neutral-100 rounded-2xl">
    <div class="flex flex-col gap-7 h-auto">
      <div class="flex justify-between">
        <div class="font-bold text-2xl"> {{ videoinstuction.title }} </div>
        <div class="flex gap-2 *:cursor-pointer">
          <div
            v-if="User.hasPermission(User.ADMIN)"
            @click.prevent="isDeleteModalOpen = true"
          >
            <v-icon icon="mdi-delete-outline" />
          </div>
          <div
            v-if="User.hasPermission(User.ADMIN)"
            @click.prevent="isEditModalOpen = true"
          >
            <v-icon icon="mdi-pencil" />
          </div>
        </div>
      </div>
      <iframe
        width="100%"
        height="350"
        :src="videoinstuction.video_url"
        frameBorder="0"
        allow="clipboard-write; autoplay"
        webkitAllowFullScreen
        mozallowfullscreen
        allowFullScreen
        v-if="videoinstuction.platform === 1"
      ></iframe>
    </div>
  </div>
  <ModalsVideoinstructions
    v-if="isEditModalOpen"
    :dialog="isEditModalOpen"
    @update:dialog="isEditModalOpen = $event"
    @on-create="getVideoinstructionsHandle"
    :videoinstruction="videoinstuction"
  />
  <ModalsConfirmAction
    :dialog="isDeleteModalOpen"
    @action="deleteInstruction"
    @dialog="isDeleteModalOpen = $event"
  >
    <template #content>
      Вы уверены, что хотите удалить
      <strong>{{ videoinstuction.title }}</strong>
    </template>
  </ModalsConfirmAction>
</template>
