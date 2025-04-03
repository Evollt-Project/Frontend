<script setup lang="ts">
import type { ITeacher } from "~/types/Teacher/ITeacher";

defineProps<{
  item: ITeacher;
}>();
const loading = ref(false);
</script>

<template>
  <div class="flex gap-3 items-center">
    <div>
      <v-avatar
        size="50"
        :image="User.store.userPhotoUrl(item.avatar, item.first_name)"
      />
    </div>
    <NuxtLink
      :to="{
        name: 'other-profile',
        params: {
          id: item.id,
        },
      }"
      target="_blank"
      class="underline"
    >
      {{ item.first_name }}
    </NuxtLink>
    <div>
      <v-btn
        icon="mdi-close"
        :disabled="loading"
        variant="text"
        class="dark:text-white"
        :ripple="false"
      />
    </div>
  </div>
</template>

<style scoped></style>
