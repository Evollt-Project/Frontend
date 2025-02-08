<script setup lang="ts">
useDark();

onMounted(async () => {
  if (!User.store.user && localStorage.getItem("token")) {
    await User.get();
  }
  if (Catalog.store.catalogs.length == 0) {
    Catalog.getAll();
  }
  if (!User.store.enums) {
    User.getEnums();
  }
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
