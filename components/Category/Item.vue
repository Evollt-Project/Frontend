<script setup lang="ts">
import type { ICategory } from "~/types/ICategory";

defineProps<{
  category: ICategory;
}>();
const emits = defineEmits(["selectCatalog"]);
</script>

<template>
  <div
    @click="emits('selectCatalog', category)"
    class="block select-none bg-cover space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors"
    :style="{
      backgroundImage: `url(${category.photo})`,
    }"
  >
    <div class="text-sm font-medium leading-none category__title">
      {{ category.title }}
    </div>
    <ul>
      <li v-for="subcategory in category.subcategories" class="text-gray-400">
        {{ subcategory.title }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.category__title {
  padding-bottom: 5px;
  margin-bottom: 10px;
  border-bottom: 2px solid white;
}
</style>
