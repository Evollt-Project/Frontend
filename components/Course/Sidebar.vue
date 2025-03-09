<script setup lang="ts">
import { ChevronsUpDown } from "lucide-vue-next";
import type {
  ICollapsibleSidebarItem,
  ISidebarItem,
} from "~/types/ISidebarItem";

const router = useRouter();
const collapsibleItems: ICollapsibleSidebarItem[] = [
  {
    title: "Курс",
    icon: "mdi-school-outline",
    isActive: false,
    items: [
      {
        title: "Описание",
        url: "course-description",
      },
      {
        title: "Содержание",
        url: "course-content",
      },
      {
        title: "Чек-лист",
        url: "course-checklist",
      },
    ],
  },
  {
    title: "Общение с учащимися",
    icon: "mdi-human-male-board",
    isActive: false,
    items: [
      {
        title: "Новости",
        url: "course-news",
      },
      {
        title: "Комментарии",
        url: "course-comments",
      },
      {
        title: "Отзывы",
        url: "course-feedbacks",
      },
    ],
  },
  {
    title: "Аналитика",
    icon: "mdi-human-male-board",
    isActive: false,
    items: [
      {
        title: "Отчеты",
        url: "course-reports",
      },
      {
        title: "Доход",
        url: "course-revenue",
      },
      {
        title: "Статистика",
        url: "course-statistics",
      },
    ],
  },
  {
    title: "Настройки",
    icon: "mdi-cog-outline",
    isActive: false,
    items: [
      {
        title: "Публикация",
        url: "course-publish",
      },
      {
        title: "Цена и промокоды",
        url: "course-price",
      },
      {
        title: "Права доступа",
        url: "course-permissions",
      },
    ],
  },
  {
    title: "Сертификаты",
    icon: "mdi-account-outline",
    url: "course-certificates",
    isActive: false,
  },
  {
    title: "Файлы",
    icon: "mdi-account-outline",
    url: "course-files",
    isActive: false,
  },
];
const currentCategory: Ref<ICollapsibleSidebarItem | null> = ref(null);
const currentItem: Ref<ISidebarItem | null> = ref(null);
</script>

<template>
  <SidebarProvider v-if="User.store.user">
    <Sidebar collapsible="icon" class="sidebar">
      <SidebarHeader class="sidebar-header">
        <SidebarMenu>
          <SidebarMenuItem>
            <MySidebarLogoItem />
            <SidebarMenuItem> weofjewoif </SidebarMenuItem>
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
                        User.store.user.first_name
                      )
                    "
                  />
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">
                      {{
                        [
                          User.store.user.surname,
                          User.store.user.first_name,
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
                          User.store.user.first_name
                        )
                      "
                    />
                    <div class="grid flex-1 text-left text-sm leading-tight">
                      <span class="truncate font-semibold">
                        {{
                          [
                            User.store.user.surname,
                            User.store.user.first_name,
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
      <div class="sidebar-container">
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

<style scoped lang="scss"></style>
