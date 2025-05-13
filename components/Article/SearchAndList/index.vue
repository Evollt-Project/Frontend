<script setup lang="ts">
import type {
  IArticlePayloadSearch,
  IArticleResponseGet,
} from "~/types/Article/type";
import { Article } from "~/composables/useArticle";
import { ArticleTypeEnum } from "~/enums/ArticleTypeEnum";

const loading = ref<boolean>(false);
const observer: Ref<HTMLDivElement | null> = ref(null);
const isFiltersOpen = ref<boolean>(false);
const page = ref<number>(1);

const router = useRouter();
const route = useRoute();

useIntersectionObserver(observer, ([entry]) => {
  console.log("observer");
  console.log(entry?.isIntersecting);
  if (
    entry?.isIntersecting &&
    articles &&
    page.value < articles.value.meta.last_page
  ) {
    page.value += 1;
    getArticles();
    console.log(page.value);
  }
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
    query: {
      filters: JSON.stringify(params),
    },
  });
};

// const getArticles = async () => {
//   loading.value = true;
//   try {
//     const response = await Article.getAll({
//       page: page.value,
//       // ...sanitizeValue(filters.value),
//     });
//     if (response) {
//       articles.value = response;
//     }
//   } finally {
//     loading.value = false;
//   }
// };

const getArticles = async () => {
  loading.value = true;
  await Article.getAll({
    page: page.value,
    per_page: 12,
    ...sanitizeValue(filters.value),
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
  return await $fetch<IArticleResponseGet>("/apijs/request", {
    params: {
      url: "/api/v1/article",
      params: {
        per_page: 12,
      },
    },
  });
});

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
  () => filters.value,
  () => {
    getArticles();
  },
  { deep: true },
);

watch(
  () => route.query,
  () => {
    filters.value = JSON.parse(route.query?.filters);
  },
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
    <div class="mt-[40px] mb-[20px]">
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
    @update:search="updateUrlParams"
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
