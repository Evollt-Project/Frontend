import type { ICatalog } from "~/types/ICatalog";

export class Catalog {
  static get store() {
    return useCatalogStore();
  }

  static async getAll() {
    return useRequest<ICatalog[]>({ url: "/api/v1/catalog" }).then(
      (response) => {
        this.store.catalogs = response.data;
        return response.data;
      },
    );
  }

  static async get(id: number) {
    return useRequest<ICatalog>({ url: `/api/v1/catalog/${id}` }).then(
      (response) => {
        return response.data;
      },
    );
  }
}
