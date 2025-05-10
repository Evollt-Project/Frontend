<script setup lang="ts">
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
const instructionId = ref(
  route.query["instruction_id"]
    ? Number(route.query["instruction_id"])
    : undefined,
);
const isLoading = ref<boolean>(false);
const instructionTitle = ref("");
const createSubinstructionModal = ref(false);

const getSubinstructionsHandle = async (
  params: ISubinstructionPayloadGetAll = {},
) => {
  if (isLoading.value) return;

  isLoading.value = true;

  await Subinstruction.getAll({
    per_page: 10000,
    instruction_id: instructionId.value,
    ...params,
  }).then((response) => {
    subinstructions.value = response.data.data;
  });

  isLoading.value = false;
};
const changeSearchField = useDebounceFn((event: InputEvent) => {
  const target = event.target as HTMLInputElement;
  if (target) {
    getSubinstructionsHandle({
      search: target.value,
    });
  }
}, User.DEBOUNCE_DELAY);

const { data: subinstructions } = await useAsyncData(
  "subinstructions-data",
  async () => {
    return await $fetch<ISubinstructionResponseGetAll>("/apijs/request", {
      params: {
        url: "/api/v1/subinstruction",
        params: {
          per_page: 10000,
          instruction_id: instructionId.value,
        },
      },
    }).then((response) => {
      if (instructionId.value && response.data[0]?.instruction) {
        instructionTitle.value = response.data[0].instruction.title;
      }

      return response.data;
    });
  },
);
</script>

<template>
  <div class="container">
    <div class="mb-[40px] flex justify-between items-center">
      <div v-if="instructionId">
        <MyBackButton
          :to="{
            name: 'support-instructions',
          }"
        />
      </div>
      <div v-if="instructionId">
        <h1 class="text-3xl">{{ instructionTitle }}</h1>
      </div>
      <div class="flex-shrink-0 w-[40px]"></div>
    </div>
    <div>
      <div class="flex items-center gap-4">
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
        <div v-if="User.hasPermission(User.ADMIN)">
          <MyButton
            prepend-icon="mdi-plus"
            size="large"
            @click="createSubinstructionModal = true"
          >
            Создать
          </MyButton>
        </div>
      </div>

      <InstructionsList
        type="subinstruction"
        :instructions="subinstructions ?? []"
        :is-loading="isLoading"
        @update:instructions="getSubinstructionsHandle"
      />
      <ModalsSubinstruction
        v-if="createSubinstructionModal"
        :dialog="createSubinstructionModal"
        :instruction-id="instructionId"
        @update:dialog="createSubinstructionModal = $event"
        @on-create="getSubinstructionsHandle"
      />
    </div>
  </div>
</template>
