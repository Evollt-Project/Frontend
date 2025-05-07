<script setup lang="ts">
import type { ISubinstructionResponseBase } from "~/types/Subinstruction/type";

const route = useRoute();
const subinstructionsId = route.params["id"];

definePageMeta({
  layout: "academy-support",
  name: "support-subinstruction",
});

const { data: subinstruction } = await useAsyncData(
  `subinstruction-${subinstructionsId}`,
  async () => {
    return await $fetch<ISubinstructionResponseBase>("/apijs/request", {
      params: {
        url: `/api/v1/subinstruction/${subinstructionsId}`,
      },
    });
  },
);

useHead({
  title: "Подинструкция: " + subinstruction.value?.title,
});
</script>

<template>
  <div class="container">
    <div class="text-center text-[24px] mb-12">{{ subinstruction?.title }}</div>
    <MyMdPreview :text="subinstruction?.description" />
  </div>
</template>
