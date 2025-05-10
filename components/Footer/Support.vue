<script setup lang="ts">
const config = useRuntimeConfig();
const year = new Date().getFullYear();
</script>

<template>
  <div
    class="flex flex-col gap-3 dark:bg-neutral-900 bg-neutral-100 py-[20px] text-[13px] mt-12 align-center"
  >
    <a
      class="underline hover:text-blue-400 transition-all"
      href="mailto:support@evollt.ru"
    >
      Отправить запрос в поддержку
    </a>
    <div class="flex gap-2 w-full justify-center">
      <a :href="config.public.vk" target="_blank">
        <IconsVk height="20px" width="20px" />
      </a>
      <a :href="config.public.reddit" target="_blank">
        <IconsReddit height="20px" width="20px" />
      </a>
      <a :href="config.public.telegram" target="_blank">
        <IconsTelegram height="20px" width="20px" />
      </a>
      <a :href="config.public.discord" target="_blank">
        <IconsDiscord height="20px" width="20px" />
      </a>
    </div>
    <div>
      © {{ year }}
      <a
        href="https://academy.evollt.ru/"
        class="underline hover:text-blue-400 transition-all"
      >
        Evollt Academy
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
