<script setup lang="ts">
import type { IArticle } from "~/types/Article/IArticle";

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
        Автор:
        <UserHoverCard :user="article.owner">
          <template #title>
            {{ [article.owner?.surname, article.owner?.first_name].join(" ") }}
          </template>
        </UserHoverCard>
      </p>
      <div class="article-content__cover">
        <img
          v-if="article.avatar"
          :src="photoUrl(article.avatar)"
          class="w-20 h-20 object-cover rounded-2xl"
          alt=""
        />
        <div
          v-else
          class="w-20 h-20 rounded-2xl flex justify-center items-center border-black dark:border-white border-2"
        >
          <p class="text-center text-sm">Пока нет фото</p>
        </div>
      </div>
      <div class="article-content__widgets flex gap-3">
        <div class="flex items-center gap-1" v-if="article.students.length > 0">
          <v-icon icon="mdi-account-group-outline"></v-icon>
          {{ article.students.length }}
          <v-tooltip activator="parent" max-width="300px" location="bottom">
            Количество студентов, проходящих или прошедших курс
          </v-tooltip>
        </div>
        <div class="flex items-center gap-1" v-if="article.time">
          <v-icon icon="mdi-clock-time-eight-outline"></v-icon>
          {{ article.time }} ч
          <v-tooltip activator="parent" max-width="300px" location="bottom">
            Примерное количество времени, нужное для прохождения курса
          </v-tooltip>
        </div>
        <div v-if="article.has_certificate">
          <v-icon icon="mdi-certificate-outline"></v-icon>
          <v-tooltip activator="parent" max-width="300px" location="bottom">
            После прохождения этого курса вы можете получить сертификат
          </v-tooltip>
        </div>
      </div>

      <div class="article-content__price font-bold text-lg">
        {{ article.price ? useFormatAmount(article.price) : "Бесплатно" }}
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
      height: 24px;
    }
    &__price {
      grid-area: price;
    }
  }
}
</style>
