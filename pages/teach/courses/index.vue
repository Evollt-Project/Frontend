<script setup lang="ts">
import type { IArticle } from "~/types/Article/IArticle";
import type { IPagination } from "~/types/Base/IPagination";

definePageMeta({
  name: "teach-courses",
  layout: "sidebar",
});

const loadingArticles = ref(true);
const articles: Ref<IPagination<IArticle> | null> = ref(null);
const search = ref("");
const page = ref(1);

const getArticles = async (search: string | undefined = undefined) => {
  loadingArticles.value = true;
  await Article.teaching({
    page: page.value,
    search: sanitizeValue(search),
  }).then((response) => {
    if (response) {
      if (articles.value) {
        response.data = [...articles.value.data, ...response.data];
      }
      articles.value = response;
    }
    loadingArticles.value = false;
  });
};

onMounted(async () => {
  await getArticles();
});

const changePage = async (e: number) => {
  page.value = e;
  getArticles(search.value);
};

const changeSearch = async (e: string) => {
  search.value = e;
  page.value = 1;
  if (articles.value) {
    articles.value.data = [];
  }
  getArticles(search.value);
};
</script>

<template>
  <div class="teach-courses">
    <CourseSearchAndList
      :loading-articles="loadingArticles"
      :page="page"
      @changePage="(e: number) => changePage(e)"
      @search="(e: string) => changeSearch(e)"
      :articles="articles"
    />
  </div>
</template>
