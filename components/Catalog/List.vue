<script setup lang="ts">
import type { ICatalog } from "~/types/ICatalog";

const tab: Ref<"catalogs" | "categories"> = ref("catalogs");
const selectedCatalog: Ref<ICatalog | null> = ref(null);

const selectCatalog = (catalog: ICatalog) => {
  selectedCatalog.value = catalog;
  tab.value = "categories";
};
</script>

<template>
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
      <div @click="tab = 'catalogs'">Назад</div>
      <CategoryItem
        :category="category"
        v-for="category in selectedCatalog?.categories"
        :key="category.id"
      />
    </v-window-item>
  </v-window>
</template>

<style scoped lang="scss"></style>
