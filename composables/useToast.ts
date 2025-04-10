import { DEFAULT_TOAST } from "~/types/Toast/toastConsts";
import type { ToastType } from "~/types/Toast/type";

export const useToast = ({ message, type }: ToastType) => {
  useSessionStorage("toast", DEFAULT_TOAST).value = {
    message,
    type,
  };
};
