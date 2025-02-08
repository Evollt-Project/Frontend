<script setup lang="ts">
import type { INotification } from "~/types/INotification";

defineProps<{
  notification: INotification;
}>();
</script>

<template>
  <div class="notification">
    <div class="notification__title flex gap-3 items-center">
      <div class="text-xl">{{ notification.title }}</div>
      <div class="text-neutral-500">
        {{
          FormatDate.formatNotificationDate(new Date(notification.created_at))
        }}
      </div>
    </div>
    <div class="notification__message">{{ notification.message }}</div>
  </div>
</template>

<style scoped lang="scss"></style>
