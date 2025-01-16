<script setup lang="ts">
definePageMeta({
  name: "teach-courses",
  layout: "sidebar",
});
const loading: Ref<boolean> = ref(false);
const search = ref({
  field: "",
  certificates: false,
  free: false,
});

const articles = ref([
  {
    id: 1,
    title: "Hello",
    author: User.store.user,
    photo: "https://cdn.stepik.net/media/catalog_blocks/116/cover_zzco07x.png",
    students_complete: "5",
    time: "14",
    rate: "5",
    price: 5000,
  },
  {
    id: 1,
    title: "Hello",
    author: User.store.user,
    photo: "https://cdn.stepik.net/media/catalog_blocks/116/cover_zzco07x.png",
    students_complete: "5",
    time: "14",
    rate: "5",
    price: 5000,
  },
  {
    id: 1,
    title: "Hello",
    author: User.store.user,
    photo: "https://cdn.stepik.net/media/catalog_blocks/116/cover_zzco07x.png",
    students_complete: "5",
    time: "14",
    rate: "5",
    price: 5000,
  },
  {
    id: 1,
    title: "Hello",
    author: User.store.user,
    photo: "https://cdn.stepik.net/media/catalog_blocks/116/cover_zzco07x.png",
    students_complete: "5",
    time: "14",
    rate: "5",
    price: 5000,
  },
  {
    id: 1,
    title: "Hello",
    author: User.store.user,
    photo: "https://cdn.stepik.net/media/catalog_blocks/116/cover_zzco07x.png",
    students_complete: "5",
    time: "14",
    rate: "5",
    price: 5000,
  },
  {
    id: 1,
    title: "Hello",
    author: User.store.user,
    photo: "https://cdn.stepik.net/media/catalog_blocks/116/cover_zzco07x.png",
    students_complete: "5",
    time: "14",
    rate: "5",
    price: 5000,
  },
  {
    id: 1,
    title: "Hello",
    author: User.store.user,
    photo: "https://cdn.stepik.net/media/catalog_blocks/116/cover_zzco07x.png",
    students_complete: "5",
    time: "14",
    rate: "5",
    price: 5000,
  },
  {
    id: 1,
    title: "Hello",
    author: User.store.user,
    photo: "https://cdn.stepik.net/media/catalog_blocks/116/cover_zzco07x.png",
    students_complete: "5",
    time: "14",
    rate: "5",
    price: 5000,
  },
  {
    id: 1,
    title: "Hello",
    author: User.store.user,
    photo: "https://cdn.stepik.net/media/catalog_blocks/116/cover_zzco07x.png",
    students_complete: "5",
    time: "14",
    rate: "5",
    price: 5000,
  },
  {
    id: 1,
    title: "Hello",
    author: User.store.user,
    photo: "https://cdn.stepik.net/media/catalog_blocks/116/cover_zzco07x.png",
    students_complete: "5",
    time: "14",
    rate: "5",
    price: 5000,
  },
  {
    id: 1,
    title: "Hello",
    author: User.store.user,
    photo: "https://cdn.stepik.net/media/catalog_blocks/116/cover_zzco07x.png",
    students_complete: "5",
    time: "14",
    rate: "5",
    price: 5000,
  },
  {
    id: 1,
    title: "Hello",
    author: User.store.user,
    photo: "https://cdn.stepik.net/media/catalog_blocks/116/cover_zzco07x.png",
    students_complete: "5",
    time: "14",
    rate: "5",
    price: 5000,
  },
]);

const validate = () => {
  if (loading.value) {
    return true;
  }

  return false;
};
</script>

<template>
  <div class="teach-courses">
    <v-form fast-fail ref="form" class="mt-4" @submit.prevent>
      <v-text-field
        v-model="search.field"
        :disabled="loading"
        hide-details
        rounded="lg"
        label="Поиск"
        prepend-inner-icon="mdi-text-box-search"
        variant="outlined"
        density="comfortable"
      ></v-text-field>
    </v-form>
    <div class="teach-courses__list mt-[20px]">
      <ArticleCard v-for="article in articles" :article="article" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.teach-courses {
  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 20px;
  }
}
</style>
