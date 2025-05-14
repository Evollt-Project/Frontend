<script setup lang="ts">
import { Article } from "~/composables/useArticle";
import type {
  IArticlePayloadSearch,
  IArticleResponseSearch,
} from "~/types/Article/type";

const loading = ref<boolean>(false);
const observer: Ref<HTMLDivElement | null> = ref(null);
const isFiltersOpen = ref<boolean>(false);
const page = ref<number>(1);
const isFormValid = ref(false);

const router = useRouter();
const route = useRoute();

useIntersectionObserver(observer, ([entry]) => {
  if (
    entry?.isIntersecting &&
    articles &&
    page.value < articles.value!.meta.last_page
  ) {
    page.value += 1;
    getArticles();
  }
});

const initialFilters = computed((): IArticlePayloadSearch => {
  return {
    search: "",
    has_certificate: false,
    only_free: false,
    price: {
      min: undefined,
      max: undefined,
    },
    levels: [],
    languages: [],
  };
});

const filters = ref<IArticlePayloadSearch>(
  route.query["filters"]
    ? JSON.parse(String(route.query["filters"]))
    : initialFilters.value,
);

const updateUrlParams = () => {
  router.push({
    query: {
      filters: JSON.stringify(filters.value),
    },
  });
};

const getArticles = async () => {
  loading.value = true;
  await Article.getAll({
    page: page.value,
    per_page: 12,
    search: sanitizeValue(filters.value.search),
    has_certificate: sanitizeValue(filters.value.has_certificate),
    only_free: sanitizeValue(filters.value.only_free),
    price: {
      min: sanitizeValue(filters.value.price?.min),
      max: sanitizeValue(filters.value.price?.max),
    },
    levels: sanitizeValue(filters.value.levels),
    languages: sanitizeValue(filters.value.languages),
  }).then((response) => {
    if (response) {
      if (articles.value) {
        response.data = [...articles.value.data, ...response.data];
      }
      articles.value = response;
    }
    loading.value = false;
  });
};

const { data: articles } = useAsyncData("articles-data", async () => {
  return await $fetch<IArticleResponseSearch>("/apijs/request", {
    params: {
      url: "/api/v1/article",
      params: {
        per_page: 12,
      },
    },
  });
});

watch(
  () => route.query,
  () => {
    filters.value = route.query["filters"]
      ? JSON.parse(String(route.query["filters"]))
      : initialFilters.value;

    articles.value = null;
    getArticles();
  },
);
</script>

<template>
  <div class="courses">
    <v-form
      v-model="isFormValid"
      fast-fail
      class="my-4 flex gap-4"
      @submit.prevent="updateUrlParams"
    >
      <v-text-field
        v-model="filters.search"
        hide-details
        rounded="lg"
        label="Поиск"
        prepend-inner-icon="mdi-text-box-search"
        variant="outlined"
        density="comfortable"
      />
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
          :disabled="!isFormValid"
          :loading="loading"
        >
          <div class="flex justify-center items-center gap-2">
            <v-icon icon="mdi-magnify"></v-icon>
            <span class="hidden xs:block"> Искать </span>
          </div>
        </MyButton>
      </div>
    </v-form>
    <div class="mt-[40px] mb-[20px]">
      <div>
        <div class="courses__list">
          <ArticleBigCard
            v-if="articles?.data"
            v-for="(item, index) in articles.data"
            :key="index"
            :article="item"
          />
          <div v-for="_ in 3" v-if="loading">
            <ArticleSearchAndListSceleton />
          </div>
        </div>
      </div>
      <div
        ref="observer"
        v-if="articles && articles.data.length > 0"
        class="observer"
      ></div>
      <div
        v-if="articles && articles.data.length == 0"
        class="flex justify-center"
      >
        Не найдено
      </div>
    </div>
  </div>
  <ArticleModalsFilters
    v-if="isFiltersOpen"
    :dialog="isFiltersOpen"
    :search="filters"
    :loading="loading"
    @update:dialog="isFiltersOpen = $event"
    @update:search="filters = $event"
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
