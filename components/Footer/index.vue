<script setup lang="ts">
const config = useRuntimeConfig();
const year = new Date().getFullYear();
</script>

<template>
  <div
    class="mt-[64px] p-[40px_20px_25px_20px] dark:bg-neutral-900 bg-neutral-100]"
  >
    <div class="container flex lg:flex-row flex-col justify-between gap-5">
      <div class="flex flex-col gap-2 whitespace-nowrap">
        <div class="flex flex-row gap-5 items-center">
          <div class="header__logo">
            <IconsLogo />
          </div>
          <div class="header__title text-xl md:text-3xl">
            {{ $config.public.app_name }}
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-2 whitespace-nowrap">
        <div class="font-semibold mb-2 text-xl">О компании</div>
        <div>© {{ year }} Evollt Academy</div>
        <div>
          <a href="" target="_blank">Пользовательское соглашение</a>
        </div>
        <div>
          <a href="" target="_blank">Политика конфиденциальности</a>
        </div>
      </div>

      <div class="flex flex-col gap-2 whitespace-nowrap">
        <div class="font-semibold mb-2 text-xl">Навигация</div>
        <div>
          <NuxtLink :to="{ name: 'support-instructions' }">Помощь</NuxtLink>
        </div>
        <div>
          <NuxtLink>Контакты</NuxtLink>
        </div>
      </div>

      <div class="flex flex-col gap-2 whitespace-nowrap">
        <div class="font-semibold mb-2 text-xl">Информация</div>
        <div>
          <NuxtLink>О проекте</NuxtLink>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <div class="font-semibold mb-2 whitespace-nowrap text-xl"
          >Свяжитесь с нами</div
        >
        <div>
          <div class="flex gap-2 w-full">
            <a :href="config.public.vk" target="_blank">
              <IconsVk />
            </a>
            <a :href="config.public.reddit" target="_blank">
              <IconsReddit />
            </a>
            <a :href="config.public.telegram" target="_blank">
              <IconsTelegram />
            </a>
            <a :href="config.public.discord" target="_blank">
              <IconsDiscord />
            </a>
          </div>
        </div>
        <div class="whitespace-nowrap">
          <a href="mailto:academy@evollt.ru">academy@evollt.ru</a>
        </div>
      </div>
    </div>
  </div>
</template>
