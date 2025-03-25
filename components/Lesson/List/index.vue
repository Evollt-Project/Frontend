<script setup lang="ts">
import type { ILessonPayloadCreate } from "~/types/Lesson/type";
import type { IModule } from "~/types/Module/IModule";

const props = defineProps<{
  module: IModule;
}>();
const emits = defineEmits(["reload-modules"]);

const newLesson = ref<ILessonPayloadCreate>({
  title: "",
  module_id: props.module.id,
});
const isFormValid: Ref<boolean> = ref(false);
const form: Ref<HTMLFormElement | null> = ref(null);
const loading: Ref<boolean> = ref(false);

const isCanEdit = computed(() => {
  return Module.store.isEditContent;
});

const createLesson = async () => {
  loading.value = true;
  await Lesson.create(newLesson.value);
  if (form.value) {
    newLesson.value.title = "";
    form.value.reset();
  }

  emits("reload-modules");
  loading.value = false;
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
        <LessonListItem
          :item="element"
          @reload-modules="emits('reload-modules')"
        />
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
            :disabled="loading"
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
            :loading="loading"
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
