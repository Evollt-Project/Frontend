<script setup lang="ts">
definePageMeta({
  layout: "course-sidebar",
  name: "course-content",
});
</script>

<template>
  <div class="courses-create sidebar-content">
    <h1 class="text-4xl font-bold mb-4">Программа курса</h1>
    <div class="mt-5">
      <div>
        В курсе пока что нет ни одного урока.
        <br />
        Добавьте свой первый урок в редакторе содержания курса.
      </div>
      <MyButton class="text-lg h-full"> Редактировать содержимое </MyButton>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
