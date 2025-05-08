<script setup lang="ts">
import { Subinstruction } from "~/composables/useSubinstructions";
import type { IInstructionResponseGetById } from "~/types/Instruction/type";
import type {
  ISubinstructionPayloadGetAll,
  ISubinstructionResponseGetAll,
} from "~/types/Subinstruction/type";

definePageMeta({
  layout: "academy-support",
  name: "support-subinstructions",
});

useHead({
  title: "Подинструкции",
});

const route = useRoute();
const instructionId = ref(route.query["instruction_id"]);
const isLoading = ref<boolean>(false);
const instructionTitle = ref("");

const getInstructionsHandle = async (params: ISubinstructionPayloadGetAll) => {
  if (isLoading.value) return;

  isLoading.value = true;
  const res = await Subinstruction.getAll(params);

  if (res) {
    subinstructions.value = res.data.data;
  }

  isLoading.value = false;
};
const changeSearchField = useDebounceFn((event: InputEvent) => {
  const target = event.target as HTMLInputElement;
  if (target) {
    getInstructionsHandle({
      search: target.value,
    });
  }
}, User.DEBOUNCE_DELAY);

const { data: subinstructions } = await useAsyncData(
  "subinstructions-data",
  async () => {
    if (instructionId.value) {
      return await $fetch<IInstructionResponseGetById>("/apijs/request", {
        params: {
          url: `/api/v1/instruction/${instructionId.value}`,
          params: {
            per_page: 10000,
          },
        },
      }).then((response) => {
        instructionTitle.value = response.title;

        return response.subinstructions;
      });
    }

    return await $fetch<ISubinstructionResponseGetAll>("/apijs/request", {
      params: {
        url: "/api/v1/subinstruction",
        params: {
          per_page: 10000,
        },
      },
    }).then((response) => response.data);
  },
);
</script>

<template>
  <div class="container">
    <div v-if="instructionId" class="flex justify-center mb-5">
      <h1 class="text-3xl">{{ subinstructions![0]?.title }}</h1>
    </div>
    <div>
      <v-text-field
        hide-details="auto"
        single-line
        rounded="lg"
        @input="changeSearchField"
        label="Поиск"
        prepend-inner-icon="mdi-text-box-search"
        variant="outlined"
        density="comfortable"
      />

      <InstructionsList
        type="subinstruction"
        :instructions="subinstructions!"
        :is-loading="isLoading"
      />
    </div>
  </div>
</template>
