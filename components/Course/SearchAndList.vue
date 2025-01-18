<script setup lang="ts">
import type { IArticle } from "~/types/IArticle";

const props = defineProps<{
  articles: IArticle[];
}>();
const loading: Ref<boolean> = ref(false);
const search = ref({
  field: "",
  certificates: false,
  free: false,
});

const validate = () => {
  if (loading.value) {
    return true;
  }

  return false;
};
</script>

<template>
  <div class="courses">
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
    <div class="courses__list mt-[20px]">
      <ArticleCard v-for="article in articles" :article="article" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.courses {
  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 20px;
  }
}
</style>
