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

export const useNoun = (
  number: number,
  one: string,
  two: string,
  five: string,
) => {
  number = Math.abs(number);
  number %= 100;
  if (number >= 5 && number <= 20) {
    return five;
  }
  number %= 10;
  if (number == 1) {
    return one;
  }
  if (number >= 2 && number <= 4) {
    return two;
  }
  return five;
};


export const sanitizeValue = (value: any) => {
  if (typeof value === "number") {
    return value > 0 ? value : undefined;
  }
  if (Array.isArray(value)) {
    return value.length > 0 ? value : undefined;
  }
  if (typeof value === "object") {
    if (value instanceof Date) {
      return !isNaN(value.getTime()) ? value : undefined;
    }
    if (value && Object.keys(value).length > 0) {
      const hasValidValues = Object.values(value).some(v => {
        if (Array.isArray(v)) return v.length > 0;
        return v !== undefined;
      });
      return hasValidValues ? value : undefined;
    }
    return undefined;
  }
  return value || undefined;
};