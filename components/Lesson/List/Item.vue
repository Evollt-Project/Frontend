<script setup lang="ts">
import type { ILesson } from "~/types/Lesson/ILesson";

const props = defineProps<{
  item: ILesson;
}>();
const emits = defineEmits(["reload-modules"]);
const loading: Ref<boolean> = ref(false);
const edit: Ref<boolean> = ref(false);
const item: Ref<ILesson> = ref(props.item);
// TODO: Доделать изменение урока
const initialItem: Ref<ILesson> = ref(props.item);

const isCanEdit = computed(() => {
  return Module.store.isEditContent;
});

const deleteLesson = async (id: number) => {
  loading.value = true;
  await Lesson.delete(id, {});

  emits("reload-modules");
  loading.value = false;
};
const editLesson = () => {};
</script>

<template>
  <li>
    <div class="flex justify-between">
      <div class="flex gap-5 items-center">
        <v-icon v-if="isCanEdit" icon="mdi-menu" class="handle" />
        <v-icon
          v-if="!isCanEdit"
          icon="mdi-pencil-outline"
          class="handle cursor-pointer"
          @click="edit = true"
        />

        <div v-if="edit" class="w-full">
          <v-text-field
            v-model="item.title"
            :rules="Rule.getRequired()"
            hide-details="auto"
            rounded="lg"
            label="Название"
            variant="outlined"
            density="compact"
          />
        </div>
        <div v-else>
          <span>{{ item.title }} </span>
        </div>
      </div>

      <MyButton
        v-if="isCanEdit || edit"
        variant="text"
        :disabled="loading"
        :loading="loading"
        @click="deleteLesson(item.id)"
      >
        <v-icon icon="mdi-delete-outline"></v-icon>
      </MyButton>
    </div>
  </li>
</template>

<style scoped lang="scss"></style>
