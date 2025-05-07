<script setup lang="ts">
import type {
  ISubinstructionPayloadGetAll,
  ISubinstructionResponseGetAll,
} from "~/types/Subinstruction/type";
import { Subinstruction } from "~/composables/useSubinstructions";
import type { IInstructionResponseGetById } from "~/types/Instruction/type";

definePageMeta({
  layout: "academy-support",
  name: "support-subinstructions",
});

const route = useRoute();
const instructionsId = route.query["id"] as string;
const isLoading = ref<boolean>(false);

const isInstructionsId: boolean = instructionsId === undefined;

const getInstructionsHandle = async (params: ISubinstructionPayloadGetAll) => {
  if (isLoading.value) return;

  isLoading.value = true;
  const res = await Subinstruction.getAll(params);

  if (res) {
    subinstructions.value = res.data;
  }

  isLoading.value = false;
};
console.log("log", isInstructionsId);
const changeSearchField = useDebounceFn((event: InputEvent) => {
  const target = event.target as HTMLInputElement;
  if (target) {
    getInstructionsHandle({
      search: target.value,
    });
  }
}, User.DEBOUNCE_DELAY);

// const { data: subinstructions } = await useAsyncData(
//   "subinstructions-data",
//   async () => {
//     const url = isHasInstruction
//       ? `/api/v1/instruction/${instructionsId}`
//       : "/api/v1/subinstruction";
//
//     return await $fetch<
//       ISubinstructionResponseGetAll | IInstructionResponseGetById
//     >(url, {
//       params: {
//         id: instructionsId,
//       },
//     });
//   },
// );

const { data: subinstructions } = useAsyncData(
  "subinstructions-data",
  async () => {
    return await $fetch<
      IInstructionResponseGetById | ISubinstructionResponseGetAll
    >("/apijs/request", {
      params: {
        url: !isInstructionsId
          ? `/api/v1/instruction/${instructionsId}`
          : `/api/v1/subinstruction`,
        per_page: 10000,
      },
    });
  },
);
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
        v-for="(item, index) in !isInstructionsId
          ? subinstructions.subinstructions
          : subinstructions.data"
        :key="index"
        :instruction="item"
        :to-link="{
          path: `/support/subinstructions/${item.id}`,
        }"
      />
    </InstructionsList>
  </div>
</template>
