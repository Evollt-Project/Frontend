<script setup lang="ts">
import type { IArticle } from "~/types/IArticle";
import type { IPagination } from "~/types/IPagination";

const props = defineProps<{
  articles: IPagination<IArticle> | null;
  page: number;
  loadingArticles: boolean;
}>();
const emits = defineEmits(["search", "changePage"]);

const changeSearchField = useDebounceFn((event: InputEvent) => {
  const target = event.target as HTMLInputElement;

  if (target) {
    emits("search", target.value);
  }
}, User.DEBOUNCE_DELAY);
</script>

<template>
  <div class="courses">
    <v-form fast-fail ref="form" class="mt-4" @submit.prevent>
      <v-text-field
        hide-details
        rounded="lg"
        @input="changeSearchField"
        label="Поиск"
        prepend-inner-icon="mdi-text-box-search"
        variant="outlined"
        density="comfortable"
      ></v-text-field>
    </v-form>
    <div class="mt-[20px]">
      <div class="courses__list">
        <div v-if="loadingArticles" v-for="_ in 3">
          <div class="flex flex-col space-y-3">
            <Skeleton class="h-[288px] w-[350px] rounded-xl" />
            <div class="space-y-2">
              <div class="flex justify-between">
                <Skeleton class="h-4 w-[250px]" />
                <Skeleton class="h-4 w-[80px]" />
              </div>
              <Skeleton class="h-4 w-[200px]" />
              <span class="flex gap-2 flex-wrap mt-5">
                <Skeleton class="h-4 w-[80px]" />
                <Skeleton class="h-4 w-[100px]" />
                <Skeleton class="h-4 w-[120px]" />
                <Skeleton class="h-4 w-[150px]" />
                <Skeleton class="h-4 w-[80px]" />
              </span>
              <Skeleton class="h-4 w-[150px] mt-5" />
            </div>
          </div>
        </div>
        <ArticleBigCard
          v-else-if="articles && articles.data.length > 0 && !loadingArticles"
          v-for="article in articles.data"
          :article="article"
        />
        <div v-else class="flex justify-center">Не найдено</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.courses {
  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 350px));
    gap: 20px;
  }
}
</style>
