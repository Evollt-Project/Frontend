<script setup lang="ts">
useDark();

onMounted(async () => {
  if (!User.store.user && localStorage.getItem("token")) {
    await User.get();
  }

  if (!User.store.enums) {
    await User.getEnums();
  }
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
