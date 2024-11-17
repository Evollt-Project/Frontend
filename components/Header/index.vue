<script setup lang="ts">
import type { TabType } from "~/types/TabType";

const loginModal: Ref<boolean> = ref(false);
const tab: Ref<TabType> = ref("login");

const openAuthModal = (currentTab: TabType) => {
  tab.value = currentTab;
  loginModal.value = true;
};
</script>

<template>
  <header class="header">
    <div
      class="header__content container mx-auto py-6 flex items-center justify-between"
    >
      <NuxtLink
        class="header__left flex gap-8 items-center"
        :to="{ name: 'index' }"
      >
        <div class="header__logo">
          <IconsLogo />
        </div>
        <div class="header__title text-3xl">Evollt Project</div>
      </NuxtLink>
      <div class="header__right flex gap-5">
        <ColorScheme />
        <MyButton @click="openAuthModal('login')" class="text-lg"
          >Вход</MyButton
        >
        <MyButton @click="openAuthModal('register')" class="text-lg"
          >Регистрация</MyButton
        >
      </div>
    </div>
    <ModalsAuthorize
      :dialog="loginModal"
      :tab="tab"
      @dialog="(e: boolean) => (loginModal = e)"
    />
  </header>
</template>

<style scoped lang="scss">
.header {
  .header__content {
    .header__title {
      font-family: var(--logoFont);
    }
  }
}
</style>
