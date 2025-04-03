import { useLoaderStore } from "~/stores/loader";

export class Loader {
  static get store() {
    return useLoaderStore();
  }

  static changeLoading(value: boolean | null = null) {
    this.store.loading = value ? value : !this.store.loading;
  }
}
