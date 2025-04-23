<script setup lang="ts">
defineProps<{
  img: string;
}>();
</script>

<template>
  <div class="w-1/3 rounded-xl p-7 gradient">
    <div class="flex flex-col gap-16">
      <div class=" ">
        <img :src="img" alt="" class="dark:hidden" />
      </div>
      <div class="flex flex-col gap-3">
        <div class="font-bold dark:color-white">
          <slot name="title"></slot>
        </div>
        <div class="text-xs">
          <slot name="text"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gradient {
  background: linear-gradient(to top right, #343131, #121212, #121212, #353232);
}
</style>
