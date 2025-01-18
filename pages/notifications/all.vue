<script setup lang="ts">
definePageMeta({
  name: "notifications-all",
  layout: "sidebar",
});
useHead({
  title: "Evollt School | Уведомления",
});
</script>

<template>
  <div class="notifications sidebar-content" v-if="User.store.user">
    <h1 class="text-4xl font-bold">Уведомления</h1>
  </div>
</template>

<style scoped lang="scss"></style>
