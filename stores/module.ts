export const useModuleStore = defineStore("module", () => {
  const isEditContent: Ref<boolean> = ref(false);

  return {
    isEditContent,
  };
});
