<script setup lang="ts">
defineProps<{
  img: string;
}>();

const isDark = useDark();
</script>

<template>
  <div class="hover:scale-[1.05] duration-300 hover:-translate-y-1 rounded-xl p-7" :class="isDark ? 'gradient-dark' : 'gradient-light'">
    <div class="grid gap-16">
      <div class="flex justify-center">
        <img :src="img" alt="" class="h-[325px]" />
      </div>
      <div class="grid grid-rows-[50px,1fr] gap-3">
        <div class="font-extrabold">
          <slot name="title" />
        </div>
        <div class="text-xs font-semibold">
          <slot name="text" />
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
