<script setup lang="ts">
import type { IArticle } from "~/types/IArticle";

defineProps<{
  article: IArticle;
}>();
</script>

<template>
  <NuxtLink
    class="article dark:bg-neutral-900 bg-neutral-100 rounded-3xl hover:shadow-custom transition p-8"
    :to="{
      name: 'article-page',
      params: {
        id: article.id,
      },
    }"
  >
    <div class="article-content grid h-full w-full gap-2">
      <h3 class="article-content__title text-lg font-bold">
        {{ article.title }}
      </h3>
      <p class="article-content__authors text-sm">
        Автор: {{ article.author?.first_name }}
      </p>
      <div class="article-content__cover">
        <img
          :src="article.photo"
          class="w-20 h-20 object-cover rounded-2xl"
          alt=""
        />
      </div>
      <div class="article-content__widgets flex gap-3">
        <div class="flex items-center gap-1">
          <v-icon icon="mdi-account-group-outline"></v-icon>
          {{ article.students_complete }}
        </div>
        <div class="flex items-center gap-1">
          <v-icon icon="mdi-clock-time-eight-outline"></v-icon>
          {{ article.time }} ч
        </div>
      </div>
      <div class="article-content__price font-bold text-lg">
        {{ useFormatAmount(article.price) }}
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.article {
  &-content {
    grid-template-areas:
      "title title cover cover"
      "authors authors cover cover"
      "space space cover cover"
      "widgets widgets widgets widgets"
      "price badges badges badges";
    grid-template-columns: auto 1fr auto auto;
    grid-template-rows: -webkit-max-content auto 1fr auto minmax(18px, auto);
    grid-template-rows: max-content auto 1fr auto minmax(18px, auto);

    &__title {
      grid-area: title;
    }
    &__authors {
      grid-area: authors;
    }
    &__cover {
      grid-area: cover;
    }
    &__widgets {
      grid-area: widgets;
    }
    &__price {
      grid-area: price;
    }
  }
}
</style>
