<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
import { VDialog, VBottomSheet } from "vuetify/components";
import type { ICatalog } from "~/types/ICatalog";

const props = defineProps<{
  dialog: boolean;
}>();
const emits = defineEmits(["dialog"]);

const dialog: Ref<boolean> = ref(props.dialog);
const tab: Ref<"catalogs" | "categories"> = ref("catalogs");
const { width } = useWindowSize();
const loading = ref(false);
const selectedCatalog: Ref<ICatalog | null> = ref(null);

const selectCatalog = (catalog: ICatalog) => {
  selectedCatalog.value = catalog;
  tab.value = "categories";
};

watch(dialog, (value) => {
  selectedCatalog.value = null;
  tab.value = "catalogs";
  emits("dialog", value);
});

watch(tab, (value) => {
  if (value == "catalogs") {
    selectedCatalog.value = null;
  }
});

watch(
  () => props.dialog,
  (value) => {
    dialog.value = value;
  },
);
</script>

<template>
  <component
    :is="width > 650 ? VDialog : VBottomSheet"
    :max-width="width > 650 ? '1500' : '650'"
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
        <v-card-title class="sticky-header">
          <div class="d-flex justify-between align-center">
            <div class="text-h5 text-center dark:text-white">
              {{ tab == "catalogs" ? "Каталог" : "Категория" }}
            </div>

            <v-btn
              icon="mdi-close"
              :disabled="loading"
              variant="text"
              class="dark:text-white"
              :ripple="false"
              @click="dialog = false"
            ></v-btn>
          </div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink as-child>
                  <div
                    :class="{
                      'text-white': tab == 'catalogs',
                      'cursor-pointer': tab != 'catalogs',
                    }"
                    @click="tab = 'catalogs'"
                  >
                    Каталог
                  </div>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator v-if="selectedCatalog" />
              <BreadcrumbItem v-if="selectedCatalog">
                <BreadcrumbLink as-child>
                  <div
                    :class="{
                      'text-white': tab == 'categories',
                      'cursor-pointer': tab != 'categories',
                    }"
                    @click="tab = 'categories'"
                  >
                    Категория
                  </div>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </v-card-title>

        <v-card-text class="dark:text-white scrollable-content">
          <v-window v-model="tab">
            <v-window-item value="catalogs">
              <div class="catalogs-list">
                <CatalogItem
                  v-for="catalog in Catalog.store.catalogs"
                  :catalog="catalog"
                  @selectCatalog="(e: ICatalog) => selectCatalog(e)"
                />
              </div>
            </v-window-item>
            <v-window-item value="categories">
              <div class="catalogs-list">
                <CategoryItem
                  v-for="category in selectedCatalog?.categories"
                  :key="category.id"
                  :category="category"
                />
              </div>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </template>
  </component>
</template>

<style scoped lang="scss">
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 16px;
  border-bottom: 1px solid var(--v-border-color, #e0e0e0); /* Граница */
}

.scrollable-content {
  max-height: 100vh;
  overflow-y: auto;
}

.catalogs-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}
</style>
