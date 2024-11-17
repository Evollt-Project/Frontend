<script lang="ts" setup>
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);

const iconPath = computed(() => {
  return isDark.value
    ? "M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
    : "M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z";
});
</script>

<template>
  <button
    @click="toggleDark()"
    class="hs-tooltip-toggle w-[38px] h-[38px] inline-flex justify-center items-center gap-x-2 rounded-full text-gray-500 hover:bg-gray-100 disabled:opacity-50 duration-300 disabled:pointer-events-none focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-700"
  >
    <ClientOnly>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-7 h-7"
      >
        <path stroke-linecap="round" stroke-linejoin="round" :d="iconPath" />
      </svg>
    </ClientOnly>
  </button>
</template>
