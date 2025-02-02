<script setup lang="ts">
import { Certificate } from "~/composables/useCertificate";
import type { ICertificate } from "~/types/ICertificate";
import type { IPagination } from "~/types/IPagination";

definePageMeta({
  name: "certificates-my",
  layout: "sidebar",
});

const tab: Ref<"certificates" | "layouts"> = ref("certificates");
const page = ref(1);
const certificates: Ref<IPagination<ICertificate> | null> = ref(null);
const loading = ref(false);
const search = ref("");

const getMyCertificates = async (search: string | undefined = undefined) => {
  loading.value = true;
  await Certificate.getMy({
    page: page.value,
    search: sanitizeValue(search),
  }).then((response) => {
    if (response) {
      if (certificates.value) {
        response.data = [...certificates.value.data, ...response.data];
      }
      certificates.value = response;
    }
    loading.value = false;
  });
};

const getCertificateLayouts = async (
  search: string | undefined = undefined
) => {};

onMounted(async () => {
  await getMyCertificates();
});

// type - 0 получение сертификатов, 1 получение шаблонов для сертификатов
const changePage = async (e: number, type: number) => {
  page.value = e;
  type == 0
    ? getMyCertificates(search.value)
    : getCertificateLayouts(search.value);
};

// type - 0 получение сертификатов, 1 получение шаблонов для сертификатов
const changeSearch = async (e: string, type: number) => {
  search.value = e;
  page.value = 1;
  if (certificates.value) {
    certificates.value.data = [];
  }
  type == 0
    ? getMyCertificates(search.value)
    : getCertificateLayouts(search.value);
};
</script>

<template>
  <div>
    <!-- TODO: Доделать страницу сертификатов -->
    <v-tabs v-model="tab" background-color="transparent" class="flex gap-2.5">
      <v-tab
        :ripple="false"
        value="certificates"
        class="text-center dark:text-white"
      >
        Сертификаты
      </v-tab>
      <v-tab
        :ripple="false"
        value="layouts"
        class="text-center dark:text-white"
      >
        Шаблоны
      </v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item value="certificates">
        <CertificateSearchAndList
          :certificates="certificates"
          :loading="loading"
          @changePage="(e: number) => changePage(e, 0)"
          @search="(e: string) => changeSearch(e, 0)"
          :page="page"
        />
      </v-window-item>
      <v-window-item value="layouts"> Мои шаблоны </v-window-item>
    </v-window>
  </div>
</template>

<style scoped lang="scss"></style>
