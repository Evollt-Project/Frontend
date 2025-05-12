<script setup lang="ts">
import type {
  IArticlePayloadSearch,
  IArticleResponseGet,
} from "~/types/Article/type";
import { Article } from "~/composables/useArticle";

const loading = ref<boolean>(false);
const isFiltersOpen = ref<boolean>(false);

const filters = ref<IArticlePayloadSearch>({
  search: "",
  has_certificate: false,
  only_free: false,
  price: { min: undefined, max: undefined }, // Явно задаём структуру
  levels: [],
  languages: [],
});

const page = ref(1);

const getArticles = async () => {
  loading.value = true;
  try {
    const response = await Article.getAll({
      page: page.value,
      ...sanitizeValue(filters.value),
    });
    if (response) {
      articles.value = response;
    }
  } finally {
    loading.value = false;
  }
};

const { data: articles } = useAsyncData("articles-data", async () => {
  return await $fetch<IArticleResponseGet>("/apijs/request", {
    params: {
      url: "/api/v1/article",
    },
  });
});

const changeSearchField = useDebounceFn((event: InputEvent) => {
  const target = event.target as HTMLInputElement;
  if (target) {
    getArticles(filters.value);
  }
}, User.DEBOUNCE_DELAY);

watch(
  () => filters.value,
  (newFilters) => {
    getArticles();
  },
  { deep: true },
);
</script>

<template>
  <div class="courses">
    <v-form fast-fail ref="form" class="my-4 flex gap-4" @submit.prevent>
      <v-text-field
        hide-details
        rounded="lg"
        @input="changeSearchField"
        label="Поиск"
        prepend-inner-icon="mdi-text-box-search"
        variant="outlined"
        density="comfortable"
        v-model="filters.search"
      ></v-text-field>
      <div class="sm:flex grid grid-cols-2 gap-[20px]">
        <MyButton size="large" @click="isFiltersOpen = true">
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
    <div class="my-[20px]">
      <div>
        <div class="courses__list">
          <ArticleBigCard
            v-for="(item, index) in articles.data"
            :key="index"
            :article="item"
          />
          <div v-for="_ in 3" v-if="loading">
            <ArticleSearchAndListSceleton />
          </div>
          <div
            ref="observer"
            v-if="articles && articles.data.length > 0"
            class="observer"
          ></div>
        </div>
      </div>
      <div
        v-if="articles && articles.data.length == 0"
        class="flex justify-center"
      >
        Не найдено
      </div>
    </div>
  </div>
  <ArticleModalsFilters
    :dialog="isFiltersOpen"
    :search="filters"
    :loading="loading"
    @update:dialog="isFiltersOpen = $event"
  />
</template>

<style scoped lang="scss">
.courses {
  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 350px), 1fr));
    gap: 20px;
  }
}
</style>
