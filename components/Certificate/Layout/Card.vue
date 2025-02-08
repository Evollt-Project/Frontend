<script setup lang="ts">
import type { ICertificateType } from "~/types/ICertificate";

defineProps<{
  certificate: ICertificateType;
}>();
</script>

<template>
  <NuxtLink
    class="article rounded-3xl cursor-pointer dark:shadow-white min-w-[350px] transition duration-300 hover:shadow-custom h-full flex flex-col"
    :to="{
      name: 'article-page',
      params: {
        id: certificate.id,
      },
    }"
  >
    <div class="article-content h-full flex flex-col">
      <div class="article-content_top mb-[-30px]">
        <div class="article-content__cover">
          <img
            :src="photoUrl(certificate.preview_image)"
            class="w-full h-72 object-cover rounded-2xl"
            v-if="certificate.preview_image"
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
              <h3 class="article-content__title mb-4 text-lg font-bold">
                {{ certificate.title }}
              </h3>
              <p class="article-content__authors text-neutral-500">
                Автор:
                <UserHoverCard :user="certificate.owner">
                  <template #title>
                    {{
                      [
                        certificate.owner?.surname,
                        certificate.owner?.first_name,
                      ].join(" ")
                    }}
                  </template>
                </UserHoverCard>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss"></style>
