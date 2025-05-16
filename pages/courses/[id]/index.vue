<script setup lang="ts">
definePageMeta({
  name: "current-course",
});

const route = useRoute();
</script>

<template>
  <div>Пост с id {{ route.params["id"] }}</div>
</template>

<style scoped lang="scss"></style>
