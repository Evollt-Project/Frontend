<script setup lang="ts">
import type { IArticle } from "~/types/Article/IArticle";
import type { IArticlePayloadEdit } from "~/types/Article/type";

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
});

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

    data.value = response.data;
    loadingCourse.value = false;
  });
};

onMounted(async () => {
  await getArticle();
});
</script>

<template>
  <div v-if="User.store.user">
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
          <label for="" class="font-bold text-xl">Название</label>
          <v-text-field
            :rules="Rule.getMaxLengthAndRequired(64)"
            :disabled="loading"
            v-model="data.title"
            rounded="lg"
            label="Название"
            prepend-inner-icon="mdi-format-title"
            variant="outlined"
            density="comfortable"
          ></v-text-field>
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
