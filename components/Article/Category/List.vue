<script setup lang="ts">
import { SwiperSlide } from "swiper/vue";
import type { IArticleCategory } from "~/types/IArticleCategory";

const props = defineProps<{
  title: string;
  articleCategories: IArticleCategory[];
}>();

const tab = ref(props.articleCategories[0]!.tab ?? null);
</script>

<template>
  <div class="box-border w-full overflow-hidden">
    <div class="flex gap-3 items-start">
      <h2 class="text-3xl font-bold">{{ title }}</h2>
      <v-icon icon="mdi-arrow-down" size="35"></v-icon>
    </div>

    <div class="mt-5">
      <v-tabs
        v-model="tab"
        v-if="tab"
        background-color="transparent"
        class="flex gap-2.5"
      >
        <v-tab
          v-for="articleCategory in articleCategories"
          :ripple="false"
          :value="articleCategory.tab"
          class="text-center dark:text-white"
        >
          {{ articleCategory.tab }}
        </v-tab>
      </v-tabs>

      <v-window v-model="tab" :touch="false">
        <v-window-item
          v-for="articleCategory in articleCategories"
          :value="articleCategory.tab"
        >
          <ArticleSwiper>
            <template #slides>
              <SwiperSlide
                v-for="article in articleCategory.articles"
                :key="article.id"
                class="max-w-[400px]"
              >
                <ArticleBigCard :article="article" />
              </SwiperSlide>
            </template>
          </ArticleSwiper>
        </v-window-item>
      </v-window>
    </div>
  </div>
</template>
