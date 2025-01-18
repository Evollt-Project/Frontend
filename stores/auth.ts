import { defineStore } from "pinia";
import type { INotification } from "~/types/INotification";
import type { IUser } from "~/types/IUser";

export const useAuthStore = defineStore("auth", () => {
  const user: Ref<IUser | null> = ref(null);
  const enums = ref(null)
  const notifications: Ref<INotification[] | null> = ref([
    {
      id: 1,
      title: "Hello",
      message:
        "weojeowjfoejw eoj oeijfo joej oejfo j ojfoij oej ojwojfoi jo j oijfojefoiejfo jfej oijoifjoe joef",
      type: "message",
      is_read: false,
      is_favorite: false,
      created_at: "2024-12-04T12:31:48.000000Z",
      updated_at: null,
    },
    {
      id: 2,
      title: "Hello",
      message:
        "eoj oeijfo joej oejfo j ojfoij oej ojwojfoi jo j oijfojefoiejfo jfej oijoifjoe joef",
      type: "article",
      is_read: true,
      is_favorite: false,
      created_at: "2024-10-04T12:31:48.000000Z",
      updated_at: null,
    },
    {
      id: 3,
      title: "Hello",
      message:
        "eoj oeijfo joej oejfo j ojfoij oej ojwojfoi jo j oijfojefoiejfo jfej oijoifjoe joef",
      type: "article",
      is_read: true,
      is_favorite: false,
      created_at: "2024-11-30T12:31:48.000000Z",
      updated_at: null,
    },
    {
      id: 4,
      title: "Hello",
      message:
        "eoj oeijfo joej oejfo j ojfoij oej ojwojfoi jo j oijfojefoiejfo jfej oijoifjoe joef",
      type: "article",
      is_read: true,
      is_favorite: false,
      created_at: "2024-12-08T12:31:48.000000Z",
      updated_at: null,
    },
  ]);

  const userPhotoUrl = (url: string | null, first_name?: string, size = 33) => {
    if (!url) {
      return `https://ui-avatars.com/api/?name=${first_name}&background=random&size=${size}&font-size=0.3`;
    }

    return url;
  };

  return {
    user,
    enums,
    notifications,
    userPhotoUrl,
  };
});
