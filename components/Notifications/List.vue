<script setup lang="ts">
const router = useRouter();
const readAllModal = ref(false);
const loading = ref(false);

const readAllNotifications = () => {
  loading.value = true;
  setTimeout(() => {
    console.log("hello");
    readAllModal.value = false;
    loading.value = false;
  }, 5000);
};
</script>

<template>
  <div v-if="User.store.user">
    <DropdownMenu v-if="!readAllModal">
      <DropdownMenuTrigger as-child>
        <v-icon
          icon="mdi-bell-outline"
          class="text-gray-500 dark:text-neutral-400"
          size="large"
        ></v-icon>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-96 mt-2">
        <DropdownMenuLabel class="flex justify-between">
          <NuxtLink to="#">
            <v-icon icon="mdi-cog-outline"></v-icon>
            <v-tooltip activator="parent" theme="dark" location="bottom">
              Настройки уведомлений
            </v-tooltip>
          </NuxtLink>
          <span>Уведомления</span>
          <span class="cursor-pointer" @click="readAllModal = !readAllModal">
            <v-icon icon="mdi-check-all"></v-icon>
            <v-tooltip activator="parent" theme="dark" location="bottom"
              >Прочитать все</v-tooltip
            >
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            class="cursor-pointer"
            v-for="notification in User.store.notifications"
          >
            <NotificationsItem :notification="notification" />
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          @click="
            router.push({
              name: 'notifications-all',
            })
          "
          class="flex justify-center cursor-pointer"
        >
          <span>Показать все уведомления</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <ModalsConfirmAction
      :dialog="readAllModal"
      :loading="loading"
      @action="readAllNotifications()"
      @dialog="(e) => (readAllModal = e)"
    >
      <template #content>Отметить все уведомления прочитанными?</template>
    </ModalsConfirmAction>
  </div>
</template>
