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
    <div class="flex items-center justify-between mb-5">
      <MyBackButton
        :to="{
          name: 'support-subinstructions',
          query: {
            instruction_id: subinstructionsId,
          },
        }"
        class="flex-shrink-0"
      />
      <div class="text-2xl">
        {{ subinstruction?.title }}
      </div>
      <div></div>
    </div>

    <MyMdPreview :text="subinstruction?.description" />
  </div>
</template>
