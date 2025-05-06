<script setup lang="ts">
import type { IInstructionResponseGetAll } from "~/types/Instruction/type";

const instructionsId = useRoute().params.id;

definePageMeta({
  layout: "academy-support",
});

const { data: subinstruction } = await useAsyncData(
  `subinstruction-${instructionsId}`,
  () =>
    $fetch<IInstructionResponseGetAll>("/apijs/request", {
      params: {
        url: `/api/v1/subinstruction/${instructionsId}`,
      },
    }),
);
</script>

<template>
  <div class="pt-12 container px-[100px]">
    <div class="text-center text-[24px] mb-12">{{ subinstruction.title }}</div>
    <MyMdPreview :text="subinstruction.description" />
  </div>
</template>
