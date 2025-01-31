<script setup lang="ts">
import type { IArticleCategory } from "~/types/IArticleCategory";
import type { ISubcategory } from "~/types/ISubcategory";

definePageMeta({
  name: "index",
});

useHead({
  title: "Evollt School | Главная",
});

const onlineCourses: Ref<IArticleCategory[] | null> = ref(
  await Article.online()
);

const businessSubcategories: Ref<ISubcategory[]> = ref([
  {
    id: 1,
    title: "Маркетинг и продажи",
    color: "#3f4fcb",
    articles: [
      {
        id: 1,
        title: "Hello 2",
        author: User.store.user,
        photo:
          "https://cdn.stepik.net/media/catalog_blocks/116/cover_zzco07x.png",
        students_complete: "5",
        time: "14",
        rate: "5",
        price: 5000,
      },
    ],
  },
]);
</script>

<template>
  <div class="container mx-auto">
    <div class="grid gap-16">
      <Intro />

      <ArticleCategoryList
        title="Онлайн-курсы"
        :article-categories="onlineCourses"
      />

      <ArticleCategoryList
        title="Войти в IT"
        :article-categories="onlineCourses"
      />

      <SubcategoryList
        title="Бизнес, менеджмент, финансы"
        :subcategories="businessSubcategories"
      />
    </div>
  </div>
</template>

<style scoped></style>
