export const useNotificationStore = defineStore("notification", () => {
  const notifications: Ref<boolean> = ref(true);

  return {
    notifications,
  };
});
