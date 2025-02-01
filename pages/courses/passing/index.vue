<script setup lang="ts">
import { ArticleTypeEnum } from "~/enums/ArticleTypeEnum";
import type { IArticle } from "~/types/IArticle";
import type { IPagination } from "~/types/IPagination";

definePageMeta({
  name: "courses-passing",
  layout: "sidebar",
});

const loadingArticles = ref(true);
const articles: Ref<IPagination<IArticle> | null> = ref(null);
const page = ref(1);

// TODO: Сделать загрузку страниц через observer
// watch(page, async (value) => {
//   await getArticles();
// });

const getArticles = async (search: string | undefined = undefined) => {
  loadingArticles.value = true;
  await Article.getAll({
    // type: ArticleTypeEnum.PASSING,
    page: page.value,
    search,
  }).then((response) => {
    if (response) {
      articles.value = response;
    }
    loadingArticles.value = false;
  });
};

onMounted(async () => {
  await getArticles();
});
</script>

<template>
  <div class="courses-passing">
    <CourseSearchAndList
      :loading-articles="loadingArticles"
      :page="page"
      @changePage="(e) => (page = e)"
      @search="(e: string) => getArticles(e)"
      :articles="articles"
    />
  </div>
</template>
