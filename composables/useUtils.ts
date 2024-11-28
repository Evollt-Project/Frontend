import { toast } from "vue3-toastify";

export const useErrorNotification = (errors: { message?: string }) => {
  if (errors.message) {
    toast.error(errors.message);
    return;
  }
  for (const [_, value] of Object.entries(errors)) {
    toast.error(value);
  }
};

export const useFormatAmount = (amount: number) => {
  return Number(amount).toLocaleString("ru-RU", {
    style: "currency",
    currency: "RUB",
  });
};
