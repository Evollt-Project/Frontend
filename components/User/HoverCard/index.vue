<script setup lang="ts">
import { CalendarIcon } from "@radix-icons/vue";
import { DateTime } from "luxon";
import type { IUser } from "~/types/IUser";

const props = defineProps<{
  user: IUser;
}>();

const date = DateTime.fromISO(props.user.created_at, { zone: "utc" });
const formattedDate = date.setLocale("ru").toFormat("d MMMM yyyy");
</script>

<template>
  <ClientOnly>
    <HoverCard>
      <HoverCardTrigger as-child>
        <NuxtLink
          :to="{ name: 'other-profile', params: { id: user.id } }"
          class="hover:underline text-black dark:!text-white"
        >
          <slot name="title"></slot>
        </NuxtLink>
      </HoverCardTrigger>
      <HoverCardContent class="w-80">
        <NuxtLink
          class="flex space-x-4"
          :to="{ name: 'other-profile', params: { id: user.id } }"
        >
          <v-avatar
            size="40"
            :image="User.store.userPhotoUrl(user.avatar, user.first_name)"
          />
          <div class="space-y-1">
            <h4 class="text-sm font-semibold">
              {{ [user.surname, user.first_name].join(" ") }}
            </h4>
            <p class="text-sm">
              {{ user.description }}
            </p>
            <div class="flex items-center pt-2">
              <CalendarIcon class="mr-2 h-4 w-4 opacity-70" />
              <span class="text-xs text-muted-foreground">
                {{ "Присоединил" + (user.gender != 2 ? "ся" : "ась") }}
                {{ formattedDate }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </HoverCardContent>
    </HoverCard>
  </ClientOnly>
</template>
