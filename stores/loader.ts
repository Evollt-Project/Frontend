export const useLoaderStore = defineStore("loader", () => {
  const loading: Ref<boolean> = ref(true);
  const progress: Ref<number> = ref(0);

  return {
    loading,
    progress,
  };
});
