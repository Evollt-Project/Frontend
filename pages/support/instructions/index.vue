<script setup lang="ts">
import type {
  IInstructionPayloadGetAll,
  IInstructionResponseGetAll,
} from "~/types/Instruction/type";

definePageMeta({
  layout: "academy-support",
  name: "support-instructions",
});

const isLoading = ref<boolean>(false);

const getInstructionsHandle = async (params: IInstructionPayloadGetAll) => {
  if (isLoading.value) return;

  isLoading.value = true;
  const res = await Instruction.getAll(params);

  if (res) {
    instructions.value = res.data;
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

const { data: instructions } = useAsyncData("instructions-data", async () => {
  return await $fetch<IInstructionResponseGetAll>("/apijs/request", {
    params: {
      url: "/api/v1/instruction",
      params: {
        per_page: 10000,
      },
    },
  });
});
</script>

<template>
  <div class="pt-12 container">
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
    <InstructionsList :is-loading="isLoading">
      <InstructionsCard
        v-for="(item, index) in instructions?.data ?? []"
        :key="index"
        :instruction="item"
        :to-link="{
          path: `/support/subinstructions`,
          query: {
            id: item.id,
          },
        }"
      />
    </InstructionsList>
  </div>
</template>
