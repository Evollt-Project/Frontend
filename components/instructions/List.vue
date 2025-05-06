<script setup lang="ts">
defineProps<{
  list: Array<Object>;
  isLoading: boolean;
  path: string;
}>();
</script>

<template>
  <div
    class="mt-12 grid grid-cols-[repeat(auto-fit,minmax(293px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-6"
  >
    <instructions-card
      v-for="(item, index) in list"
      :key="index"
      :instruction="item"
      :path="path"
    />

    <div v-if="isLoading" v-for="_ in 3">
      <InstructionsCardSkeleton />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
