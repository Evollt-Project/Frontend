<script setup lang="ts">
import { LayoutEnum } from "~/enums/LayoutEnum";
import type { ICertificateType } from "~/types/ICertificate";

const { certificate } = defineProps<{
  certificate: ICertificateType;
  certificate_type: "my" | "list";
}>();

const shadowColor: ComputedRef<string> = computed(() => {
  switch (certificate.state) {
    case LayoutEnum.MODERATION:
      return "#ffc900";
    case LayoutEnum.ACTIVE:
      return "#00d200";
    case LayoutEnum.REJECTED:
      return "#dc143c";
    default:
      return "#fff";
  }
});
</script>

<template>
  <NuxtLink
    class="article rounded-3xl cursor-pointer min-w-[350px] transition duration-300 h-full flex flex-col"
    :style="{ '--custom-shadow-color': shadowColor }"
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
          <div>
            <div>
              <h3 class="article-content__title mb-4 text-lg font-bold">
                {{ certificate.title }}
              </h3>
              <strong
                v-if="User.store.enums && certificate_type == 'my'"
                class="text-sm"
                :style="`color: ${shadowColor}`"
              >
                {{ User.store.enums.certificate_types[certificate.state] }}
              </strong>
              <p class="article-content__authors text-neutral-500 mt-2">
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

<style scoped lang="scss">
.article {
  &:hover {
    box-shadow: 0px 0px 10px var(--custom-shadow-color);
  }
}
</style>
