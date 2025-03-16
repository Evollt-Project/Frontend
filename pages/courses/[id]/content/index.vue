<script setup lang="ts">
import type { IModule } from "~/types/Module/IModule";

definePageMeta({
  layout: "course-sidebar",
  name: "course-content",
});

const route = useRoute();
const modules: Ref<IModule[]> = ref([]);
const editContent = ref(false);

const getModules = async () => {
  await Module.getCourseModules({
    article_id: Number(route.params.id),
  }).then((response) => {
    modules.value = response.data;
  });
};
onMounted(async () => {
  await getModules();
});
</script>

<template>
  <div class="courses-create sidebar-content">
    <h1 class="text-4xl font-bold mb-4">Программа курса</h1>
    <div class="mt-5">
      <div v-if="!editContent">
        <div class="mb-5">
          В курсе пока что нет ни одного урока.
          <br />
          Добавьте свой первый урок в редакторе содержания курса.
        </div>
        <MyButton class="text-lg h-full" @click="editContent = true">
          Редактировать содержимое
        </MyButton>
      </div>
      <div class="mt-5">
        <ModuleList
          :modules="modules"
          :status="editContent ? 'edit' : undefined"
          @reload-modules="getModules"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
