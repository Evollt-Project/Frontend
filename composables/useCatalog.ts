import type { ICatalog } from "~/types/ICatalog";

export class Catalog {
  static get store() {
    return useCatalogStore();
  }

  static async getCatalogs() {
    return useRequest<ICatalog[]>({ url: "/api/v1/catalog" }).then((response) => {
      this.store.catalogs = response.data;
      return response.data
    });
  }
}
