<script setup lang="ts">
import type { IArticlePayloadSearch } from "~/types/Article/type";

const loading: Ref<boolean> = ref(false);
const search: Ref<IArticlePayloadSearch> = ref({
  search: "",
  min_price: 0,
  levels: [],
  languages: [],
});
const searchCourses = () => {};
const isFormValid = ref(false);
const articleFiltersModal = ref(false);

const validate = computed(() => {
  return loading.value || !isFormValid;
});
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
            class="flex justify-between gap-[20px] items-center flex-col sm:flex-row"
          >
            <v-text-field
              v-model="search.search"
              :disabled="loading"
              hide-details
              rounded="lg"
              label="Поиск"
              prepend-inner-icon="mdi-text-box-search"
              variant="outlined"
              density="comfortable"
              class="w-full"
            ></v-text-field>
            <div class="flex gap-[20px] max-sm:w-full max-sm:*:flex-1">
              <MyButton
                size="large"
                prepend-icon="mdi-filter-outline"
                @click="articleFiltersModal = true"
              >
                Фильтры
              </MyButton>
              <MyButton
                size="large"
                type="submit"
                :disabled="validate"
                :loading="loading"
                prepend-icon="mdi-magnify"
              >
                Искать
              </MyButton>
            </div>
          </v-form>
        </div>
      </div>
    </div>
    <ArticleModalsFilters
      :dialog="articleFiltersModal"
      :search="search"
      :loading="loading"
      @update:dialog="articleFiltersModal = $event"
    />
  </div>
</template>

<style scoped lang="scss"></style>
