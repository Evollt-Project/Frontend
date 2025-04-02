<script setup lang="ts">
import type { ICertificateType } from "~/types/ICertificate";
import type { IPagination } from "~/types/Base/IPagination";

definePageMeta({
  name: "certificates-layouts",
  layout: "sidebar",
});

const page = ref(1);
const certificateTypes: Ref<IPagination<ICertificateType> | null> = ref(null);
const loading = ref(false);
const search = ref("");

const getCertificateLayouts = async (
  search: string | undefined = undefined,
) => {
  loading.value = true;
  await Certificate.getMyLayouts({
    page: page.value,
    search: sanitizeValue(search),
  }).then((response) => {
    if (response) {
      if (certificateTypes.value) {
        response.data = [...certificateTypes.value.data, ...response.data];
      }
      certificateTypes.value = response;
    }
    loading.value = false;
  });
};

onMounted(async () => {
  await getCertificateLayouts();
});

const changePage = async (e: number) => {
  page.value = e;
  getCertificateLayouts(search.value);
};

const changeSearch = async (e: string) => {
  search.value = e;
  page.value = 1;
  if (certificateTypes.value) {
    certificateTypes.value.data = [];
  }
  getCertificateLayouts(search.value);
};
</script>

<template>
  <div>
    <CertificateSearchAndList
      :certificates="certificateTypes"
      :loading="loading"
      :type="'certificate_type'"
      @changePage="(e: number) => changePage(e)"
      @search="(e: string) => changeSearch(e)"
      :page="page"
    />
  </div>
</template>

<style scoped lang="scss"></style>
