import { defineStore } from "pinia";
import type { IUser } from "~/types/IUser";

export const useAuthStore = defineStore("auth", () => {
  const user: Ref<IUser | null> = ref(null);

  const userPhotoUrl = (url: string | null, first_name?: string, size = 33) => {
    if (!url) {
      return `https://ui-avatars.com/api/?name=${first_name}&background=random&size=${size}&font-size=0.3`;
    }

    return url;
  };

  return {
    user,
    userPhotoUrl,
  };
});
