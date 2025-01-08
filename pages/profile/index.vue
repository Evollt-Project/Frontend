<script setup lang="ts">
definePageMeta({
  name: "profile",
  layout: "sidebar",
});
</script>

<template>
  <div class="profile flex gap-5 px-14" v-if="User.store.user">
    <div class="profile-left">
      <v-avatar
        class="rounded-xl"
        size="150"
        :image="
          User.store.userPhotoUrl(
            User.store.user.avatar,
            User.store.user.first_name,
          )
        "
      />
      <div>
        <v-icon icon="mdi-account-outline"></v-icon>
        0 подписчиков
      </div>
      <div>
        <v-icon icon="mdi-account-outline"></v-icon>
        9 знания
      </div>
    </div>
    <div class="profile-right">
      <div class="profile-right__title text-4xl font-bold">
        {{
          [
            User.store.user.surname,
            User.store.user.first_name,
            ,
            User.store.user.last_name,
          ].join(" ")
        }}
      </div>
      <div class="profile-right__description">
        Обучил более 15000 студентов по всему миру на своих авторских онлайн
        курсах. Более 6000 реальных отзывов со средней оценкой 4,83 из 5.00! Я
        преподаю веб дизайн, веб разработку и необходимое ПО (Photoshop
        Illustrator, Figma). Мой опыт преподавания складывается из 5 лет
        репетиторства на фрилансе, а так- же преподавания через онлайн школы и
        курсы, на мировых площадках по дистанционному обучению. Студенты моих
        курсов, отмечают лучшие мои качества в том, как я преподаю материал без
        зубрежки, весело и интересно.
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
