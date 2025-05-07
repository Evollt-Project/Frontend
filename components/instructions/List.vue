<script setup lang="ts">
defineProps<{
  isLoading: boolean;
}>();
</script>

<template>
  <div
    class="mt-12 grid grid-cols-[repeat(auto-fit,minmax(293px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-6"
  >
    <div v-if="isLoading" v-for="_ in 3">
      <InstructionsCardSkeleton />
    </div>
    <slot v-else></slot>
  </div>
</template>

<style scoped lang="scss"></style>
