<script setup lang="ts">
import type { ITag } from "~/types/ITag";

defineProps<{
  items: ITag[];
}>();
</script>

<template>
  <div class="tags_list flex gap-2 flex-wrap">
    <ProfileTagItem v-for="item in items" :key="item.title" :item="item" />
  </div>
</template>

<style scoped lang="scss"></style>
