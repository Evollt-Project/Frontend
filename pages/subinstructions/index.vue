<script setup lang="ts">
import type {
  ISubinstructionResponseGetAll,
  ISubinstructionPayloadGetAll,
} from "~/types/Subinstruction/type";
import { Subinstruction } from "~/composables/useSubinstructions";

definePageMeta({
  layout: "academy-support",
});

const instructionsId = useRoute().params.id as string;
const isLoading = ref<boolean>(false);

const isHasInstruction = computed<boolean>(() => !!instructionsId);

const getInstructionsHandle = async (params: ISubinstructionPayloadGetAll) => {
  if (isLoading.value) return;

  isLoading.value = true;
  const res = await Subinstruction.getAll(params);

  if (res) {
    subinstructions.value = res.data;
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
    const url = isHasInstruction
      ? `/api/v1/instruction/${instructionsId}`
      : "/api/v1/subinstruction";

    return await $fetch<ISubinstructionResponseGetAll>(url, {
      params: {
        id: instructionsId,
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
    <InstructionsList
      :is-loading="isLoading"
      :list="subinstructions.data"
      path="/subinstructions/currentSub"
    />
  </div>
</template>
