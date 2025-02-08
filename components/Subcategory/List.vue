<script setup lang="ts">
import type { ISubcategory } from "~/types/ISubcategory";
defineProps<{
  title: string;
  subcategories: ISubcategory[];
}>();
</script>

<template>
  <div>
    <div class="flex gap-3 items-start">
      <h2 class="text-3xl font-bold">Бизнес, менеджмент, финансы</h2>
    </div>
    <div class="mt-5 grid gap-[20px] grid-cols-4">
      <SubcategoryCardItem
        v-for="subcategory in subcategories"
        :subcategory="subcategory"
      />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
