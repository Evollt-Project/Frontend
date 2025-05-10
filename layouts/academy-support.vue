<script lang="ts" setup>
onMounted(() => {
  if (Catalog.store.catalogs.length === 0) {
    Catalog.getAll();
  }
});
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <div class="main-content flex-grow pt-[40px] pb-[20px]">
      <slot></slot>
    </div>
    <FooterSupport />
  </div>
</template>
