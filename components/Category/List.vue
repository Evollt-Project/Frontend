<script setup lang="ts">
import type { ICategory } from "~/types/ICategory";
defineProps<{
  title: string;
  categories: ICategory[];
}>();
</script>

<template>
  <div>
    <div class="flex gap-3 items-start">
      <h2 class="text-3xl font-bold">{{ title }}</h2>
    </div>
    <div class="mt-5 grid gap-[20px] grid-cols-4">
      <CategoryCardItem v-for="category in categories" :category="category" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
