<script setup lang="ts">
import type {
  RouteLocationAsPathGeneric,
  RouteLocationAsRelativeGeneric,
} from "#vue-router";

const props = defineProps<{
  to: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric;
}>();
</script>

<template>
  <NuxtLink v-bind="props" class="flex gap-3 items-center">
    <IconsBack />
    Назад
  </NuxtLink>
</template>
