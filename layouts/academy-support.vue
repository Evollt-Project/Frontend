<script lang="ts" setup>
onMounted(() => {
  if (Catalog.store.catalogs.length === 0) {
    Catalog.getAll();
  }
});
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <HeaderSupport />
    <div class="main-content flex-grow">
      <slot></slot>
    </div>
    <FooterSupport />
  </div>
</template>
