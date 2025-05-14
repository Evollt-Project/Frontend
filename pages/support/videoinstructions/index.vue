<script setup lang="ts">
import type { IVideoinstructionResponseGetAll } from "~/types/Videoinstruction/type";

definePageMeta({
  layout: "academy-support",
  name: "support-videoinstructions",
});

const isLoading = ref<boolean>(false);
const createVideoinstructionModal = ref(false);

const { data: videoinstructions } = useAsyncData(
  "instructions-data",
  async () => {
    return await $fetch<IVideoinstructionResponseGetAll>("/apijs/request", {
      params: {
        url: "/api/v1/videoinstruction",
        params: {
          per_page: 12,
        },
      },
    });
  },
);

// const getVideoinstructionsHandle = async (params: IInstructionPayloadGetAll) => {
//   if (isLoading.value) return;
//
//   isLoading.value = true;
//   const res = await Instruction.getAll({
//     per_page: 10000,
//     ...params,
//   });
//
//   if (res) {
//     instructions.value = res.data;
//   }
//
//   isLoading.value = false;
// };
</script>

<template>
  <div class="container">
    <div class="flex justify-between gap-4">
      <h1 class="text-2xl font-bold">Видеоинструкции</h1>
      <div v-if="User.hasPermission(User.ADMIN)">
        <MyButton
          prepend-icon="mdi-plus"
          size="large"
          @click="createVideoinstructionModal = true"
        >
          Создать
        </MyButton>
      </div>
    </div>

    <VideoinstructionsList
      :videoinstructions="videoinstructions ?? []"
      :is-loading="isLoading"
    />

    <ModalsVideoinstructions
      v-if="createVideoinstructionModal"
      :dialog="createVideoinstructionModal"
      @update:dialog="createVideoinstructionModal = $event"
      @on-create="getVideoinstructionsHandle"
    />
  </div>
</template>
