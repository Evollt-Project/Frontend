<script setup lang="ts">
import type { ILesson } from "~/types/Lesson/ILesson";

const props = defineProps<{
  item: ILesson;
}>();
const emits = defineEmits(["reload-modules"]);
const loading: Ref<boolean> = ref(false);
const initialItem: Ref<ILesson> = ref(props.item);
const item: Ref<ILesson> = ref({ ...initialItem.value });
const isFormValid = ref(false);
const editItemLoading = ref(false);

const isCanEdit = computed(() => {
  return Module.store.isEditContent;
});

const deleteLesson = async (id: number) => {
  loading.value = true;
  await Lesson.delete(id, {});

  emits("reload-modules");
  loading.value = false;
};
const editLesson = async () => {
  editItemLoading.value = true;
  await Lesson.edit(item.value).then((response) => {
    item.value = response.data;
    initialItem.value = structuredClone(response.data);
    emits("reload-modules");
  });
  editItemLoading.value = false;
};

const rejectChanges = () => {
  item.value = { ...initialItem.value };
};
const isFormButtonsDisabled = computed(() => {
  return isEqual(item.value, initialItem.value) || !isFormValid.value;
});
</script>

<template>
  <li>
    <v-form v-model="isFormValid" @submit.prevent>
      <div class="flex justify-between gap-5 items-center mb-3">
        <v-icon v-if="isCanEdit" icon="mdi-menu" class="handle" />
        <div v-if="!isCanEdit">
          <div class="flex gap-5">
            <v-icon
              icon="mdi-pencil-outline"
              class="handle cursor-pointer"
              @click="Module.store.isEditContent = true"
            />
            <span>{{ item.title }} </span>
          </div>
        </div>

        <div v-if="isCanEdit" class="w-full">
          <v-text-field
            v-model="item.title"
            :rules="Rule.getRequired()"
            class="w-full"
            hide-details="auto"
            rounded="lg"
            label="Название"
            variant="outlined"
            density="compact"
          />
        </div>

        <MyButton
          v-if="isCanEdit"
          class="!min-w-fit"
          variant="text"
          :disabled="loading"
          :loading="loading"
          @click="deleteLesson(item.id)"
        >
          <v-icon icon="mdi-delete-outline"></v-icon>
        </MyButton>
      </div>
      <div v-if="isCanEdit" class="flex gap-5">
        <MyButton
          type="submit"
          :disabled="isFormButtonsDisabled"
          :loading="editItemLoading"
          color="success"
          @click="editLesson"
        >
          Сохранить
        </MyButton>
        <MyButton :disabled="isFormButtonsDisabled" @click="rejectChanges">
          Отменить
        </MyButton>
      </div>
    </v-form>
  </li>
</template>

<style scoped lang="scss"></style>
