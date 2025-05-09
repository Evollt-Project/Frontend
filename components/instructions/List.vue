<script setup lang="ts">
defineProps<{
  isLoading: boolean;
  instructions: {
    id: number;
    title: string;
    logo: string;
    short_description: string;
    description: string;
  }[];
  type: "subinstruction" | "instruction";
}>();
</script>

<template>
  <div
    v-if="isLoading || instructions.length > 0"
    class="mt-12 grid grid-cols-[repeat(auto-fit,minmax(293px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-6"
  >
    <div v-if="isLoading" v-for="_ in 3">
      <InstructionsCardSkeleton />
    </div>
    <InstructionsCard
      v-else
      v-for="item in instructions"
      :key="item.id"
      :instruction="item"
      :type="type"
    />
  </div>
  <div v-else class="flex justify-center mt-5">
    <h3 class="text-xl">Ничего не найдено</h3>
  </div>
</template>
