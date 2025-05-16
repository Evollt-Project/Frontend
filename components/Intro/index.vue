<script setup lang="ts">
import type { IArticlePayloadSearch } from "~/types/Article/type";

const loading: Ref<boolean> = ref(false);
const router = useRouter();
const filters: Ref<IArticlePayloadSearch> = ref({
  search: "",
  has_certificate: false,
  only_free: false,
  price: {
    min: undefined,
    max: undefined,
  },
  levels: [],
  languages: [],
});
const searchCourses = () => {
  router.push({
    name: "courses",
    query: {
      filters: JSON.stringify(filters.value),
    },
  });
};
const isFormValid = ref(false);
const articleFiltersModal = ref(false);
</script>

<template>
  <div class="intro rounded-3xl">
    <div class="intro-content">
      <div class="intro-content__top mb-[-100px]">
        <img
          src="@/assets/img/intro/background.webp"
          class="intro__background object-cover rounded-3xl w-full h-96"
          alt=""
        />
      </div>
      <div
        class="intro-content__bottom min-h-36 dark:bg-neutral-900 bg-neutral-100 rounded-3xl p-8 relative flex items-center shadow-custom"
      >
        <div class="w-full">
          <v-form
            v-model="isFormValid"
            @submit.prevent="searchCourses"
            class="flex sm:justify-between gap-[20px] sm:items-center flex-col sm:flex-row"
          >
            <v-text-field
              v-model="filters.search"
              hide-details
              rounded="lg"
              label="Поиск"
              prepend-inner-icon="mdi-text-box-search"
              variant="outlined"
              density="comfortable"
            />
            <div class="sm:flex grid grid-cols-2 gap-[20px]">
              <MyButton size="large" @click="articleFiltersModal = true">
                <div class="flex justify-center items-center gap-2">
                  <v-icon icon="mdi-filter-outline"></v-icon>
                  <span class="hidden xs:block"> Фильтры </span>
                </div>
              </MyButton>
              <MyButton size="large" type="submit" :loading="loading">
                <div class="flex justify-center items-center gap-2">
                  <v-icon icon="mdi-magnify"></v-icon>
                  <span class="hidden xs:block"> Искать </span>
                </div>
              </MyButton>
            </div>
          </v-form>
        </div>
      </div>
    </div>
    <ArticleModalsFilters
      v-if="articleFiltersModal"
      :dialog="articleFiltersModal"
      :search="filters"
      :loading="loading"
      @update:dialog="articleFiltersModal = $event"
      @update:search="filters = $event"
    />
  </div>
</template>
