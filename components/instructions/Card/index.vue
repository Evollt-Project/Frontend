<script setup lang="ts">
import type { IInstruction } from "~/types/Instruction/IInstruction";

defineProps<{
  instruction: IInstruction;
  path: string;
}>();
</script>

<template>
  <NuxtLink
    :to="{
      path: `${path}`,
      query: {
        id: instruction.id,
      },
    }"
  >
    <div
      class="relative rounded-2xl w-full h-[230px] hover:cursor-pointer bg-[#F5F5F5] duration-500 hover:scale-[101%] dark:bg-[#171717] hover:shadow-[0_0_5px_0_#000000] hover:dark:shadow-[0_0_5px_0_#FFFFFF]"
    >
      <div class="flex justify-between px-[20px] py-[30px] sm:p-[40px] h-full">
        <div class="flex flex-col gap-[25px]">
          <div class="font-bold">
            {{ instruction.title }}
          </div>
          <div class="font-semibold">
            {{ instruction.short_description }}
          </div>
        </div>
        <div>
          <v-icon size="50px" :icon="instruction.logo" />
        </div>
      </div>
      <div class="absolute right-[35px] bottom-[20px]">
        Подробнее
        <v-icon icon="mdi-chevron-right" />
      </div>
    </div>
  </NuxtLink>
</template>
