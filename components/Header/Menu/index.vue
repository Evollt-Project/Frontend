<script setup lang="ts">
const catalogModal = ref(false);
</script>

<template>
  <div class="flex gap-5">
    <div>
      <div
        variant="outline"
        @click="catalogModal = true"
        class="bg-transparent cursor-pointer"
      >
        Каталог
      </div>
      <ModalsCatalog
        :dialog="catalogModal"
        @dialog="(e) => (catalogModal = e)"
      />
    </div>
  </div>
</template>
