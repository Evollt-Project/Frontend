import type { ICatalog } from "~/types/ICatalog";

export class Catalog {
  static get store() {
    return useCatalogStore();
  }

  static async getCatalogs() {
    await useRequest<ICatalog[]>({ url: "/api/catalog" }).then((response) => {
      this.store.catalogs = response.data;
    });
  }
}
