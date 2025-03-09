<script setup lang="ts">
import type { IArticleCategory } from "~/types/IArticleCategory";
import type { ISubcategory } from "~/types/ISubcategory";
import type { ICatalog } from "~/types/ICatalog";

definePageMeta({
  name: "index",
});

useHead({
  title: "Evollt School | Главная",
});

const onlineCourses: Ref<IArticleCategory[] | null> = ref(
  await Article.online()
);
const bigCourses: Ref<IArticleCategory[] | null> = ref(await Article.big());

const businessCatalog: Ref<ICatalog> = ref(await Catalog.get(3));
</script>

<template>
  <div class="container mx-auto">
    <div class="grid gap-16">
      <Intro class="mb-5" />

      <ArticleCategoryList
        title="Онлайн-курсы"
        v-if="onlineCourses"
        :article-categories="onlineCourses"
      />

      <ArticleCategoryList
        title="Большие курсы"
        v-if="bigCourses"
        :article-categories="bigCourses"
      />

      <CategoryList
        :title="businessCatalog.title"
        :categories="businessCatalog.categories.slice(0, 4)"
      />
    </div>
  </div>
</template>

<style scoped></style>
