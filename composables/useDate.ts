import { format, isToday, isYesterday, differenceInDays } from "date-fns";
import { ru } from "date-fns/locale";

export class FormatDate {
  static localeString(date: Date) {
    return format(date, "d MMMM yyyy 'в' HH:mm", { locale: ru });
  }

  static formatNotificationDate(date: Date) {
    if (isToday(date)) {
      // Если сегодня
      return `сегодня в ${format(date, "HH:mm", { locale: ru })}`;
    } else if (isYesterday(date)) {
      // Если вчера
      return "вчера";
    } else {
      const daysAgo = differenceInDays(new Date(), date);
      if (daysAgo <= 7) {
        // Если было до недели назад
        return `${daysAgo} ${this.getDaysWord(daysAgo)} назад`;
      } else {
        // Если старше недели, показываем обычную дату
        return format(date, "d MMMM yyyy 'в' HH:mm", { locale: ru });
      }
    }
  }

  // Функция для правильного склонения "день, дня, дней"
  static getDaysWord(days: number) {
    if (days % 10 === 1 && days % 100 !== 11) return "день";
    if ([2, 3, 4].includes(days % 10) && ![12, 13, 14].includes(days % 100))
      return "дня";
    return "дней";
  }
}
