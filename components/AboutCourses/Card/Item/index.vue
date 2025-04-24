<script setup lang="ts">
defineProps<{
  img: string;
}>();

const isDark = useDark();
</script>

<template>
  <div class="lg:w-1/3 sm:flex-row flex-col rounded-xl p-7" :class="isDark ? 'gradient-dark' : 'gradient-light'">
    <div class="flex flex-col gap-16">
      <div class="">
        <img :src="img" alt="" class="h-[325px] justify-items-center m-auto" />
      </div>
      <div class="flex flex-col gap-3">
        <div class="font-extrabold dark:color-white">
          <slot name="title"></slot>
        </div>
        <div class="text-xs font-semibold">
          <slot name="text"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gradient-dark {
  background: linear-gradient(to top right, #343131, #171717, #171717, #353232);
}

.gradient-light{
  background: linear-gradient(to top right, #A0A0A0, #F5F5F5, #F5F5F5, #A0A0A0);
}


</style>
