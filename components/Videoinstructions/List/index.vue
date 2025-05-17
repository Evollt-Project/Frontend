<script setup lang="ts">
import type { IVideoinstruction } from "~/types/Videoinstruction/IVideoinstruction";

defineProps<{
  videoinstructions: IVideoinstruction[];
  isLoading: boolean;
}>();
const emit = defineEmits(["update:videoinstruction"]);

const updateVideoinstructions = () => {
  emit("update:videoinstruction");
};
</script>

<template>
  <div
    v-if="isLoading || videoinstructions.length > 0"
    class="mt-12 grid grid-cols-[repeat(auto-fit,minmax(293px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-6"
  >
    <div v-if="isLoading" v-for="_ in 3">
      <VideoinstructionsCardSkeleton />
    </div>
    <VideoinstructionsCard
      v-else
      v-for="(item, index) in videoinstructions"
      :key="index"
      :videoinstuction="item"
      @update:videoinstructions="updateVideoinstructions"
    />
  </div>
  <div v-else class="flex justify-center mt-5">
    <h3 class="text-xl">Ничего не найдено</h3>
  </div>
</template>
