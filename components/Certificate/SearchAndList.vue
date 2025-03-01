<script setup lang="ts">
import type { ICertificate, ICertificateType } from "~/types/ICertificate";
import type { IPagination } from "~/types/IPagination";

const props = defineProps<{
  certificates:
    | IPagination<ICertificate>
    | IPagination<ICertificateType>
    | null;
  page: number;
  type: "certificate" | "certificate_type";
  certificate_type?: "my" | "list";
  loading: boolean;
}>();
const emits = defineEmits(["search", "changePage"]);
const observer: Ref<HTMLDivElement | null> = ref(null);
const router = useRouter();

useIntersectionObserver(observer, ([entry], observerElement) => {
  if (
    entry.isIntersecting &&
    props.certificates &&
    props.page < props.certificates.meta.last_page
  ) {
    emits("changePage", props.page + 1);
  }
});

const changeSearchField = useDebounceFn((event: InputEvent) => {
  const target = event.target as HTMLInputElement;

  if (target) {
    emits("search", target.value);
  }
}, User.DEBOUNCE_DELAY);
</script>

<template>
  <div class="courses">
    <v-form fast-fail ref="form" class="mt-4 flex gap-4" @submit.prevent>
      <v-text-field
        hide-details
        rounded="lg"
        @input="changeSearchField"
        label="Поиск"
        prepend-inner-icon="mdi-text-box-search"
        variant="outlined"
        density="comfortable"
      ></v-text-field>
      <MyButton
        v-if="type == 'certificate_type'"
        @click="router.push({ name: 'certificates-create' })"
        density=""
        class="text-lg"
      >
        Создать шаблон
      </MyButton>
    </v-form>
    <div class="my-[20px]">
      <div>
        <div class="courses__list">
          <CertificateCard
            v-if="
              type == 'certificate' &&
              certificates &&
              certificates.data.length > 0
            "
            v-for="certificate in certificates.data"
            :certificate="certificate as ICertificate"
          />
          <CertificateLayoutCard
            v-if="
              type == 'certificate_type' &&
              certificates &&
              certificates.data.length > 0
            "
            v-for="certificate in certificates.data"
            :certificate="certificate as ICertificateType"
            :certificate_type="certificate_type ?? 'list'"
          />
          <div v-for="_ in 3" v-if="loading">
            <div class="flex flex-col space-y-3 p-8">
              <div class="flex justify-between">
                <div class="space-y-3">
                  <Skeleton class="h-4 w-[150px]" />
                  <Skeleton class="h-4 w-[80px]" />
                </div>
                <Skeleton class="w-20 h-20 rounded-xl" />
              </div>
              <div class="flex justify-between">
                <Skeleton class="h-4 w-[250px]" />
              </div>
            </div>
          </div>
          <div
            ref="observer"
            v-if="certificates && certificates.data.length > 0"
            class="observer"
          ></div>
        </div>
      </div>
      <div
        v-if="certificates && certificates.data.length == 0"
        class="flex justify-center"
      >
        Не найдено
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.courses {
  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 350px));
    gap: 20px;
  }
}
</style>
