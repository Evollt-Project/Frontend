<script setup lang="ts"></script>

<template>
  <div
    class="support w-8 h-8 rounded-full border !border-black dark:!border-neutral-600 dark:text-neutral-600 flex justify-center items-center cursor-pointer"
  >
    ?
    <v-tooltip activator="parent" width="300" location="bottom"
      ><slot></slot
    ></v-tooltip>
  </div>
</template>

<style scoped lang="scss"></style>
