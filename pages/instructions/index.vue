<script setup lang="ts">
import type {
  IInstructionPayloadGetAll,
  IInstructionResponseGetAll,
} from "~/types/Instruction/type";

const search = ref<string>("");
const isLoading = ref<boolean>(false);

const params = ref<IInstructionPayloadGetAll>({
  search: "",
  page: 1,
  per_page: 12,
});

definePageMeta({
  layout: "academy-support",
});

const instructions = ref<IInstructionResponseGetAll>({
  data: [],
  meta: {
    current_page: 1,
    last_page: 1,
  },
});

const observer: Ref<HTMLDivElement | null> = ref(null);

const getInstructionsHandle = async () => {
  if (isLoading.value) return;

  isLoading.value = true;
  const res = await Instruction.getAll(params.value);

  if (res) {
    // Явно создаем новый объект для реактивности
    if (params.value.page === 1) {
      instructions.value = { ...res };
    } else {
      instructions.value = {
        data: {
          ...instructions.value.data,
          data: [...instructions.value.data.data, ...res.data.data], // Сохраняем вашу структуру
        },
        meta: { ...res.meta },
      };
    }
  }

  isLoading.value = false;
};

useIntersectionObserver(observer, ([entry]) => {
  if (
    entry?.isIntersecting &&
    params.value.page < instructions.value.data.meta.last_page &&
    !isLoading.value
  ) {
    params.value.page += 1;
    getInstructionsHandle();
  }
});

const changeSearchField = useDebounceFn((event: InputEvent) => {
  const target = event.target as HTMLInputElement;
  if (target) {
    params.value.search = target.value;
    params.value.page = 1;
    getInstructionsHandle();
  }
}, User.DEBOUNCE_DELAY);

onMounted(() => {
  getInstructionsHandle();
});
</script>

<template>
  <div class="pt-12 container">
    <v-text-field
      v-model="search"
      hide-details="auto"
      single-line
      rounded="lg"
      @input="changeSearchField"
      label="Поиск"
      prepend-inner-icon="mdi-text-box-search"
      variant="outlined"
      density="comfortable"
    />
    <div
      class="mt-12 grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-6"
    >
      <instructions-card
        v-for="(item, index) in instructions.data.data"
        :key="index"
        :instruction="item"
      />
    </div>
    <div v-if="isLoading" class="text-center py-4">Загрузка...</div>
    <div ref="observer" class="observer"></div>
  </div>
</template>
