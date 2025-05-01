<script lang="ts" setup>
onMounted(() => {
  if (Catalog.store.catalogs.length === 0) {
    Catalog.getAll();
  }
});
</script>

<template>
  <div>
    <SupportHeader />
    <div class="main-content">
      <slot></slot>
    </div>
    <Footer />
  </div>
</template>

<style scoped lang="scss">
.main-content {
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
}
</style>
