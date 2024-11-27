import type { ICatalog } from "~/types/ICatalog";

export const useCatalogStore = defineStore("catalog", () => {
  const catalogs: ICatalog[] = [];

  return {
    catalogs,
  };
});
