<script setup lang="ts">
import type { IModule } from "~/types/Module/IModule";
import type { IModulePayloadEdit } from "~/types/Module/type";

const props = defineProps<{
  module: IModule;
  index: number;
}>();
const emits = defineEmits(["reload-modules"]);

const isCanEdit = computed(() => {
  return Module.store.isEditContent;
});
const route = useRoute();
const initialNewModule: Ref<IModulePayloadEdit> = ref({
  title: props.module.title,
  description: props.module.description,
  article_id: Number(route.params.id),
});
const newModule: Ref<IModulePayloadEdit> = ref({ ...initialNewModule.value });
const isFormValid = ref(false);

const deleteModule = async () => {
  await Module.delete({
    id: props.module.id,
  });
  emits("reload-modules");
};

const editModule = async () => {
  await Module.edit(props.module.id, newModule.value).then((response) => {
    const data = response.data;
    const newValue = {
      title: data.title,
      description: data.description,
      article_id: Number(route.params.id),
    };

    initialNewModule.value = newValue;
    newModule.value = structuredClone(newValue);
    emits("reload-modules");
  });
};

const rejectChanges = () => {
  newModule.value = { ...initialNewModule.value };
};

const isFormButtonsDisabled = computed(() => {
  return isEqual(newModule.value, initialNewModule.value) || !isFormValid.value;
});
</script>

<template>
  <div>
    <div
      class="border-black dark:border-white border sm:rounded-br-none sm:rounded-2xl rounded-t-2xl p-5 flex gap-3 items-center"
    >
      <v-form v-model="isFormValid" class="w-full grid gap-3" @submit.prevent>
        <div class="flex justify-between items-center gap-3">
          <div v-if="isCanEdit" class="w-full">
            <v-text-field
              v-model="newModule.title"
              :rules="Rule.getRequired()"
              hide-details="auto"
              rounded="lg"
              label="Название"
              variant="outlined"
              density="compact"
            />
          </div>
          <div v-else>
            <h3>{{ module.title }}</h3>
          </div>

          <v-menu transition="scale-transition">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-dots-vertical"
                variant="text"
                hide-details
                class="dark:text-white"
                :ripple="false"
              ></v-btn>
            </template>

            <v-list>
              <v-list-item class="cursor-pointer">
                <v-list-item-title @click="Module.store.isEditContent = true">
                  Редактировать
                </v-list-item-title>
              </v-list-item>
              <v-list-item class="cursor-pointer">
                <v-list-item-title @click="deleteModule">
                  Удалить
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div class="w-full grid gap-2">
          <div>
            <v-textarea
              v-if="isCanEdit"
              v-model="newModule.description"
              hide-details
              rounded="lg"
              label="Описание"
              variant="outlined"
              density="comfortable"
            />
            <p v-else-if="module.description && !isCanEdit">
              {{ module.description }}
            </p>
          </div>
          <p>
            Открыт с
            <strong>
              {{ FormatDate.localeString(new Date(module.created_at)) }}
            </strong>
          </p>
          <div v-if="isCanEdit" class="flex gap-5">
            <MyButton
              type="submit"
              :disabled="isFormButtonsDisabled"
              color="success"
              @click="editModule"
            >
              Сохранить
            </MyButton>
            <MyButton :disabled="isFormButtonsDisabled" @click="rejectChanges">
              Отменить
            </MyButton>
          </div>
        </div>
      </v-form>
    </div>
    <div
      class="rounded-2xl border-black dark:border-white border border-t-0 sm:ml-24 rounded-t-none p-5 flex gap-3 items-center"
    >
      <LessonList :module="module" @reload-modules="emits('reload-modules')" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
