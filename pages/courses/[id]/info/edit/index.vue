<script setup lang="ts">
import type { IArticle } from "~/types/Article/IArticle";
import type { ArticleId, IArticlePayloadEdit } from "~/types/Article/type";
import { LevelEnum } from "~/types/Level/LevelEnum";

definePageMeta({
  layout: "course-sidebar",
  name: "course-info-edit",
});
const loading = ref(false);
const loadingCourse = ref(false);
const route = useRoute();
const router = useRouter();
const isCourseEditFormValid: Ref<boolean> = ref(false);
const articleId: Ref<ArticleId> = ref(0);
const data: Ref<IArticlePayloadEdit> = ref({
  id: Number(route.params["id"]),
  level_id: 1,
  language_id: 1,
});
const teacherAddModal = ref(false);
const article: Ref<IArticle | null> = ref(null);
const placeholder = ref({
  short_content:
    "Видно в поиске и на промостранице сразу после названия курса. Входит в предпросмотр опубликованной в соцсетях ссылки на курс.",
  what_learn_content: `
    <div class="mb-3">
      Перечислите ожидаемые результаты обучения - что будут знать и
      уметь учащиеся после успешного освоения курса.
    </div>
    Вам могут помочь глаголы учебных целей таксономии Блума:
    применять, разрабатывать, строить, сравнивать и т.д.
  `,
  about_content: `
    <div class="mb-3">
      Вам могут помочь глаголы учебных целей таксономии Блума:
      применять, разрабатывать, строить, сравнивать и т.д. Всё, что
      важно знать учащимся до записи на курс.
      <br />
      Расскажите о:
    </div>
    <ul class="list-disc list-inside">
      <li>цели курса,</li>
      <li>почему стоит выбрать именно его,</li>
      <li>что приобретут учащиеся после его успешного освоения,</li>
      <li>какие особенности есть у курса,</li>
      <li>что нужно будет делать,</li>
      <li>какие разделы и задания входят в курс.</li>
    </ul>
  `,
  for_who_content:
    "Перечислите сегменты целевой аудитории - для кого курс предназначен и кому будет полезен. Опишите жизненные ситуации, когда возникает потребность в изучении вашей темы.",
  start_content:
    "Что нужно знать и уметь до старта, чтобы курс не оказался слишком сложным или слишком простым.",
  how_learn_content: `
      <div class="mb-3">
        Что и как нужно будет делать, что входит в курс.
      </div>
      Например: видео-лекции, практические задания и тесты на усвоение материала с автоматической проверкой, поддержка преподавателей, обратная связь от однокурсников, выпускной экзамен или проектная работа.
  `,
  what_give_content: `
    <div class="mb-3">
      Например:
    </div>
    <ul class="list-disc list-inside">
      <li>навыки и знания, востребованные работодателем,</li>
      <li>возможность отработать теорию на практике,</li>
      <li>доступ к форуму решений,</li>
      <li>поддержку наставников, которые отвечают в течение дня,</li>
      <li>сертификат,</li>
      <li>проекты в портфолио.</li>
    </ul>
  `,
});

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    updateArticlePicture({
      // @ts-ignore
      avatar: file,
    });
  }
};

const getArticle = async () => {
  loadingCourse.value = true;
  await Article.get({ id: Number(route.params["id"]) }).then((response) => {
    if (!response) return;

    articleId.value = response.data.id;
    data.value = {
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
      teachers_id: response.data.teachers.map((item) => item.id),
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
    default:
      return "#5cda48";
  }
});

const editCourse = async () => {
  await Article.edit(articleId.value, data.value).then(() => {});
};

const updateArticlePicture = async (dataAvatarObject: IArticlePayloadEdit) => {
  await Article.edit(articleId.value, dataAvatarObject).then((response) => {
    data.value.avatar = response.data.avatar;
  });
};
</script>

<template>
  <div>
    <div v-if="User.store.user && User.store.enums && article">
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
        <v-form v-model="isCourseEditFormValid" class="grid gap-5">
          <label class="flex justify-center">
            <div class="avatar flex">
              <v-avatar
                size="144"
                :image="
                  User.store.userPhotoUrl(data.avatar as string, data.title)
                "
              />
              <div
                class="avatar-edit cursor-pointer justify-center items-center"
              >
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
              :rules="Rule.getMinAndMaxLengthAndRequired(64)"
              :disabled="loading"
              rounded="lg"
              label="Название курса"
              prepend-inner-icon="mdi-format-title"
              variant="outlined"
              density="comfortable"
            >
              <template #details>{{ data.title?.length ?? 0 }}/64</template>
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
              <label for="short-content" class="font-bold text-xl">
                Краткое описание
              </label>
              <Support>
                Видно в поиске и на промостранице сразу после названия курса.
                Входит в предпросмотр опубликованной в соцсетях ссылки на курс.
              </Support>
            </div>
            <v-textarea
              v-model="data.short_content"
              id="short-content"
              :rules="Rule.getMinAndMaxLengthAndRequired(500, 100)"
              :disabled="loading"
              rounded="lg"
              :label="placeholder.short_content"
              prepend-inner-icon="mdi-format-title"
              variant="outlined"
              density="comfortable"
              messages="Для публикации нужно больше 100 символов"
            >
              <template #details>
                {{ data.short_content?.length ?? 0 }}/500
              </template>
            </v-textarea>
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
          <div class="grid gap-3">
            <div class="flex gap-3 items-center">
              <label for="short-what-learn-content" class="font-bold text-xl">
                Чему вы научитесь
              </label>
              <Support>
                <template #default>
                  <div v-html="placeholder.what_learn_content"></div>
                </template>
              </Support>
            </div>
            <v-textarea
              v-model="data.what_learn_content"
              id="short-what-learn-content"
              :rules="Rule.getMinAndMaxLengthAndRequired(500, 100)"
              :disabled="loading"
              rounded="lg"
              prepend-inner-icon="mdi-format-title"
              variant="outlined"
              density="comfortable"
            >
              <template #label>
                Перечислите ожидаемые результаты обучения
              </template>
              <template #details>
                {{ data.what_learn_content?.length ?? 0 }}/500
              </template>
            </v-textarea>
          </div>
          <div class="grid gap-3">
            <div class="flex gap-3 items-center">
              <label for="short-description" class="font-bold text-xl">
                О курсе
              </label>
              <Support>
                <div v-html="placeholder.about_content"></div>
              </Support>
            </div>
            <MyMdEditor
              :text="data.about_content"
              :max-length="500"
              @update:text="data.about_content = $event"
            />
          </div>
          <div class="grid gap-3">
            <div class="flex gap-3 items-center">
              <label for="for-who-content" class="font-bold text-xl">
                Для кого этот курс
              </label>
              <Support>
                <div v-html="placeholder.for_who_content"></div>
              </Support>
            </div>
            <v-textarea
              v-model="data.for_who_content"
              id="for-who-content"
              :rules="Rule.getMinAndMaxLengthAndRequired(500, 100)"
              :disabled="loading"
              :label="placeholder.for_who_content"
              rounded="lg"
              prepend-inner-icon="mdi-format-title"
              variant="outlined"
              density="comfortable"
            >
              <template #details>
                {{ data.for_who_content?.length ?? 0 }}/500
              </template>
            </v-textarea>
          </div>
          <div class="grid gap-3">
            <div class="flex gap-3 items-center">
              <label for="short-description" class="font-bold text-xl">
                Начальные требования
              </label>
              <Support>
                {{ placeholder.start_content }}
              </Support>
            </div>
            <MyMdEditor
              :text="data.start_content"
              :max-length="500"
              @update:text="data.start_content = $event"
            />
          </div>
          <div class="grid gap-3">
            <div class="flex gap-3 items-center">
              <label for="short-description" class="font-bold text-xl">
                Как проходит обучение
              </label>
              <Support>
                <div v-html="placeholder.how_learn_content"></div>
              </Support>
            </div>
            <MyMdEditor
              :text="data.how_learn_content"
              :max-length="500"
              @update:text="data.how_learn_content = $event"
            />
          </div>
          <div class="grid gap-3">
            <div class="flex gap-3 items-center">
              <label for="what-give-content" class="font-bold text-xl">
                Что вы получите
              </label>
              <Support>
                <div v-html="placeholder.what_give_content"></div>
              </Support>
            </div>
            <v-textarea
              v-model="data.what_give_content"
              id="what-give-content"
              :rules="Rule.getMinAndMaxLengthAndRequired(500)"
              :disabled="loading"
              rounded="lg"
              prepend-inner-icon="mdi-format-title"
              variant="outlined"
              density="comfortable"
              messages="Каждый пункт с новой строки"
            >
              <template #label>
                Напишите что получат студенты после обучения
              </template>
              <template #details>
                {{ data.what_give_content?.length ?? 0 }}/500
              </template>
            </v-textarea>
          </div>
          <div class="grid gap-3">
            <div class="flex gap-3 items-center">
              <label for="short-description" class="font-bold text-xl">
                Сертификат
              </label>
            </div>
            <!-- TODO: Выбор и сохранение сертификата к курсу -->

            <div v-if="article.teachers" class="grid gap-3">
              <div class="grid gap-3">
                <h4 class="font-bold text-xl"> Наши преподаватели </h4>
                <p>
                  Показываются на промостранице, но это не дает им прав на
                  управление курсом. Чтобы выдать права, перейдите в раздел
                  «Права доступа» настроек курса.
                </p>
              </div>
              <div>
                <ArticleTeacherItem
                  v-for="teacher in article.teachers"
                  :key="teacher.id"
                  :item="teacher"
                />
              </div>
              <div class="flex gap-3">
                <MyButton @click="teacherAddModal = true">
                  Добавить преподавателя
                </MyButton>
                <ModalsTeacherAdd
                  :dialog="teacherAddModal"
                  @update:dialog="teacherAddModal = $event"
                />
              </div>
            </div>
          </div>
          <div
            class="mt-5 flex flex-col-reverse sm:flex-row sm:justify-end gap-4"
          >
            <MyButton @click="router.push({ name: 'course-info' })">
              Отмена
            </MyButton>
            <MyButton color="success" @click="editCourse"> Сохранить</MyButton>
          </div>
        </v-form>
      </div>
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
    transition:
      opacity 0.3s ease-in-out,
      transform 0.3s ease-in-out;
  }

  &:hover .avatar-edit {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
