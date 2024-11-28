<script setup lang="ts">
import { SwiperSlide } from "swiper/vue";

const tab: Ref<"first" | "second"> = ref("first");
</script>

<template>
  <div>
    <div class="flex gap-3 items-start">
      <h2 class="text-3xl font-bold">Курсы со скидками</h2>
      <v-icon icon="mdi-arrow-down" size="35"></v-icon>
    </div>
    <div class="mt-5">
      <v-tabs v-model="tab" background-color="transparent" class="flex gap-2.5">
        <v-tab
          :ripple="false"
          value="first"
          class="text-center dark:text-white"
        >
          Тестирование
        </v-tab>
        <v-tab
          :ripple="false"
          value="second"
          class="text-center dark:text-white ps-2"
        >
          Excel и Google Таблицы
        </v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item value="first">
          <ArticleSwiper>
            <template #slides>
              <SwiperSlide v-for="_ in 2">
                <div class="grid gap-[20px] grid-cols-3">
                  <ArticleCard
                    v-for="_ in 6"
                    :article="{
                      id: 1,
                      title: 'Hello',
                      author: User.store.user,
                      photo:
                        'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/SQL_2019_Webpage_illustration_RE4r3wO:VP1-539x400?resMode=sharp2&op_usm=1.5,0.65,15,0&qlt=75',
                      students_complete: '100',
                      time: '92',
                      rate: '5',
                      price: 5000,
                    }"
                  />
                </div>
              </SwiperSlide>
            </template>
          </ArticleSwiper>
        </v-window-item>
        <v-window-item value="second">
          <ArticleSwiper>
            <template #slides>
              <SwiperSlide v-for="_ in 2">
                <div class="grid gap-[20px] grid-cols-3">
                  <ArticleCard
                    v-for="_ in 6"
                    :article="{
                      id: 1,
                      title: 'Вторая вкладка',
                      author: User.store.user,
                      photo:
                        'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/SQL_2019_Webpage_illustration_RE4r3wO:VP1-539x400?resMode=sharp2&op_usm=1.5,0.65,15,0&qlt=75',
                      students_complete: '100',
                      time: '92',
                      rate: '5',
                      price: 5000,
                    }"
                  />
                </div>
              </SwiperSlide>
            </template>
          </ArticleSwiper>
        </v-window-item>
      </v-window>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
