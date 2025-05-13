<script setup lang="ts">
import type { IArticlePayloadSearch } from "~/types/Article/type";

const loading: Ref<boolean> = ref(false);
const search: Ref<IArticlePayloadSearch> = ref({
  search: "",
  price: {},
  levels: [],
  languages: [],
});
const searchCourses = () => {};
const isFormValid = ref(false);
const articleFiltersModal = ref(false);
const page = ref<number>(1);

const router = useRouter();
const route = useRoute();

const validate = computed(() => {
  return loading.value || !isFormValid;
});

const filters = ref<IArticlePayloadSearch>(
  route.query?.filters
    ? JSON.parse(route.query?.filters)
    : {
        search: "",
        has_certificate: false,
        only_free: false,
        price: {
          min: undefined,
          max: undefined,
        },
        levels: [],
        languages: [],
      },
);

const updateUrlParams = (params: IArticlePayloadSearch) => {
  router.push({
    path: "/courses",
    query: {
      filters: JSON.stringify(params),
    },
  });
};

const changeSearchField = useDebounceFn((event: InputEvent) => {
  const target = event.target as HTMLInputElement;
  page.value = 1;
  if (target) {
    // Создаем копию текущих фильтров с обновленным поисковым запросом
    const updatedFilters = {
      ...sanitizeValue(filters.value),
      search: target.value,
    };

    // Обновляем URL
    router.push({
      path: "/courses",
      query: {
        filters: JSON.stringify(updatedFilters),
      },
    });

    // Обновляем локальное состояние фильтров
    filters.value = updatedFilters;

    // Не вызываем getArticles() здесь - это сделает watch на filters.value
  }
}, User.DEBOUNCE_DELAY);

watch(
  () => route.query,
  () => {
    filters.value = JSON.parse(route.query?.filters);
  },
);
</script>

<template>
  <div class="intro rounded-3xl">
    <div class="intro-content">
      <div class="intro-content__top mb-[-100px]">
        <img
          src="@/assets/img/intro/background.webp"
          class="intro__background object-cover rounded-3xl w-full h-96"
          alt=""
        />
      </div>
      <div
        class="intro-content__bottom min-h-36 dark:bg-neutral-900 bg-neutral-100 rounded-3xl p-8 relative flex items-center shadow-custom"
      >
        <div class="w-full">
          <v-form
            v-model="isFormValid"
            @submit.prevent="searchCourses"
            class="flex sm:justify-between gap-[20px] sm:items-center flex-col sm:flex-row"
          >
            <v-text-field
              hide-details
              rounded="lg"
              @input="changeSearchField"
              label="Поиск"
              prepend-inner-icon="mdi-text-box-search"
              variant="outlined"
              density="comfortable"
              v-model="filters.search"
            />
            <div class="sm:flex grid grid-cols-2 gap-[20px]">
              <MyButton size="large" @click="articleFiltersModal = true">
                <div class="flex justify-center items-center gap-2">
                  <v-icon icon="mdi-filter-outline"></v-icon>
                  <span class="hidden xs:block"> Фильтры </span>
                </div>
              </MyButton>
              <MyButton
                size="large"
                type="submit"
                :disabled="validate"
                :loading="loading"
              >
                <div class="flex justify-center items-center gap-2">
                  <v-icon icon="mdi-magnify"></v-icon>
                  <span class="hidden xs:block"> Искать </span>
                </div>
              </MyButton>
            </div>
          </v-form>
        </div>
      </div>
    </div>
    <ArticleModalsFilters
      v-if="articleFiltersModal"
      :dialog="articleFiltersModal"
      :search="filters"
      :loading="loading"
      @update:dialog="articleFiltersModal = $event"
      @update:search="updateUrlParams"
    />
  </div>
</template>

<style scoped lang="scss"></style>
