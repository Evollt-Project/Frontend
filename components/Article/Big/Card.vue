<script setup lang="ts">
import type { IArticle } from "~/types/IArticle";

defineProps<{
  article: IArticle;
}>();
</script>

<template>
  <NuxtLink
    class="article rounded-3xl cursor-pointer dark:shadow-white min-w-[350px] transition duration-300 hover:shadow-custom h-full flex flex-col"
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
            :src="photoUrl(article.avatar)"
            class="w-full h-72 object-cover rounded-2xl"
            v-if="article.avatar"
            alt=""
          />
          <div
            v-else
            class="w-full h-72 rounded-2xl flex justify-center items-center"
          >
            <p class="text-center text-sm">Пока нет фото</p>
          </div>
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
                Автор:
                <UserHoverCard :user="article.owner">
                  <template #title>
                    {{
                      [article.owner?.surname, article.owner?.first_name].join(
                        " "
                      )
                    }}
                  </template>
                </UserHoverCard>
              </p>
            </div>
            <div class="article-content__widgets flex gap-3 flex-wrap">
              <div
                class="flex items-center gap-1"
                v-if="article.students.length > 0"
              >
                <v-icon icon="mdi-account-group-outline"></v-icon>
                {{ article.students.length }}
                <v-tooltip
                  activator="parent"
                  max-width="300px"
                  location="bottom"
                >
                  Количество студентов, проходящих или прошедших курс
                </v-tooltip>
              </div>
              <div class="flex items-center gap-1" v-if="article.time">
                <v-icon icon="mdi-clock-time-eight-outline"></v-icon>
                {{ article.time }} ч
                <v-tooltip
                  activator="parent"
                  max-width="300px"
                  location="bottom"
                >
                  Примерное количество времени, нужное для прохождения курса
                </v-tooltip>
              </div>
              <div v-if="article.has_certificate">
                <v-icon icon="mdi-certificate-outline"></v-icon>
                <v-tooltip
                  activator="parent"
                  max-width="300px"
                  location="bottom"
                >
                  После прохождения этого курса вы можете получить сертификат
                </v-tooltip>
              </div>
            </div>
          </div>
          <div class="article-content__tags my-5 flex gap-3">
            <ProfileTagList
              :items="[...article.categories, ...article.subcategories]"
            />
          </div>
        </div>

        <div class="article-content__bottom mt-auto">
          <div class="article-content__price font-bold text-lg">
            {{ article.price ? useFormatAmount(article.price) : "Бесплатно" }}
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss"></style>
