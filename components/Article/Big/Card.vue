<script setup lang="ts">
import type { IArticle } from "~/types/IArticle";

defineProps<{
  article: IArticle;
}>();
</script>

<template>
  <NuxtLink
    class="article rounded-3xl cursor-pointer dark:shadow-white transition duration-300 hover:shadow-custom h-full flex flex-col"
    :to="{
      name: 'article-page',
      params: {
        id: article.id,
      },
    }"
  >
    <div class="article-content h-full flex flex-col">
      <div class="article-content_top mb-[-30px]">
        <div class="article-content__cover">
          <img
            :src="article.photo"
            class="w-full h-72 object-cover rounded-2xl"
            alt=""
          />
        </div>
      </div>

      <div
        class="dark:bg-neutral-900 bg-neutral-100 rounded-3xl p-5 relative flex flex-col justify-between flex-grow"
      >
        <div class="article-content__middle">
          <div class="flex justify-between items-start gap-5">
            <div>
              <h3 class="article-content__title text-lg font-bold">
                {{ article.title }}
              </h3>
              <p class="article-content__authors text-neutral-500">
                Автор: {{ article.author?.first_name }}
              </p>
            </div>
            <div class="article-content__widgets flex gap-3">
              <div class="flex items-center gap-1">
                <v-icon icon="mdi-account-group-outline"></v-icon>
                {{ article.students_complete }}
              </div>
              <div class="flex items-center gap-1">
                <v-icon icon="mdi-clock-time-eight-outline"></v-icon>
                {{ article.time }}
              </div>
            </div>
          </div>
          <div class="article-content__tags my-5 flex gap-3">
            <div
              class="text-lg px-3 py-1 rounded-3xl"
              style="border: 1px solid black"
            >
              Frontend
            </div>
          </div>
        </div>

        <div class="article-content__bottom mt-auto">
          <div class="article-content__price font-bold text-lg">
            {{ useFormatAmount(article.price) }}
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss"></style>
