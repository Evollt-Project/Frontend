<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
import { VBottomSheet, VDialog } from "vuetify/components";
import { MOBILE_VERSION_WIDTH } from "~/consts/config";
import type { IArticlePayloadSearch } from "~/types/Article/type";

const props = defineProps<{
  dialog: boolean;
  search: IArticlePayloadSearch;
  loading?: boolean;
}>();
const emits = defineEmits(["update:dialog", "update:search"]);

const dialog: Ref<boolean> = ref(props.dialog);
const { width } = useWindowSize();
const isFormValid: Ref<boolean> = ref(false);
const search = ref(props.search);

const addTeacher = async () => {};

watch(dialog, (value) => {
  emits("update:dialog", value);
});

watch(
  () => props.dialog,
  (value) => {
    dialog.value = value;
  },
);

watch(search, (value) => {
  emits("update:dialog", value);
});

watch(
  () => props.search,
  (value) => {
    search.value = value;
  },
);

const minMaxPriceText = computed(() => {
  const minPrice = props.search.min_price;
  const maxPrice = props.search.max_price;

  if (minPrice && maxPrice) {
    return `с ${minPrice} по ${maxPrice}`;
  } else if (minPrice && !maxPrice) {
    return `от ${minPrice}`;
  } else if (!minPrice && maxPrice) {
    return `до ${maxPrice}`;
  } else {
    return "Укажите ценовой диапазон";
  }
});

const hardLevelText = computed(() => {
  return search.value.levels.length > 0
    ? User.store.enums?.levels
        .filter((level) => search.value.levels.includes(level.id))
        .map((level) => level.title)
        .join(", ")
    : "Укажите уровень сложности";
});

const languageText = computed(() => {
  return search.value.languages.length > 0
    ? User.store.enums?.languages
        .filter((language) => search.value.languages.includes(language.id))
        .map((language) => language.title)
        .join(", ")
    : "Укажите язык курса";
});
</script>

<template>
  <component
    :is="width > MOBILE_VERSION_WIDTH ? VDialog : VBottomSheet"
    :max-width="width > MOBILE_VERSION_WIDTH ? 800 : MOBILE_VERSION_WIDTH"
    v-model="dialog"
    :persistent="loading"
  >
    <template v-if="dialog">
      <v-card
        rounded="xl"
        class="!bg-white dark:!bg-neutral-900 card-modal"
        variant="outlined"
        :loading="loading"
      >
        <v-card-title class="d-flex justify-space-between align-center p-0">
          Фильтры
          <v-btn
            icon="mdi-close"
            :disabled="loading"
            variant="text"
            class="dark:text-white"
            :ripple="false"
            @click="dialog = false"
          ></v-btn>
        </v-card-title>
        <v-card-text>
          <v-form
            v-model="isFormValid"
            class="grid gap-5"
            @submit.prevent="addTeacher"
          >
            <v-expansion-panels>
              <ArticleModalsFiltersExpansion
                title="Ценовой диапазон"
                :text="minMaxPriceText"
              >
                <template #panelContent>
                  <div class="flex gap-5">
                    <v-text-field
                      v-model="search.min_price"
                      v-mask="['######']"
                      type="number"
                      rounded="lg"
                      label="Минимальная стоимость"
                      :loading="loading"
                      variant="outlined"
                      density="comfortable"
                    />
                    <v-text-field
                      v-model="search.max_price"
                      v-mask="['######']"
                      type="number"
                      rounded="lg"
                      label="Максимальная стоимость"
                      :loading="loading"
                      variant="outlined"
                      density="comfortable"
                    />
                  </div>
                </template>
              </ArticleModalsFiltersExpansion>

              <ArticleModalsFiltersExpansion
                title="Уровень сложности"
                :text="hardLevelText as string"
              >
                <template #panelContent>
                  <v-checkbox
                    v-for="level in User.store.enums?.levels"
                    v-model="search.levels"
                    :key="level.id"
                    hide-details
                    :label="level.title"
                    :value="level.id"
                  />
                </template>
              </ArticleModalsFiltersExpansion>
              <ArticleModalsFiltersExpansion
                title="Язык"
                :text="languageText as string"
              >
                <template #panelContent>
                  <v-checkbox
                    v-for="language in User.store.enums?.languages"
                    v-model="search.languages"
                    :key="language.id"
                    hide-details
                    :label="language.title"
                    :value="language.id"
                  />
                </template>
              </ArticleModalsFiltersExpansion>
              <ArticleModalsFiltersExpansion title="Дополнительно">
                <template #panelContent>
                  <MySwitcher
                    v-model="search.certificates"
                    label="Только с сертификтом"
                  />
                  <MySwitcher
                    v-model="search.discount"
                    label="Только со скидкой"
                  />
                </template>
              </ArticleModalsFiltersExpansion>
            </v-expansion-panels>
            <div class="flex justify-end gap-5">
              <MyButton @click="dialog = false"> Отменить </MyButton>
              <MyButton type="submit"> Применить </MyButton>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </template>
  </component>
</template>
