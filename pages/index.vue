<script setup lang="ts">
import type { IArticleCategory } from "~/types/IArticleCategory";
import type { ICatalog } from "~/types/ICatalog";

definePageMeta({
  name: "index",
});

useHead({
  title: `Главная`,
});

const { data: onlineCourses } = useAsyncData(
  "online-courses",
  async () => {
    return await $fetch<IArticleCategory[]>("/apijs/request", {
      params: {
        url: "api/v1/articles/online",
      },
    });
  },
  {
    default: () => [],
  },
);

const { data: bigCourses } = useAsyncData(
  "big-courses",
  async () => {
    return await $fetch<IArticleCategory[]>("/apijs/request", {
      params: {
        url: "api/v1/articles/big",
      },
    });
  },
  {
    default: () => [],
  },
);

const { data: businessCatalog } = useAsyncData("business-catalog", async () => {
  const response = await $fetch<ICatalog>("/apijs/request", {
    params: {
      url: "api/v1/catalog/3",
    },
  });

  response.categories = response.categories.slice(0, 4);

  return response;
});
</script>

<template>
  <div class="container mx-auto">
    <div class="grid gap-16">
      <Intro class="mb-5" />

      <ArticleCategoryList
        title="Онлайн-курсы"
        :article-categories="onlineCourses"
      />

      <ArticleCategoryList
        v-if="bigCourses.length"
        title="Большие курсы"
        :article-categories="bigCourses"
      />

      <CategoryList
        v-if="businessCatalog"
        :title="businessCatalog.title"
        :categories="businessCatalog.categories"
      />

      <AboutCoursesCardList/>
    </div>
  </div>
</template>

<style scoped></style>
