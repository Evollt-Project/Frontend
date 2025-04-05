<script setup lang="ts">
definePageMeta({
  name: "courses-create",
  layout: "sidebar",
});
const isFormValid = ref(false);
const router = useRouter();
const course = ref({
  title: "",
});

const createCourse = () => {
  Article.create(course.value).then((response) => {
    router.push({
      name: "course-content",
      params: {
        id: response?.data.id,
      },
    });
  });
};
</script>

<template>
  <div class="courses-create sidebar-content">
    <h1 class="text-4xl font-bold mb-4">Создание нового курса</h1>
    <div class="courses-create__container md:flex grid gap-5">
      <div class="courses-create__left w-full">
        <v-form fast-fail v-model="isFormValid" @submit.prevent>
          <v-text-field
            v-model="course.title"
            class="mb-6"
            rounded="lg"
            :rules="Rule.getMinAndMaxLengthAndRequired(64)"
            label="Название курса"
            variant="outlined"
            density="compact"
          >
            <template #details> {{ course.title.length }}/64</template>
          </v-text-field>
          <MyButton
            class="text-lg h-full w-full sm:w-auto"
            type="submit"
            @click="createCourse"
          >
            Создать курс
          </MyButton>
        </v-form>
        <div class="mt-4">
          Начните работу над черновиком курса, перед публикацией можно будет
          <NuxtLink class="underline">сделать курс платным</NuxtLink>
          или оставить бесплатным.
        </div>
      </div>
      <div class="courses-create__right sm:min-w-80 grid gap-5">
        <div
          class="!border-black dark:!border-neutral-600 rounded-lg border p-4"
        >
          <div class="mb-2">Подробнее про создание курса:</div>
          <ul class="grid gap-3">
            <li>
              <NuxtLink class="text-blue-400">
                Документация
                <v-icon icon="mdi-open-in-new"></v-icon>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="text-blue-400">
                О платных курсах
                <v-icon icon="mdi-open-in-new"></v-icon>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div
          class="!border-black dark:!border-neutral-600 rounded-lg border p-4"
        >
          <div class="mb-2">Наши курсы для авторов:</div>
          <ul class="grid gap-3">
            <li>
              <NuxtLink class="text-blue-400">
                Создание курса
                <v-icon icon="mdi-open-in-new"></v-icon>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="text-blue-400">
                Создание платного курса
                <v-icon icon="mdi-open-in-new"></v-icon>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="text-blue-400">
                Типы и примеры заданий
                <v-icon icon="mdi-open-in-new"></v-icon>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="text-blue-400">
                Подборка курсов для педагогов
                <v-icon icon="mdi-open-in-new"></v-icon>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
