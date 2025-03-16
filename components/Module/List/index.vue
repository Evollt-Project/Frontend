<script setup lang="ts">
import { DateTime } from "luxon";
import type { IModule } from "~/types/Module/IModule";

const props = defineProps<{
  modules: IModule[];
  status?: "edit";
}>();
const emits = defineEmits(["reload-modules"]);

const isCanEdit = computed(() => {
  return props.status == "edit" ? true : false;
});
const route = useRoute();

const createModule = async () => {
  await Module.create({
    title: "Новый модуль",
    description: "",
    article_id: Number(route.params.id),
    opened_date: DateTime.now().toFormat("yyyy-MM-dd"),
  });

  emits("reload-modules");
};
</script>

<template>
  <div>
    <div class="module-list grid gap-5">
      <ModuleListItem
        v-for="(module, index) in modules"
        :key="module.id"
        :module="module"
        :index="index + 1"
        :status="status"
        @reload-modules="emits('reload-modules')"
      />
    </div>
    <div v-if="isCanEdit">
      <div v-if="modules.length == 0" class="flex justify-center">
        <i>
          В курсе пока нет ни одного урока. Создайте первый модуль, чтобы
          добавить уроки
        </i>
      </div>
      <div class="mt-5">
        <MyButton @click="createModule">
          <v-icon icon="mdi-plus"></v-icon>
          Новый модуль
        </MyButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
