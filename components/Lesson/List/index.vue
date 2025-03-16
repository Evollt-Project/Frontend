<script setup lang="ts">
import type { ILessonPayloadCreate } from "~/types/Lesson/type";
import type { IModule } from "~/types/Module/IModule";

const props = defineProps<{
  status?: "edit";
  module: IModule;
}>();
const emits = defineEmits(["reload-modules"]);

const newLesson = ref<ILessonPayloadCreate>({
  title: "",
  module_id: props.module.id,
});
const isFormValid = ref(false);
const form: Ref<HTMLFormElement | null> = ref(null);

const isCanEdit = computed(() => {
  return props.status == "edit" ? true : false;
});

const deleteLesson = async (id: number) => {
  await Lesson.delete(id, {});

  emits("reload-modules");
};
const editLesson = () => {};

const createLesson = async () => {
  await Lesson.create(newLesson.value);
  if (form.value) {
    newLesson.value.title = "";
    form.value.reset();
  }

  emits("reload-modules");
};
</script>

<template>
  <div class="w-full">
    <div v-if="module.lessons.length == 0" class="mb-8">
      <div>Пока нет уроков</div>
    </div>
    <draggable
      v-bind="{
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      }"
      :list="module.lessons"
      tag="ul"
      item-key="id"
      handle=".handle"
      class="list-group grid gap-8"
    >
      <template #item="{ element }">
        <li class="flex justify-between">
          <div class="flex gap-5">
            <v-icon v-if="isCanEdit" icon="mdi-menu" class="handle"></v-icon>

            <span>{{ element.title }} </span>
          </div>

          <v-icon
            icon="mdi-delete-outline"
            @click="deleteLesson(element.id)"
          ></v-icon>
        </li>
      </template>

      <template v-if="isCanEdit" #footer>
        <v-form
          v-model="isFormValid"
          ref="form"
          class="flex gap-5"
          @submit.prevent
        >
          <v-text-field
            v-model="newLesson.title"
            :rules="Rule.getRequired()"
            rounded="lg"
            label="Название урока"
            variant="outlined"
            density="compact"
          >
            <template #details> {{ User.store.user?.first_name }} </template>
          </v-text-field>
          <MyButton
            :density="undefined"
            type="submit"
            :disabled="!isFormValid"
            color="success"
            @click="createLesson"
          >
            <v-icon icon="mdi-plus"></v-icon>
            Создать урок
          </MyButton>
        </v-form>
      </template>
    </draggable>
  </div>
</template>

<style scoped lang="scss"></style>
