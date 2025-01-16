<script setup lang="ts">
import { ChevronsUpDown } from "lucide-vue-next";
import type {
  ICollapsibleSidebarItem,
  ISidebarItem,
} from "~/types/ISidebarItem";

const router = useRouter();
const route = useRoute();
const collapsibleItems: ICollapsibleSidebarItem[] = [
  {
    title: "Профиль",
    icon: "mdi-account-outline",
    url: "profile",
    isActive: false,
  },
  {
    title: "Курсы",
    icon: "mdi-school-outline",
    isActive: false,
    items: [
      {
        title: "Прохожу",
        url: "courses-passing",
      },
      {
        title: "Избранные",
        url: "courses-favorites",
      },
      {
        title: "Хочу пройти",
        url: "courses-wishlist",
      },
    ],
  },
  {
    title: "Настройки",
    icon: "mdi-cog-outline",
    isActive: false,
    items: [
      {
        title: "Редактировать профиль",
        url: "settings-profile",
      },
      {
        title: "Изменить почту",
        url: "settings-email",
      },
      {
        title: "Вход через социальные сети",
        url: "settings-social",
      },
      {
        title: "Ссылки на социальные сети",
        url: "settings-links",
      },
      {
        title: "Изменить пароль",
        url: "settings-password",
      },
      {
        title: "Уведомления",
        url: "settings-notifications",
      },
      {
        title: "Реквизиты",
        url: "settings-requisites",
      },
    ],
  },
  {
    title: "Преподавание",
    icon: "mdi-human-male-board",
    isActive: false,
    items: [
      {
        title: "Курсы",
        url: "teach-courses",
      },
      {
        title: "Уроки",
        url: "teach-lessons",
      },
      {
        title: "Рассылки",
        url: "teach-mailing",
      },
    ],
  },
  {
    title: "Уведомления",
    icon: "mdi-bell-outline",
    url: "notifications",
    isActive: false,
  },
  {
    title: "Сертификаты",
    icon: "mdi-certificate-outline",
    url: "certificates",
    isActive: false,
  },
];
const currentCategory: Ref<ICollapsibleSidebarItem | null> = ref(null);
const currentItem: Ref<ISidebarItem | null> = ref(null);

const checkSplitPath = (
  category: ICollapsibleSidebarItem,
  word: string,
  arr: string[],
) => {
  arr.map((item, index) => {
    if (word == item) {
      currentItem.value = category.items ? category.items[index] : null;
    }
  });
};

const checkCategoryAndItem = () => {
  const splitRouteName = String(route.name).split("-");
  if (splitRouteName[0] == "profile") {
    currentCategory.value = collapsibleItems[0];
    currentItem.value = null;
  } else if (splitRouteName[0] == "courses") {
    currentCategory.value = collapsibleItems[1];

    checkSplitPath(currentCategory.value, splitRouteName[1], [
      "passing",
      "favorites",
      "wishlist",
    ]);
  } else if (splitRouteName[0] == "settings") {
    currentCategory.value = collapsibleItems[2];

    checkSplitPath(currentCategory.value, splitRouteName[1], [
      "profile",
      "email",
      "social",
      "links",
      "password",
      "notifications",
      "requisites",
    ]);
  } else if (splitRouteName[0] == "teach") {
    currentCategory.value = collapsibleItems[3];

    checkSplitPath(currentCategory.value, splitRouteName[1], [
      "courses",
      "lessons",
      "mailing",
    ]);
  } else if (splitRouteName[0] == "notifications") {
    currentCategory.value = collapsibleItems[4];
    currentItem.value = null;
  } else if (splitRouteName[0] == "certificates") {
    currentCategory.value = collapsibleItems[5];
    currentItem.value = null;
  }
};

watch(
  () => route.params,
  () => {
    checkCategoryAndItem();
  },
);

onMounted(() => {
  checkCategoryAndItem();
});
</script>

<template>
  <SidebarProvider v-if="User.store.user">
    <Sidebar collapsible="icon" class="sidebar">
      <SidebarHeader class="sidebar-header">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton class="py-5">
              <ColorScheme :icon-style="{ width: '21px', height: '21px' }" />
              <span
                @click="router.push({ name: 'index' })"
                class="sidebar-header__title text-xl cursor-pointer"
              >
                Evollt School
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <MySidebarCollapsibleItem
              v-for="item in collapsibleItems"
              :key="item.title"
              :item="item"
            />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <SidebarMenuButton
                  size="lg"
                  class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <v-avatar
                    class="rounded-lg"
                    :image="
                      User.store.userPhotoUrl(
                        User.store.user.avatar,
                        User.store.user.first_name,
                      )
                    "
                  />
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">
                      {{
                        [
                          User.store.user.surname,
                          User.store.user.first_name,
                          ,
                          User.store.user.last_name,
                        ].join(" ")
                      }}
                    </span>
                    <span class="truncate text-xs">
                      {{ User.store.user.email }}
                    </span>
                  </div>
                  <ChevronsUpDown class="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                :side-offset="4"
              >
                <DropdownMenuLabel class="p-0 font-normal">
                  <div
                    class="flex items-center gap-2 px-1 py-1.5 text-left text-sm"
                  >
                    <v-avatar
                      class="h-8 w-8 rounded-full"
                      :image="
                        User.store.userPhotoUrl(
                          User.store.user.avatar,
                          User.store.user.first_name,
                        )
                      "
                    />
                    <div class="grid flex-1 text-left text-sm leading-tight">
                      <span class="truncate font-semibold">
                        {{
                          [
                            User.store.user.surname,
                            User.store.user.first_name,
                            ,
                            User.store.user.last_name,
                          ].join(" ")
                        }}
                      </span>
                      <span class="truncate text-xs">
                        {{ User.store.user.email }}
                      </span>
                    </div>
                  </div>
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
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem @click="User.logout()">
                  <span>Выйти</span>
                  <DropdownMenuShortcut
                    ><v-icon icon="mdi-logout"></v-icon
                  ></DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
    <SidebarInset>
      <div class="sidebar-content">
        <header
          class="fixed !bg-white dark:!bg-background z-50 w-full flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
        >
          <div class="flex items-center gap-2 px-4">
            <SidebarTrigger class="-ml-1" />
            <Separator orientation="vertical" class="mr-2 h-4" />
            <Breadcrumb v-if="currentCategory">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <span>{{ currentCategory.title }}</span>
                </BreadcrumbItem>
                <BreadcrumbSeparator v-if="currentItem" />
                <BreadcrumbItem>
                  <DropdownMenu v-if="currentItem">
                    <DropdownMenuTrigger as-child>
                      <div>
                        <span class="flex items-center gap-1">
                          {{ currentItem.title }}
                          <ChevronsUpDown class="ml-auto size-4" />
                        </span>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          v-for="item in currentCategory.items"
                          :key="item.url"
                          @click="router.push({ name: item.url })"
                        >
                          {{ item.title }}
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div class="px-4 mt-[67px] sidebar-content__div">
          <slot></slot>
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>

<style scoped lang="scss">
.sidebar {
  &-header {
    &__title {
      font-family: var(--logoFont);
    }
  }
}
</style>
