<script setup lang="ts">
import type { IVideoinstruction } from "~/types/Videoinstruction/IVideoinstruction";

defineProps<{
  videoinstuction: IVideoinstruction;
}>();
</script>

<template>
  <div class="p-[35px] dark:bg-neutral-900 bg-neutral-100 rounded-2xl">
    <div class="flex flex-col gap-7 h-auto">
      <div class="font-bold text-2xl"> {{ videoinstuction.title }} </div>
      <iframe
        width="100%"
        height="350"
        :src="videoinstuction.video_url"
        frameBorder="0"
        allow="clipboard-write; autoplay"
        webkitAllowFullScreen
        mozallowfullscreen
        allowFullScreen
        v-if="videoinstuction.platform === 1"
      ></iframe>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
