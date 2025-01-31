<script setup lang="ts">
import type { ITag } from "~/types/ITag";

definePageMeta({
  name: "profile",
  layout: "sidebar",
});

const settingsSidebar: Ref<boolean> = ref(false);
const roles: Ref<ITag[]> = ref([]);

onMounted(() => {
  if (User.store.enums) {
    User.getAllPermissions().forEach((item) => {
      if (User.store.enums) {
        roles.value.push({
          title: User.store.enums.roles[item],
        });
      }
    });
  }
});
</script>

<template>
  <div class="profile" v-if="User.store.user">
    <SettingsSidebar
      :drawer="settingsSidebar"
      @drawer="(e) => (settingsSidebar = e)"
    />
    <div class="sidebar-content">
      <div class="flex justify-between">
        <h1 class="text-4xl font-bold mb-4">Мой профиль</h1>
        <MyButton
          @click="settingsSidebar = !settingsSidebar"
          prepend-icon="mdi-cog-outline"
        >
          Настройки
        </MyButton>
      </div>
      <div class="profile-content">
        <div class="profile-content__info flex gap-7 items-center">
          <div class="profile-content__left">
            <v-avatar
              size="100"
              :image="
                User.store.userPhotoUrl(
                  User.store.user.avatar,
                  User.store.user.first_name
                )
              "
            />
          </div>
          <div class="profile-content__right grid gap-2 mb-2">
            <div class="profile-content__title text-2xl font-bold">
              {{
                [User.store.user.surname, User.store.user.first_name].join(" ")
              }}
            </div>
            <div class="profile-content__other">
              <div>Должность (post)</div>
              <div>Email: {{ User.store.user.email }}</div>
            </div>
            <div class="profile-content__roles">
              <ProfileTagList :items="roles" />
            </div>
          </div>
        </div>
        <NuxtLink :to="{ name: 'settings-profile' }" class="flex items-center">
          <v-icon icon="mdi-account-edit-outline"></v-icon> Редактировать
          профиль
        </NuxtLink>
        <div class="profile-content__skills my-5">
          <ProfileTagList :items="User.store.user.skills" />
        </div>
        <div class="profile-content__description">
          {{ User.store.user.description ?? "" }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
