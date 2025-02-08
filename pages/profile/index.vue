<script setup lang="ts">
definePageMeta({
  name: "profile",
  layout: "sidebar",
});
</script>

<template>
  <div v-if="User.store.user">
    <Profile :user="User.store.user" />
  </div>
</template>

<style scoped lang="scss"></style>
