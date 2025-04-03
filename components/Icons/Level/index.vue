<script setup lang="ts">
defineProps<{
  width?: string;
  height?: string;
  fill?: string;
}>();
</script>

<template>
  <svg
    :fill="fill || '#000000'"
    :width="width || '800px'"
    :height="height || '800px'"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Skill Level - Basic</title>
    <path d="M30,30H22V4h8Zm-6-2h4V6H24Z" />
    <path d="M20,30H12V12h8Zm-6-2h4V14H14Z" />
    <path d="M10,30H2V18h8Z" />
  </svg>
</template>
