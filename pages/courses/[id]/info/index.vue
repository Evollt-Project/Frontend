<script setup lang="ts">
definePageMeta({
  layout: "course-sidebar",
  name: "course-info",
});
const router = useRouter();
</script>

<template>
  <div class="sidebar-content mb-16">
    <h1 class="text-4xl font-bold mb-5">О курсе</h1>
    <div>
      <div>
        <div class="mt-5 flex flex-col sm:flex-row sm:justify-between gap-4">
          <MyButton
            prepend-icon="mdi-pencil"
            class="text-lg h-full"
            @click="router.push({ name: 'course-info-edit' })"
          >
            Редактировать описание
          </MyButton>

          <MyButton prepend-icon="mdi-bullhorn" class="text-lg h-full">
            Открыть промостраницу
          </MyButton>
        </div>
      </div>
      <div class="mt-5">
        <p>
          Добавьте информативное описание, чтобы учащимся было проще выбрать
          курс.
        </p>
        <NuxtLink :to="{ name: 'profile' }" class="text-blue-400 mt-3 block">
          Советы по оформлению промостраницы
          <v-icon icon="mdi-open-in-new"></v-icon>
        </NuxtLink>
      </div>
      <div class="mt-5">
        <!-- <ModuleList :modules="modules" @reload-modules="getModules" /> -->
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
