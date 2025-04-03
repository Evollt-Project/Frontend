<script setup lang="ts"></script>

<template>
  <div
    class="support w-8 h-8 rounded-full border !border-black dark:!border-white flex justify-center items-center cursor-help"
  >
    ?
    <MyTooltip>
      <slot></slot>
    </MyTooltip>
  </div>
</template>

<style scoped lang="scss"></style>
