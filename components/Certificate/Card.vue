<script setup lang="ts">
import type { ICertificate } from "~/types/ICertificate";

defineProps<{
  certificate: ICertificate;
}>();
</script>

<template>
  <a
    class="article dark:bg-neutral-900 bg-neutral-100 rounded-3xl hover:shadow-custom transition p-8"
    target="_blank"
    :href="photoUrl(certificate.path)"
  >
    <div class="article-content grid h-full w-full gap-2">
      <h3 class="article-content__title text-lg font-bold">
        Курс: {{ certificate.article.title }}
      </h3>
      <p class="article-content__authors text-sm">
        Автор курса:
        <UserHoverCard :user="certificate.article.owner">
          <template #title>
            {{
              [
                certificate.article.owner?.surname,
                certificate.article.owner?.first_name,
              ].join(" ")
            }}
          </template>
        </UserHoverCard>
      </p>
      <div class="article-content__cover">
        <img
          :src="photoUrl(certificate.path)"
          class="w-20 h-20 object-cover rounded-2xl"
          v-if="certificate.path"
          alt=""
        />
        <div
          v-else
          class="w-20 h-20 rounded-2xl flex justify-center items-center border-black dark:border-white border-2"
        >
          <p class="text-center text-sm">Пока нет фото</p>
        </div>
      </div>
    </div>
  </a>
</template>

<style scoped lang="scss">
.article {
  &-content {
    grid-template-areas:
      "title title cover cover"
      "authors authors cover cover";
    grid-template-columns: auto 1fr auto auto;

    &__title {
      grid-area: title;
    }
    &__authors {
      grid-area: authors;
    }
    &__cover {
      grid-area: cover;
    }
  }
}
</style>
