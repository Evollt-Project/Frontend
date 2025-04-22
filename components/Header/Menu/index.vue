<script setup lang="ts">
const emits = defineEmits(["update:catalog-modal"]);
</script>

<template>
  <div class="flex gap-5">
    <div @click="emits('update:catalog-modal', true)">
      <div class="bg-transparent cursor-pointer"> Каталог </div>
    </div>
    <div>
      <NuxtLink
        :to="{
          name: 'blog',
        }"
      >
        Блог
      </NuxtLink>
    </div>
  </div>
</template>
