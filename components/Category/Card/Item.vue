<script setup lang="ts">
import type { ICategory } from "~/types/ICategory";

defineProps<{
  category: ICategory;
}>();
</script>

<template>
  <div
    class="category-container dark:bg-neutral-900 bg-neutral-100 cursor-pointer rounded-3xl transition p-8"
    :style="{
      '--category-color': category.color,
    }"
  >
    <div class="content flex flex-col justify-between h-full">
      <h2 class="text-lg font-bold">{{ category.title }}</h2>
      <div>
        {{
          category.articles_count +
          " " +
          useNoun(category.articles_count, "курс", "курса", "курсов")
        }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.category-container {
  .content {
    color: var(--category-color);
  }

  &:hover {
    box-shadow: 0px 0px 10px var(--category-color);
  }
}
</style>
