<script setup lang="ts">
import type { ITag } from "~/types/ITag";
import type { IUser } from "~/types/IUser";

const props = defineProps<{
  user: IUser;
}>();

const settingsSidebar: Ref<boolean> = ref(false);
const roles: Ref<ITag[]> = ref([]);
const route = useRoute();

watch(
  () => User.store.enums,
  (value) => {
    User.getAllPermissions(props.user).forEach((item) => {
      if (!value) return;
      roles.value.push({
        title: value.roles[item],
      });
    });
  }
);

const canShow = computed(() => {
  if (route.params?.id) {
    return false;
  }
  if (User.store.user) {
    if (User.store.user.id == props.user.id) {
      return true;
    }
  }
  return false;
});
</script>

<template>
  <div class="profile" v-if="user">
    <SettingsSidebar
      :drawer="settingsSidebar"
      v-if="canShow"
      @drawer="(e) => (settingsSidebar = e)"
    />
    <div class="sidebar-content">
      <div class="flex justify-between" v-if="canShow">
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
              :image="User.store.userPhotoUrl(user.avatar, user.first_name)"
            />
          </div>
          <div class="profile-content__right grid gap-2 mb-2">
            <div class="profile-content__title text-2xl font-bold">
              {{ [user.surname, user.first_name].join(" ") }}
            </div>
            <div class="profile-content__other">
              <div>Должность (post)</div>
              <div>Email: {{ user.email }}</div>
            </div>
            <div class="profile-content__roles">
              <ProfileTagList :items="roles" />
            </div>
          </div>
        </div>
        <NuxtLink
          :to="{ name: 'settings-profile' }"
          v-if="canShow"
          class="flex items-center"
        >
          <v-icon icon="mdi-account-edit-outline"></v-icon> Редактировать
          профиль
        </NuxtLink>
        <div class="profile-content__skills my-5">
          <ProfileTagList :items="user.skills" />
        </div>
        <div class="profile-content__description">
          {{ user.description ?? "" }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
