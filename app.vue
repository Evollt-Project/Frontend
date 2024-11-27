<script setup lang="ts">
useDark();

onMounted(async () => {
  if (Catalog.store.catalogs.length == 0) {
    await Catalog.getCatalogs();
    Loader.changeProgress();
  }
  if (!User.store.user && localStorage.getItem("token")) {
    await User.get();
  }
  Loader.changeProgress();
  Loader.changeLoading();
});
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style scoped lang="scss"></style>
