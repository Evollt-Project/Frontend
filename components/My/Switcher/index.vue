<script setup lang="ts">
const props = defineProps<{
  label: string;
}>();
</script>

<template>
  <v-switch v-bind="props" hide-details inset />
</template>
