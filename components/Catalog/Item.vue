<script setup lang="ts">
import type { ICatalog } from "~/types/ICatalog";

defineProps<{
  catalog: ICatalog;
}>();
const emits = defineEmits(["selectCatalog"]);
</script>

<template>
  <div
    @click="emits('selectCatalog', catalog)"
    class="catalog-item bg-cover select-none space-y-1 cursor-pointer rounded-md p-8 flex justify-center items-center leading-none no-underline outline-none transition-colors"
    :style="{
      backgroundImage: `url(${catalog.photo})`,
    }"
  >
    <div class="grid gap-2.5 text-center">
      <div class="text-sm font-medium leading-none">{{ catalog.title }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
