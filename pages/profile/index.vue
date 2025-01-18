<script setup lang="ts">
import type { ITag } from "~/types/ITag";

definePageMeta({
  name: "profile",
  layout: "sidebar",
});

const settingsSidebar: Ref<boolean> = ref(false);
const roles: Ref<ITag[]> = ref([
  {
    title: "Ученик",
    description:
      "Дефолтный статус пользователя wofjoew owej ojefo jeofj oj ofjofj ojefo jfje ojefo jfojeof jofjeow jeofj ofejo",
  },
  {
    title: "Администратор",
  },
]);

const skills: Ref<ITag[]> = ref([
  {
    title: "Умение",
  },
]);
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
                [
                  User.store.user.surname,
                  User.store.user.first_name,
                  ,
                  User.store.user.last_name,
                ].join(" ")
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
          <ProfileTagList :items="skills" />
        </div>
        <div class="profile-content__description">
          Обучил более 15000 студентов по всему миру на своих авторских онлайн
          курсах. Более 6000 реальных отзывов со средней оценкой 4,83 из 5.00! Я
          преподаю веб дизайн, веб разработку и необходимое ПО (Photoshop
          Illustrator, Figma). Мой опыт преподавания складывается из 5 лет
          репетиторства на фрилансе, а так- же преподавания через онлайн школы и
          курсы, на мировых площадках по дистанционному обучению. Студенты моих
          курсов, отмечают лучшие мои качества в том, как я преподаю материал
          без зубрежки, весело и интересно.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
