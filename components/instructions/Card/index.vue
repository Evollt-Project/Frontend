<script setup lang="ts">
import type { IInstruction } from "~/types/Instruction/IInstruction";

defineProps<{
  instruction: IInstruction;
}>();

</script>

<template>
  <div
    class="relative rounded-2xl h-[230px] hover:cursor-pointer bg-[#F5F5F5] duration-500 hover:scale-[101%] dark:bg-[#171717] hover:shadow-[0_0_5px_0_#000000] hover:dark:shadow-[0_0_5px_0_#FFFFFF]"
  >
    <div class="flex justify-between px-[40px] pt-[35px]">
      <div class="flex flex-col w-[70%] gap-[25px]">
        <div class="font-bold">
          {{ instruction.title }}
        </div>
        <div class="font-semibold size-">
          {{ instruction.short_description }}
        </div>
      </div>
      <div>
        <v-icon size="50px" :icon="instruction.logo" />
      </div>
    </div>
    <div class="absolute bottom-1 right-1 mr-[35px] mb-2.5"
      >Подробнее <v-icon icon="mdi-chevron-right"
    /></div>
  </div>

</template>
