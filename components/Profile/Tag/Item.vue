<script setup lang="ts">
import type { ITag } from "~/types/ITag";

defineProps<{
  item: ITag;
}>();
</script>

<template>
  <div class="tags__item" :class="{ 'cursor-pointer': item.description }">
    {{ item.title }}
    <v-tooltip
      activator="parent"
      v-if="item.description"
      max-width="300px"
      location="bottom"
    >
      {{ item.description }}
    </v-tooltip>
  </div>
</template>

<style scoped lang="scss">
.tags__item {
  border: 2px solid #1f1f1f;
  border-radius: 20px;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
