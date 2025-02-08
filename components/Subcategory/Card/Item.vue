<script setup lang="ts">
import type { ISubcategory } from "~/types/ISubcategory";

defineProps<{
  subcategory: ISubcategory;
}>();
</script>

<template>
  <div
    class="subcategory-container dark:bg-neutral-900 bg-neutral-100 cursor-pointer rounded-3xl transition p-8"
    :style="{
      '--subcategory-color': subcategory.color,
    }"
  >
    <div class="content grid gap-5">
      <h2 class="text-lg font-bold">{{ subcategory.title }}</h2>
      <div>
        {{
          subcategory.articles.length +
          " " +
          useNoun(subcategory.articles.length, "курс", "курса", "курсов")
        }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.subcategory-container {
  .content {
    color: var(--subcategory-color);
  }

  &:hover {
    box-shadow: 0px 0px 10px var(--subcategory-color);
  }
}
</style>
