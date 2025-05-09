<script setup lang="ts">
const socialLinks = computed(() => ({
  vk: process.env.VK_COMMUNITY || "https://vk.com",
  reddit: process.env.REDDIT_COMMUNITY || "https://reddit.com",
  telegram: process.env.TELEGRAM_COMMUNITY || "https://telegram.org",
  discord: process.env.DISCORD_COMMUNITY || "https://discord.com/",
}));
</script>

<template>
  <div
    class="flex flex-col gap-3 bg-[#f5f5f5] dark:bg-[#171717] py-[20px] text-[13px] mt-12 align-center"
  >
    <a
      class="underline hover:text-blue-400 transition-all"
      href="mailto:support@evollt.ru"
    >
      Отправить запрос в поддержку
    </a>
    <div class="flex gap-2 w-full justify-center">
      <a :href="socialLinks.vk" target="_blank">
        <IconsVk height="1.25rem" width="1.25rem" />
      </a>
      <a :href="socialLinks.reddit" target="_blank">
        <IconsReddit height="1.25rem" width="1.25rem" />
      </a>
      <a :href="socialLinks.telegram" target="_blank">
        <IconsTelegram height="1.25rem" width="1.25rem" />
      </a>
      <a :href="socialLinks.discord" target="_blank">
        <IconsDiscord height="1.25rem" width="1.25rem" />
      </a>
    </div>
    <div>
      © 2025
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
