<script setup lang="ts">
import type { IArticle } from "~/types/Article/IArticle";
import type { IArticlePayloadEdit } from "~/types/Article/type";
import { LevelEnum } from "~/types/Level/LevelEnum";

definePageMeta({
  layout: "course-sidebar",
  name: "course-info-edit",
});
const previewImage: Ref<string | null> = ref(null);
const loading = ref(false);
const loadingCourse = ref(false);
const route = useRoute();
const data: Ref<IArticlePayloadEdit> = ref({
  id: Number(route.params.id),
  level_id: 1,
  language_id: 1,
});
const article: Ref<IArticle | null> = ref(null);
const SHORT_DESCRIPTION =
  "Видно в поиске и на промостранице сразу после названия курса. Входит в предпросмотр опубликованной в соцсетях ссылки на курс.";

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    previewImage.value = URL.createObjectURL(file);
    // @ts-ignore
    data.value.avatar = file;
  }
};

const getArticle = async () => {
  loadingCourse.value = true;
  await Article.get({ id: Number(route.params.id) }).then((response) => {
    if (!response) return;

    data.value = {
      id: response.data.id,
      title: response.data.title,
      avatar: response.data.avatar,
      level_id: response.data.level.id,
      language_id: response.data.language.id,
      short_content: response.data.short_content,
      what_learn_content: response.data.what_learn_content,
      about_content: response.data.about_content,
      for_who_content: response.data.for_who_content,
      start_content: response.data.start_content,
      how_learn_content: response.data.how_learn_content,
      what_give_content: response.data.what_give_content,
      recommended_load: response.data.recommended_load,
    };
    article.value = response.data;
    loadingCourse.value = false;
  });
};

onMounted(async () => {
  await getArticle();
});

const levelFillColor = computed(() => {
  switch (data.value.level_id) {
    case LevelEnum.BEGINNER:
      return "#5cda48"; // зеленый
    case LevelEnum.ADVANCED:
      return "#fe9c15"; // оранжевый
    case LevelEnum.PRO:
      return "#e11b1c"; // красный
  }
});
</script>

<template>
  <div v-if="User.store.user && User.store.enums">
    <div
      v-if="loadingCourse"
      class="flex h-screen-minus-70 items-center justify-center"
    >
      <v-progress-circular
        :size="70"
        :width="7"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-else class="sidebar-content mb-16">
      <h1 class="text-4xl font-bold mb-5">О курсе</h1>
      <v-form class="grid gap-5">
        <label class="flex justify-center">
          <div class="avatar flex">
            <v-avatar size="144" v-if="previewImage" :image="previewImage" />
            <v-avatar
              v-else
              size="144"
              :image="User.store.userPhotoUrl(data.avatar as string, data.title)"
            />
            <div class="avatar-edit cursor-pointer justify-center items-center">
              <div class="w-20 rounded-full border-white border-2 p-5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    fill="#ffffff"
                    d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
                  />
                </svg>
              </div>
            </div>
            <input
              type="file"
              class="hidden"
              accept="image/png, image/jpg, image/jpeg"
              id="companyPhoto"
              @change="handleFileChange"
            />
          </div>
        </label>
        <div class="grid gap-3">
          <label for="title" class="font-bold text-xl">Название курса</label>
          <v-text-field
            v-model="data.title"
            id="title"
            :rules="Rule.getMaxLengthAndRequired(64)"
            :disabled="loading"
            rounded="lg"
            label="Название курса"
            prepend-inner-icon="mdi-format-title"
            variant="outlined"
            density="comfortable"
          >
            <template #details> {{ data.title?.length ?? 0 }}/64 </template>
          </v-text-field>
        </div>
        <div class="space-y-3">
          <div class="flex gap-3 items-center">
            <label class="font-bold text-xl">Категории курса</label>
            <Support>
              <div class="mb-3 font-bold">
                Выберите до 5 категорий, к которым относится курс.
              </div>
              Проверьте доступные категории в нашей документации. Если вы не
              нашли подходящую категорию, попросите нас её добавить.
            </Support>
          </div>
          <div class="flex gap-3 items-center">
            <MyButton>Выбрать категорию</MyButton>
            <div>Выберите до 5 категорий, к которым относится курс</div>
          </div>
        </div>
        <div class="grid gap-3">
          <div class="flex gap-3 items-center">
            <label for="short-description" class="font-bold text-xl"
              >Краткое описание</label
            >
            <Support>
              {{ SHORT_DESCRIPTION }}
            </Support>
          </div>
          <MyMdEditor
            :text="data.short_content"
            :max-length="500"
            @update:text="data.short_content = $event"
          />
          <div
            v-if="data.short_content && data.short_content?.length >= 500"
            class="!text-red-500"
          >
            Вы ввели максимальное количество символов для этого поля
          </div>
          <!-- <v-textarea
            v-model="data.short_content"
            id="short-description"
            :rules="Rule.getMaxLengthAndRequired(500)"
            :disabled="loading"
            rounded="lg"
            :label="SHORT_DESCRIPTION"
            prepend-inner-icon="mdi-format-title"
            variant="outlined"
            density="comfortable"
          >
            <template #details>
              {{ data.short_content?.length ?? 0 }}/500
            </template>
          </v-textarea> -->
        </div>
        <div class="grid md:grid-cols-3 gap-5">
          <div class="grid gap-3">
            <label class="font-bold text-xl">Язык</label>
            <v-select
              v-model="data.language_id"
              :items="User.store.enums.languages"
              :disabled="loading"
              rounded="lg"
              item-title="title"
              item-value="id"
              label="Язык"
              prepend-inner-icon="mdi-translate"
              hide-details
              variant="outlined"
              density="comfortable"
            ></v-select>
          </div>
          <div class="grid gap-3">
            <label class="font-bold text-xl">Уровень</label>
            <v-select
              v-model="data.level_id"
              :items="User.store.enums.levels"
              :disabled="loading"
              rounded="lg"
              item-title="title"
              item-value="id"
              label="Уровень"
              hide-details
              variant="outlined"
              density="comfortable"
            >
              <template #prepend-inner>
                <IconsLevel :fill="levelFillColor" width="25" height="25" />
              </template>
            </v-select>
          </div>
          <div class="grid gap-3">
            <label for="recommended-load" class="font-bold text-xl">
              Рекомендуемая нагрузка
            </label>
            <v-text-field
              v-model="data.recommended_load"
              id="recommended-load"
              type="number"
              hide-details
              :disabled="loading"
              rounded="lg"
              label="Количество часов в неделю"
              prepend-inner-icon="mdi-format-title"
              variant="outlined"
              density="comfortable"
            />
          </div>
        </div>
      </v-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.avatar {
  position: relative;

  .avatar-edit {
    display: flex;
    position: absolute;
    width: 144px;
    height: 144px;
    border: 1px solid black;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    color: red;
    z-index: 10;

    opacity: 0;
    transform: scale(0.9);
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  }

  &:hover .avatar-edit {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
