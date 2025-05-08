<script setup lang="ts">
import type { TabType } from "~/types/TabType";

const loginModal: Ref<boolean> = ref(false);
const newsListModal: Ref<boolean> = ref(false);
const tab: Ref<TabType> = ref("login");

const openNewsList = () => {
  newsListModal.value = true;
};

const openAuthModal = (currentTab: TabType) => {
  tab.value = currentTab;
  loginModal.value = true;
};
const router = useRouter();
const config = useRuntimeConfig();
const catalogModal = ref(false);
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
        <div class="header__title text-xl md:text-3xl">
          {{ config.public.app_name }}
        </div>
      </NuxtLink>
      <div class="header__center hidden md:flex gap-5 items-center">
        <HeaderMenu @update:catalog-modal="catalogModal = $event" />
      </div>
      <div class="header__right flex gap-5 items-center">
        <ColorScheme />
        <NotificationsList />
        <div v-if="User.store.user">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <v-avatar
                :image="
                  User.store.userPhotoUrl(
                    User.store.user.avatar,
                    User.store.user.first_name,
                  )
                "
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-56">
              <DropdownMenuLabel class="flex justify-center"
                >{{
                  [User.store.user.surname, User.store.user.first_name].join(
                    " ",
                  )
                }}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  class="cursor-pointer"
                  @click="router.push({ name: 'profile' })"
                >
                  <span>Профиль</span>
                  <DropdownMenuShortcut>
                    <v-icon icon="mdi-account-outline"></v-icon>
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem
                  class="cursor-pointer md:hidden"
                  @click="catalogModal = true"
                >
                  <span>Каталог</span>
                  <DropdownMenuShortcut>
                    <v-icon icon="mdi-shape-outline"></v-icon>
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem
                  class="cursor-pointer"
                  @click="router.push({ name: 'settings' })"
                >
                  <span>Настройки</span>
                  <DropdownMenuShortcut>
                    <v-icon icon="mdi-cog-outline"></v-icon>
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem class="cursor-pointer" @click="openNewsList">
                  <span>Что нового?</span>
                  <DropdownMenuShortcut>
                    <v-icon icon="mdi-newspaper-variant-outline"></v-icon>
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem
                  class="cursor-pointer md:hidden"
                  @click="router.push({ name: 'blog' })"
                >
                  <span>Блог</span>
                  <DropdownMenuShortcut>
                    <v-icon icon="mdi-post-outline"></v-icon>
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem @click="User.logout()">
                <span>Выйти</span>
                <DropdownMenuShortcut>
                  <v-icon icon="mdi-logout"></v-icon>
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div v-else>
          <div class="sm:hidden flex">
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <v-icon icon="mdi-account-outline" size="30" />
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-20">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    class="cursor-pointer"
                    @click="openAuthModal('login')"
                  >
                    <span>Вход</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    class="cursor-pointer"
                    @click="openAuthModal('register')"
                  >
                    <span>Регистрация</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div class="gap-5 items-center hidden sm:flex">
            <MyButton @click="openAuthModal('login')" class="text-lg">
              Вход
            </MyButton>
            <MyButton @click="openAuthModal('register')" class="text-lg">
              Регистрация
            </MyButton>
          </div>
        </div>
      </div>
    </div>
    <ModalsAuthorize
      :dialog="loginModal"
      :tab="tab"
      @dialog="(e: boolean) => (loginModal = e)"
    />
    <ModalsNewsList
      :loading="false"
      :dialog="newsListModal"
      @dialog="(e: boolean) => (newsListModal = e)"
    />
    <ModalsCatalog :dialog="catalogModal" @dialog="(e) => (catalogModal = e)" />
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

.list-item {
  background-color: #2e2e2e;
}
</style>
